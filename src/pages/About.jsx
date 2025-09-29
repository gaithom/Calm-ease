import React from 'react';

export default function About() {
  return (
    <section className="card">
      <h1 className="text-2xl font-semibold">About CalmEase</h1>
      <p className="mt-2 text-slate-700 dark:text-slate-300">
        CalmEase is a lightweight, accessible app designed to help you manage anxiety using
        guided relaxation, grounding, and soothing sounds. Use the Calm Now button whenever you
        need immediate relief.
      </p>
      <p className="mt-2 text-slate-700 dark:text-slate-300">
        Accessibility and comfort are central to the design: large buttons, readable fonts,
        and dark mode support.
      </p>
      <p className="mt-2 text-slate-700 dark:text-slate-300">
        This app does not provide medical advice. If you are in crisis, please contact local emergency services.
      </p>
    </section>
  );
}
