import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200/70 dark:border-slate-800/70">
      <div className="container mx-auto px-4 py-6 text-sm text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>
          © {new Date().getFullYear()} CalmEase. Not medical advice. If you’re in danger, call your local emergency number.
        </p>
        <div className="flex items-center gap-4">
          <a className="hover:text-teal-700 dark:hover:text-teal-300" href="/about">About</a>
          <a className="hover:text-teal-700 dark:hover:text-teal-300" href="https://www.mentalhealth.gov/get-help/immediate-help" target="_blank" rel="noreferrer">Get help</a>
        </div>
      </div>
    </footer>
  );
}
