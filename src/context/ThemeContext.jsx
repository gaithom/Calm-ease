import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Theme types
export const THEMES = {
  GREEN: 'green'
};

// Context type definition
const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
  isSystemDark: false
});

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkModeState] = useState(false);
  const [isSystemDark, setIsSystemDark] = useState(false);

  // Initialize theme and dark mode
  useEffect(() => {
    // Check for saved theme preference or use default
    const savedDarkMode = localStorage.getItem('darkMode');

    // Check system dark mode preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsSystemDark(systemPrefersDark);

    // Initialize dark mode pref (saved > system)
    const initialDarkMode = savedDarkMode !== null 
      ? savedDarkMode === 'true'
      : systemPrefersDark;

    setDarkModeState(initialDarkMode);
    localStorage.setItem('darkMode', initialDarkMode.toString());
    applyTheme(THEMES.GREEN, initialDarkMode);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      const newSystemDark = e.matches;
      setIsSystemDark(newSystemDark);
      // Only update dark mode if user hasn't explicitly set a preference
      if (localStorage.getItem('darkMode') === null) {
        setDarkModeState(newSystemDark);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Apply theme and update DOM
  const applyTheme = useCallback((theme, isDark) => {
    // Update document attributes
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', isDark);
    
    // Update meta theme-color for mobile browsers
    const themeColor = isDark ? '#064e3b' : '#d1fae5';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
  }, []);

  // Update theme

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    const newDarkMode = !darkMode;
    setDarkModeState(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    applyTheme(THEMES.GREEN, newDarkMode);
  }, [darkMode, applyTheme]);
  
  // Set dark mode directly

  // Context value
  const contextValue = {
    darkMode,
    toggleDarkMode,
    isSystemDark
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
