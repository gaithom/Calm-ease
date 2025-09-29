import React from 'react';
import GroundingExercise from '../components/GroundingExercise';

export default function Grounding() {
  return (
    <div className="space-y-6">
      <GroundingExercise />
      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Tips</h2>
        <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300">
          <li>Slow your breath: inhale 4s, hold 4s, exhale 6s.</li>
          <li>Relax your muscles one area at a time.</li>
          <li>Speak kindly to yourself: “This feeling will pass.”</li>
        </ul>
      </section>
    </div>
  );
}
