import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (event.target.closest('.theme-toggle') === null) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes = [
    { name: 'Green', value: 'green', color: 'bg-green-500' },
    { name: 'Teal', value: 'teal', color: 'bg-teal-500' },
    { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[0];

  return (
    <div className="relative theme-toggle">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center ${currentTheme.color} text-white`}
        aria-label="Change theme"
      >
        <span className="w-5 h-5 flex items-center justify-center">
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-4 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          )}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg py-1 z-50 border border-slate-200 dark:border-slate-700">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Theme Colors
          </div>
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => {
                setTheme(t.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm flex items-center ${theme === t.value ? 'bg-slate-100 dark:bg-slate-700' : 'hover:bg-slate-50 dark:hover:bg-slate-700'}`}
            >
              <span className={`w-3 h-3 rounded-full ${t.color} mr-3`}></span>
              {t.name}
              {theme === t.value && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
          <div className="border-t border-slate-200 dark:border-slate-700 my-1"></div>
          <button
            onClick={() => {
              setTheme(theme === 'dark' ? 'light' : 'dark');
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm flex items-center hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <span className="w-3 h-3 rounded-full bg-slate-400 dark:bg-yellow-400 mr-3"></span>
            {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      )}
    </div>
  );
}
