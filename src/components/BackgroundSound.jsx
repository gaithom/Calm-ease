import React from 'react';
import { useSound } from '../context/SoundContext';

export default function BackgroundSound() {
  const { bgRef, playBg, pauseBg, isBgPlaying, bgVolume, setBgVolume, backgroundSounds, favorites, toggleFavorite } = useSound();

  const onToggle = async (src) => {
    if (isBgPlaying && bgRef.current?.src?.includes(src)) {
      pauseBg();
    } else {
      await playBg(src);
    }
  };

  return (
    <section className="card" aria-label="Background sound player">
      <h2 className="text-xl font-semibold mb-4">Background Sounds</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {backgroundSounds.map((s) => (
          <div key={s.id} className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200/70 dark:border-emerald-800/60 p-3 bg-emerald-50/60 dark:bg-emerald-900/50">
            <div>
              <div className="font-medium">{s.name}</div>
              <button
                className="text-xs text-teal-700 dark:text-teal-300 underline"
                onClick={() => toggleFavorite(s.id)}
                aria-pressed={favorites.includes(s.id)}
              >
                {favorites.includes(s.id) ? '★ Favorite' : '☆ Add to favorites'}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-ghost"
                onClick={() => onToggle(s.src)}
                aria-label={`Toggle ${s.name}`}
              >
                {isBgPlaying && bgRef.current?.src?.includes(s.src) ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <label className="text-sm text-slate-600 dark:text-slate-300">Volume</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={bgVolume}
          onChange={(e) => setBgVolume(parseFloat(e.target.value))}
          className="w-full accent-teal-600"
          aria-label="Background volume"
        />
      </div>
    </section>
  );
}
