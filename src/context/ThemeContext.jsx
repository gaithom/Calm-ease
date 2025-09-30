import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Theme types
export const THEMES = {
  GREEN: 'green',
  TEAL: 'teal',
  BLUE: 'blue'
};

// Context type definition
const ThemeContext = createContext({
  theme: THEMES.GREEN,
  setTheme: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
  isSystemDark: false
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(THEMES.GREEN);
  const [darkMode, setDarkModeState] = useState(false);
  const [isSystemDark, setIsSystemDark] = useState(false);

  // Initialize theme and dark mode
  useEffect(() => {
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    // Check system dark mode preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsSystemDark(systemPrefersDark);
    
    // Set theme - prioritize saved theme, fallback to system preference or default
    const initialTheme = savedTheme || THEMES.GREEN;
    
    // Set dark mode - prioritize saved preference, fallback to system preference
    const initialDarkMode = savedDarkMode !== null 
      ? savedDarkMode === 'true' 
      : systemPrefersDark;
    
    applyTheme(initialTheme, initialDarkMode);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      const newSystemDark = e.matches;
      setIsSystemDark(newSystemDark);
      // Only update dark mode if user hasn't explicitly set a preference
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(newSystemDark);
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
    const themeColor = isDark ? '#0f172a' : '#f8fafc';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
  }, []);

  // Update theme
  const setTheme = useCallback((newTheme) => {
    if (!Object.values(THEMES).includes(newTheme)) {
      console.warn(`Invalid theme: ${newTheme}. Using default.`);
      newTheme = THEMES.GREEN;
    }
    
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme, darkMode);
  }, [darkMode, applyTheme]);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    const newDarkMode = !darkMode;
    setDarkModeState(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    applyTheme(theme, newDarkMode);
  }, [darkMode, theme, applyTheme]);
  
  // Set dark mode directly
  const setDarkMode = useCallback((isDark) => {
    setDarkModeState(isDark);
    localStorage.setItem('darkMode', isDark);
    applyTheme(theme, isDark);
  }, [theme, applyTheme]);

  // Context value
  const contextValue = {
    theme,
    setTheme,
    darkMode,
    toggleDarkMode,
    setDarkMode,
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
