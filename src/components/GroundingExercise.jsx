import React, { useState } from 'react';

const STEPS = [
  { id: 'see', label: '5 things you can see', count: 5, hint: 'Look around and name objects, colors, or shapes.' },
  { id: 'touch', label: '4 things you can feel', count: 4, hint: 'Notice textures: your clothes, chair, floor, air on skin.' },
  { id: 'hear', label: '3 things you can hear', count: 3, hint: 'Listen for near and far sounds.' },
  { id: 'smell', label: '2 things you can smell', count: 2, hint: 'If hard, think of favorite scents.' },
  { id: 'taste', label: '1 thing you can taste', count: 1, hint: 'Sip water or notice aftertaste.' },
];

export default function GroundingExercise() {
  const [stepIndex, setStepIndex] = useState(0);
  const [entries, setEntries] = useState({ see: [], touch: [], hear: [], smell: [], taste: [] });

  const step = STEPS[stepIndex];
  const remaining = step.count - (entries[step.id]?.length || 0);

  const addEntry = () => {
    const value = document.getElementById('grounding-input').value.trim();
    if (!value) return;
    setEntries((prev) => ({ ...prev, [step.id]: [...prev[step.id], value] }));
    document.getElementById('grounding-input').value = '';
  };

  const next = () => {
    if (remaining > 0) return;
    if (stepIndex < STEPS.length - 1) setStepIndex(stepIndex + 1);
  };

  const reset = () => {
    setEntries({ see: [], touch: [], hear: [], smell: [], taste: [] });
    setStepIndex(0);
  };

  return (
    <section className="card" aria-label="5-4-3-2-1 Grounding Exercise">
      <h2 className="text-xl font-semibold">5-4-3-2-1 Grounding</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Refocus by naming sensory details.</p>

      <div className="mt-4">
        <div className="text-lg font-medium">{step.label}</div>
        <p className="text-sm text-slate-600 dark:text-slate-300">{step.hint}</p>

        <div className="mt-3 flex items-center gap-2">
          <input
            id="grounding-input"
            type="text"
            placeholder="Type one..."
            className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 p-3"
            aria-label="Enter an item"
            onKeyDown={(e) => { if (e.key === 'Enter') addEntry(); }}
          />
          <button className="btn btn-ghost" onClick={addEntry} aria-label="Add item">Add</button>
        </div>

        <ul className="mt-3 grid sm:grid-cols-2 gap-2" aria-live="polite">
          {(entries[step.id] || []).map((v, i) => (
            <li key={`${step.id}-${i}`} className="rounded-lg bg-white/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 p-3">
              {i + 1}. {v}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-700 dark:text-slate-300">Remaining: {Math.max(0, remaining)}</div>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost" onClick={reset}>Reset</button>
            <button className="btn btn-primary" onClick={next} disabled={remaining > 0} aria-disabled={remaining > 0}>
              {stepIndex === STEPS.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
