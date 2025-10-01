import React from 'react';
import RelaxationPlayer from '../components/RelaxationPlayer';
import BackgroundSound from '../components/BackgroundSound';

export default function Relax() {
  return (
    <main className="container">
      {/* Page header banner */}
      <section
        className="relative mt-4 rounded-2xl p-6 md:p-8 bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 dark:from-emerald-900/40 dark:to-emerald-800/30 border border-emerald-200 dark:border-emerald-800"
        aria-label="Relax intro"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Relax & Unwind</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl">
              Guided meditation with soothing background sounds. Adjust pace, set a session timer,
              and follow the breathing visual to ease into calm.
            </p>
          </div>
        </div>
      </section>

      {/* Main grid layout */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Main content */}
        <div className="lg:col-span-8 space-y-6">
          <RelaxationPlayer />
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24 space-y-6">
            <BackgroundSound />

            {/* Helpful tips card */}
            <section className="card" aria-label="Session tips">
              <h2 className="text-lg font-semibold mb-3">Quick Tips</h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 text-sm">
                <li>Find a comfortable posture and relax your shoulders.</li>
                <li>Try headphones for a more immersive experience.</li>
                <li>Lower background volume if it distracts from the guidance.</li>
                <li>If your mind wanders, gently return to the breath.</li>
              </ul>
            </section>
          </div>
        </aside>
      </div>
    </main>
  );
}
