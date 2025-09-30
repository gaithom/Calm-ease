import React, { useState, useRef, useEffect } from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';

const ThemeOption = ({ theme, label, active, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(theme)}
    className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${
      active
        ? 'bg-primary-100 text-primary-700 dark:bg-slate-700 dark:text-primary-300'
        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
    }`}
  >
    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: getThemeColor(theme) }} />
    <span>{label}</span>
    {active && (
      <svg
        className="ml-auto h-5 w-5 text-primary-600 dark:text-primary-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    )}
  </button>
);

const getThemeColor = (theme) => {
  switch (theme) {
    case THEMES.GREEN:
      return '#10b981'; // emerald-500
    case THEMES.TEAL:
      return '#0d9488'; // teal-600
    case THEMES.BLUE:
      return '#3b82f6'; // blue-500
    default:
      return '#10b981';
  }
};

export default function ThemeSelector() {
  const { theme, setTheme, darkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  const themeOptions = [
    { value: THEMES.GREEN, label: 'Emerald' },
    { value: THEMES.TEAL, label: 'Teal' },
    { value: THEMES.BLUE, label: 'Blue' },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-full text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <span className="sr-only">Change theme</span>
          {darkMode ? (
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1" role="none">
            <h3 className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Color Theme
            </h3>
            {themeOptions.map((option) => (
              <ThemeOption
                key={option.value}
                theme={option.value}
                label={option.label}
                active={theme === option.value}
                onSelect={handleThemeSelect}
              />
            ))}
            <div className="border-t border-slate-200 dark:border-slate-700 my-1" />
            <button
              type="button"
              onClick={toggleDarkMode}
              className="w-full text-left px-4 py-2 text-sm flex items-center justify-between text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <div className="flex items-center space-x-2">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {darkMode ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  )}
                </svg>
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </div>
              <div className="relative inline-flex items-center h-5 rounded-full w-10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                style={{
                  backgroundColor: darkMode ? '#3b82f6' : '#e2e8f0',
                }}
              >
                <span
                  className={`${
                    darkMode ? 'translate-x-5' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
