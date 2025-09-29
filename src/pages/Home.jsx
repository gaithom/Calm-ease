import React from 'react';
import CalmNowButton from '../components/CalmNowButton';
import { useSound } from '../context/SoundContext';

export default function Home() {
  const { favorites, backgroundSounds } = useSound();
  const favoriteSounds = backgroundSounds.filter(s => favorites.includes(s.id));

  return (
    <div className="space-y-6">
      <section className="card text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold">Welcome to CalmEase</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Simple tools to help you navigate anxiety: guided breathing, grounding exercises, and soothing sounds.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <CalmNowButton />
          <a className="btn btn-ghost" href="/relax">Start Relaxation</a>
          <a className="btn btn-ghost" href="/grounding">Try Grounding</a>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-2">Your favorites</h2>
        {favoriteSounds.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-300 text-sm">No favorites yet. Add some in the background sounds section.</p>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-2">
            {favoriteSounds.map(s => (
              <li key={s.id} className="rounded-lg bg-white/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 p-3">
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
