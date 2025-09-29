import React from 'react';
import { useSound } from '../context/SoundContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useSound();
  const isDark = theme === 'dark';
  return (
    <button
      className="btn btn-ghost h-10 w-10 rounded-full"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? (
        <span aria-hidden>☀️</span>
      ) : (
        <span aria-hidden>🌙</span>
      )}
    </button>
  );
}
