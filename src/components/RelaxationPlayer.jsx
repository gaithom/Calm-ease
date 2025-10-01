import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useSound } from '../context/SoundContext';
import useAudioPlayer from '../hooks/useAudioPlayer';

const TIPS = [
  'Breathe in through your nose, out through your mouth.',
  'Relax your shoulders and soften your jaw.',
  'Let thoughts pass like clouds—no need to engage.',
  'Notice the coolness of the inhale, warmth of the exhale.',
  'If distracted, gently return to the breath.',
];

export default function RelaxationPlayer() {
  const { voiceRef, playVoice, pauseVoice, isVoicePlaying, voiceVolume, setVoiceVolume } = useSound();
  const { isPlaying, duration, currentTime, error, play, pause, seek } = useAudioPlayer(voiceRef);
  const [selected, setSelected] = useState(() => localStorage.getItem('med:selected') || '/sounds/voice-guided.wav');
  const [speed, setSpeed] = useState(() => Number(localStorage.getItem('med:speed')) || 1);
  const [loop, setLoop] = useState(() => localStorage.getItem('med:loop') === 'true');
  const [minutes, setMinutes] = useState(() => Number(localStorage.getItem('med:minutes')) || 10);
  const [remaining, setRemaining] = useState(null);
  const [tipIndex, setTipIndex] = useState(0);
  const fadeRef = useRef(null);
  const keyHandlerRef = useRef(null);

  // Format times
  const formatted = useMemo(() => {
    const fmt = (sec) => {
      const s = Math.floor(sec % 60).toString().padStart(2, '0');
      const m = Math.floor(sec / 60).toString();
      return `${m}:${s}`;
    };
    const rem = remaining != null ? fmt(remaining) : null;
    return { cur: fmt(currentTime || 0), dur: fmt(duration || 0), rem };
  }, [currentTime, duration, remaining]);

  // Apply persisted settings
  useEffect(() => { localStorage.setItem('med:selected', selected); }, [selected]);
  useEffect(() => { localStorage.setItem('med:speed', String(speed)); }, [speed]);
  useEffect(() => { localStorage.setItem('med:loop', String(loop)); }, [loop]);
  useEffect(() => { localStorage.setItem('med:minutes', String(minutes)); }, [minutes]);

  // Apply speed/loop to the audio element
  useEffect(() => {
    if (voiceRef?.current) voiceRef.current.playbackRate = speed;
  }, [speed, voiceRef]);
  useEffect(() => {
    if (voiceRef?.current) voiceRef.current.loop = loop;
  }, [loop, voiceRef]);

  // Simple breathing phase text (4-4-6 pattern)
  const [phase, setPhase] = useState('Inhale');
  useEffect(() => {
    if (!isPlaying && !isVoicePlaying) return; 
    let cancelled = false;
    const runCycle = async () => {
      while (!cancelled && (isPlaying || isVoicePlaying)) {
        setPhase('Inhale'); await new Promise(r => setTimeout(r, 4000));
        if (cancelled) break;
        setPhase('Hold'); await new Promise(r => setTimeout(r, 4000));
        if (cancelled) break;
        setPhase('Exhale'); await new Promise(r => setTimeout(r, 6000));
      }
    };
    runCycle();
    return () => { cancelled = true; };
  }, [isPlaying, isVoicePlaying]);

  // Rotate tips while playing
  useEffect(() => {
    if (!(isPlaying || isVoicePlaying)) return;
    const id = setInterval(() => setTipIndex((i) => (i + 1) % TIPS.length), 10000);
    return () => clearInterval(id);
  }, [isPlaying, isVoicePlaying]);

  const fadeOutAndStop = useCallback((ms = 2000) => {
    if (fadeRef.current) clearInterval(fadeRef.current);
    const startVol = voiceVolume;
    const steps = 20;
    let i = 0;
    fadeRef.current = setInterval(() => {
      i++;
      const vol = Math.max(0, startVol * (1 - i / steps));
      setVoiceVolume(vol);
      if (i >= steps) {
        clearInterval(fadeRef.current);
        pause();
        pauseVoice();
        setVoiceVolume(startVol);
        setRemaining(null);
        playChime();
      }
    }, Math.max(10, Math.floor(ms / steps)));
  }, [voiceVolume, setVoiceVolume, pause, pauseVoice]);

  const onToggle = useCallback(async () => {
    if (isPlaying || isVoicePlaying) {
      pause();
      pauseVoice();
    } else {
      await playVoice(selected);
      await play();
      if (remaining == null && minutes > 0) setRemaining(minutes * 60);
    }
  }, [isPlaying, isVoicePlaying, pause, pauseVoice, playVoice, selected, play, remaining, minutes]);

  // Timer countdown and fade-out
  useEffect(() => {
    if (remaining == null) return;
    if (!(isPlaying || isVoicePlaying)) return;

    const start = Date.now();
    let prev = remaining;
    const tick = () => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const next = Math.max(0, prev - elapsed);
      setRemaining(next);
      if (next === 0) {
        // Begin fade out
        fadeOutAndStop(3000);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    let raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [remaining, isPlaying, isVoicePlaying, fadeOutAndStop]);

  const playChime = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(660, ctx.currentTime);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.85);
    } catch {}
  };


  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.code === 'Space') { e.preventDefault(); onToggle(); }
      if (e.code === 'ArrowRight') { seek(Math.min((duration || 0), (currentTime || 0) + 5)); }
      if (e.code === 'ArrowLeft') { seek(Math.max(0, (currentTime || 0) - 5)); }
    };
    keyHandlerRef.current = onKey;
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onToggle, seek, duration, currentTime]);

  return (
    <section className="card" aria-label="Relaxation voice guidance">
      <h2 className="text-xl font-semibold mb-4">Relaxation Voice Guide</h2>

      <div className="flex flex-col gap-4">
        {/* Track select */}
        <label className="block">
          <span className="text-sm text-slate-600 dark:text-slate-300">Select track</span>
          <select
            className="mt-1 w-full rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-900/60 p-2"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="/sounds/voice-guided.wav">Guided Breathing & Affirmations</option>
          </select>
        </label>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button className="btn btn-primary" onClick={onToggle}>
            {isPlaying || isVoicePlaying ? 'Pause' : 'Play'}
          </button>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime || 0}
              onChange={(e) => seek(Number(e.target.value))}
              className="w-full accent-emerald-600"
              aria-label="Seek"
            />
            <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex justify-between">
              <span>{formatted.cur} / {formatted.dur}</span>
              {remaining != null && <span>Time left: {formatted.rem}</span>}
            </div>
          </div>
        </div>

        {/* Settings row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label className="block">
            <span className="text-sm text-slate-600 dark:text-slate-300">Session length</span>
            <select
              className="mt-1 w-full rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-900/60 p-2"
              value={minutes}
              onChange={(e) => { const v = Number(e.target.value); setMinutes(v); setRemaining(null); }}
            >
              <option value={0}>No timer</option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={20}>20 minutes</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-slate-600 dark:text-slate-300">Speed</span>
            <select
              className="mt-1 w-full rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-900/60 p-2"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            >
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
            </select>
          </label>

          <label className="flex items-center gap-2 mt-6 md:mt-7">
            <input type="checkbox" className="accent-emerald-600" checked={loop} onChange={(e) => setLoop(e.target.checked)} />
            <span className="text-sm text-slate-700 dark:text-slate-300">Loop track</span>
          </label>
        </div>

        {/* Breathing visual and tips */}
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col items-center">
            <div className="breath-visual" aria-hidden="true" />
            <div className="mt-3 text-sm font-medium text-emerald-700 dark:text-emerald-300" aria-live="polite">{phase}</div>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            <div className="font-medium text-slate-800 dark:text-white mb-1">Tip</div>
            <p>{TIPS[tipIndex]}</p>
          </div>
        </div>

        {/* Footer controls */}
        <div className="flex gap-2 justify-end">
          <button
            className="btn btn-secondary"
            onClick={() => { setRemaining(minutes > 0 ? minutes * 60 : null); if (!(isPlaying || isVoicePlaying)) onToggle(); }}
          >
            Start Session
          </button>
          <button
            className="btn btn-outline"
            onClick={() => { setRemaining(null); fadeOutAndStop(1200); }}
          >
            End & Fade Out
          </button>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">
          Shortcuts: Space to play/pause, ←/→ to seek 5s.
        </div>
      </div>
    </section>
  );
}
