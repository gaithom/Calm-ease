import React, { useMemo, useState } from 'react';
import { useSound } from '../context/SoundContext';
import useAudioPlayer from '../hooks/useAudioPlayer';

export default function RelaxationPlayer() {
  const { voiceRef, playVoice, pauseVoice, isVoicePlaying } = useSound();
  const { isPlaying, duration, currentTime, error, play, pause, seek } = useAudioPlayer(voiceRef);
  const [selected, setSelected] = useState('/sounds/voice-guided.wav');

  const formatted = useMemo(() => {
    const fmt = (sec) => {
      const s = Math.floor(sec % 60).toString().padStart(2, '0');
      const m = Math.floor(sec / 60).toString();
      return `${m}:${s}`;
    };
    return { cur: fmt(currentTime || 0), dur: fmt(duration || 0) };
  }, [currentTime, duration]);

  const onToggle = async () => {
    if (isPlaying || isVoicePlaying) {
      pause();
      pauseVoice();
    } else {
      await playVoice(selected);
      await play();
    }
  };

  return (
    <section className="card" aria-label="Relaxation voice guidance">
      <h2 className="text-xl font-semibold mb-4">Relaxation Voice Guide</h2>

      <div className="flex flex-col gap-4">
        <label className="block">
          <span className="text-sm text-slate-600 dark:text-slate-300">Select track</span>
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 p-2"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="/sounds/voice-guided.wav">Guided Breathing & Affirmations</option>
          </select>
        </label>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

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
              className="w-full accent-teal-600"
              aria-label="Seek"
            />
            <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              {formatted.cur} / {formatted.dur}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
