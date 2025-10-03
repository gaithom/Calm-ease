import React, { useState, useEffect } from 'react';
import { useSound } from '../context/SoundContext';

const EMERGENCY_SOUNDS = [
  { name: 'Ocean Waves', src: '/sounds/ocean.wav', icon: '🌊', color: 'blue' },
  { name: 'Rain', src: '/sounds/rain.wav', icon: '🌧️', color: 'gray' },
  { name: 'Forest', src: '/sounds/forest.wav', icon: '🌲', color: 'green' }
];

const BREATHING_PATTERNS = [
  { name: '4-7-8 Calming', inhale: 4, hold: 7, exhale: 8, icon: '😌' },
  { name: '4-4-6 Balanced', inhale: 4, hold: 4, exhale: 6, icon: '🧘' },
  { name: '3-3-3 Quick', inhale: 3, hold: 3, exhale: 3, icon: '⚡' }
];

export default function QuickReliefSection() {
  const { bgRef, playBg, pauseBg, isBgPlaying } = useSound();
  const [activeBreathingPattern, setActiveBreathingPattern] = useState(null);
  const [breathingPhase, setBreathingPhase] = useState('ready');
  const [breathingCount, setBreathingCount] = useState(0);

  // Breathing pattern controller
  useEffect(() => {
    if (!activeBreathingPattern) return;
    
    let cancelled = false;
    let timeoutId; // Use a single timeoutId to manage the current timeout
    
    const pattern = BREATHING_PATTERNS.find(p => p.name === activeBreathingPattern);
    if (!pattern) return;

    // This function will manage a single step of the breathing pattern
    const nextPhase = (currentPhase, currentCount) => {
      if (cancelled) return; // Stop if cancelled

      switch (currentPhase) {
        case 'ready':
          setBreathingPhase('inhale');
          setBreathingCount(1); // Start with cycle 1
          timeoutId = setTimeout(() => nextPhase('inhale', 1), pattern.inhale * 1000);
          break;
        case 'inhale':
          setBreathingPhase('hold');
          timeoutId = setTimeout(() => nextPhase('hold', currentCount), pattern.hold * 1000);
          break;
        case 'hold':
          setBreathingPhase('exhale');
          timeoutId = setTimeout(() => nextPhase('exhale', currentCount), pattern.exhale * 1000);
          break;
        case 'exhale':
          const nextCount = currentCount + 1;
          if (nextCount <= 5) { // Run for 5 cycles
            setBreathingPhase('inhale');
            setBreathingCount(nextCount);
            timeoutId = setTimeout(() => nextPhase('inhale', nextCount), pattern.inhale * 1000);
          } else {
            setActiveBreathingPattern(null);
            setBreathingPhase('complete');
          }
          break;
        default:
          break;
      }
    };

    // Initial call to start the pattern
    nextPhase('ready', 0);
    
    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeBreathingPattern]);

  const startBreathingPattern = (patternName) => {
    setActiveBreathingPattern(patternName);
    setBreathingPhase('ready');
    setBreathingCount(0);
  };

  const stopBreathing = () => {
    setActiveBreathingPattern(null);
    setBreathingPhase('ready');
  };

  const playEmergencySound = async (sound) => {
    if (isBgPlaying && bgRef.current?.src?.includes(sound.src)) {
      pauseBg();
    } else {
      await playBg(sound.src);
    }
  };

  const getBreathingText = () => {
    if (!activeBreathingPattern) return 'Ready to begin';
    
    switch (breathingPhase) {
      case 'inhale': return 'Breathe in slowly...';
      case 'hold': return 'Hold your breath...';
      case 'exhale': return 'Breathe out slowly...';
      case 'complete': return 'Well done! How do you feel?';
      default: return 'Get comfortable and focus';
    }
  };

  return (
    <section className="mt-8">
      {/* Immediate Breathing Relief */}
      <div className="max-w-4xl mx-auto">
        {/* Gentle Guidance */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-700/30">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">Taking your time is perfectly okay</span>
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-light text-slate-800 dark:text-emerald-50 mb-3">
            Let's breathe together
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">Choose what feels right for you right now</p>
          
          {/* Gentle Navigation Hint */}
          <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-800/50 rounded-full px-4 py-2 inline-block">
            🌿 No pressure to choose quickly - explore at your own pace
          </div>
        </div>

        {/* Large Breathing Visual */}
        <div className="flex flex-col items-center mb-8">
          <div className={`relative ${activeBreathingPattern ? 'breathing-active' : ''}`}>
            <div className={`breath-visual-large ${breathingPhase}`} aria-hidden="true">
              <div className="breath-inner-circle"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">
                {activeBreathingPattern ? BREATHING_PATTERNS.find(p => p.name === activeBreathingPattern)?.icon : '🫁'}
              </span>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-lg font-medium text-emerald-700 dark:text-emerald-300 mb-2" aria-live="polite">
              {getBreathingText()}
            </p>
            {activeBreathingPattern && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Cycle {breathingCount} of 5
              </p>
            )}
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Breathing Patterns */}
<div className="card">
            <h3 className="text-lg font-semibold mb-4 text-emerald-700 dark:text-emerald-300">
              🫁 Breathing Exercises
            </h3>
            <div className="space-y-3">
              {BREATHING_PATTERNS.map((pattern) => (
                <button
                  key={pattern.name}
                  onClick={() => startBreathingPattern(pattern.name)}
                  disabled={activeBreathingPattern === pattern.name}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                    activeBreathingPattern === pattern.name
                      ? 'bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-800 dark:to-emerald-900 border-2 border-emerald-300 dark:border-emerald-600 shadow-lg transform scale-105'
                      : 'bg-slate-50/80 dark:bg-slate-800/80 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-blue-50 dark:hover:from-slate-700 dark:hover:to-emerald-900/30 hover:shadow-md hover:scale-102 border border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">{pattern.icon}</span>
                        <span className="font-medium text-slate-800 dark:text-white">{pattern.name}</span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                        Inhale {pattern.inhale}s • Hold {pattern.hold}s • Exhale {pattern.exhale}s
                      </div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        🌱 Gentle and supportive for your nervous system
                      </div>
                    </div>
                    {activeBreathingPattern === pattern.name && (
                      <button
                        onClick={(e) => { e.stopPropagation(); stopBreathing(); }}
                        className="text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 px-2 py-1 rounded"
                      >
                        Stop
                      </button>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Instant Calming Sounds */}
<div className="card">
<h3 className="text-lg font-semibold mb-4 text-emerald-800 dark:text-emerald-200">
              🔊 Instant Calm Sounds
            </h3>
            <div className="space-y-3">
              {EMERGENCY_SOUNDS.map((sound) => (
                <button
                  key={sound.name}
                  onClick={() => playEmergencySound(sound)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                    isBgPlaying && bgRef.current?.src?.includes(sound.src)
                      ? 'bg-gradient-to-br from-blue-100 to-indigo-50 dark:from-blue-800 dark:to-blue-900 border-2 border-blue-300 dark:border-blue-600 shadow-lg transform scale-105'
                      : 'bg-slate-50/80 dark:bg-slate-800/80 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-slate-700 dark:hover:to-blue-900/30 hover:shadow-md hover:scale-102 border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">{sound.icon}</span>
                        <span className="font-medium text-slate-800 dark:text-white">{sound.name}</span>
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        🌊 Natural sounds to soothe your mind
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 ${
                        isBgPlaying && bgRef.current?.src?.includes(sound.src) 
                          ? 'bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 animate-pulse' 
                          : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-800'
                      }`}>
                        {isBgPlaying && bgRef.current?.src?.includes(sound.src) ? '🎵 Playing' : '▶️ Play'}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={pauseBg}
                  className="w-full text-center py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  disabled={!isBgPlaying}
                >
                  🔇 Stop all sounds
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Grounding - Always visible */}
<div className="card">
<h3 className="text-lg font-semibold mb-3 text-emerald-800 dark:text-emerald-200">
            🆘 If you're feeling overwhelmed right now
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg">
              <strong className="block mb-1">Look around:</strong>
              Name 3 things you can see right now
            </div>
            <div className="p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg">
              <strong className="block mb-1">Feel your body:</strong>
              Press your feet firmly into the ground
            </div>
            <div className="p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg">
              <strong className="block mb-1">Remember:</strong>
              This feeling will pass. You are safe.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}