import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import CalmNowButton from './CalmNowButton';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800/80">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-calm">CE</span>
          <span className="text-xl font-semibold text-slate-800 dark:text-slate-100">CalmEase</span>
        </NavLink>
        <nav className="hidden sm:flex items-center gap-6 text-slate-700 dark:text-slate-200">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-teal-700 dark:text-teal-300 font-medium' : 'hover:text-teal-700 dark:hover:text-teal-300'}>Home</NavLink>
          <NavLink to="/relax" className={({isActive}) => isActive ? 'text-teal-700 dark:text-teal-300 font-medium' : 'hover:text-teal-700 dark:hover:text-teal-300'}>Relaxation</NavLink>
          <NavLink to="/grounding" className={({isActive}) => isActive ? 'text-teal-700 dark:text-teal-300 font-medium' : 'hover:text-teal-700 dark:hover:text-teal-300'}>Grounding</NavLink>
          <NavLink to="/library" className={({isActive}) => isActive ? 'text-teal-700 dark:text-teal-300 font-medium' : 'hover:text-teal-700 dark:hover:text-teal-300'}>Library</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'text-teal-700 dark:text-teal-300 font-medium' : 'hover:text-teal-700 dark:hover:text-teal-300'}>About</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <CalmNowButton size="sm" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
