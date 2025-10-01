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
  const [lastLightTheme, setLastLightTheme] = useState(THEMES.GREEN);

  // Initialize theme and dark mode
  useEffect(() => {
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme');
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedLastLightTheme = localStorage.getItem('lastLightTheme');

    // Check system dark mode preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsSystemDark(systemPrefersDark);

    // Initialize dark mode pref (saved > system)
    const initialDarkMode = savedDarkMode !== null 
      ? savedDarkMode === 'true'
      : systemPrefersDark;

    if (initialDarkMode) {
      // When starting in dark mode, force Emerald and remember previous light theme
      const previousLight = savedLastLightTheme || savedTheme || THEMES.GREEN;
      setLastLightTheme(previousLight);
      localStorage.setItem('lastLightTheme', previousLight);

      setThemeState(THEMES.GREEN);
      localStorage.setItem('theme', THEMES.GREEN);

      setDarkModeState(true);
      localStorage.setItem('darkMode', 'true');

      applyTheme(THEMES.GREEN, true);
    } else {
      // In light mode, use saved theme or default
      const initialTheme = savedTheme || THEMES.GREEN;
      const lightTheme = savedLastLightTheme || initialTheme;
      setLastLightTheme(lightTheme);
      localStorage.setItem('lastLightTheme', lightTheme);

      setThemeState(initialTheme);
      localStorage.setItem('theme', initialTheme);

      setDarkModeState(false);
      localStorage.setItem('darkMode', 'false');

      applyTheme(initialTheme, false);
    }

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
    const themeColor = isDark ? '#064e3b' : '#d1fae5';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
  }, []);

  // Update theme
  const setTheme = useCallback((newTheme) => {
    if (!Object.values(THEMES).includes(newTheme)) {
      console.warn(`Invalid theme: ${newTheme}. Using default.`);
      newTheme = THEMES.GREEN;
    }

    if (darkMode) {
      // While in dark mode, always keep Emerald active. Remember user's light theme choice for later.
      setLastLightTheme(newTheme);
      localStorage.setItem('lastLightTheme', newTheme);
      // Do not change the active theme or re-apply; dark stays Emerald.
      return;
    }

    // In light mode, actively change theme and remember it as lastLightTheme
    setThemeState(newTheme);
    setLastLightTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('lastLightTheme', newTheme);
    applyTheme(newTheme, false);
  }, [darkMode, applyTheme]);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    const newDarkMode = !darkMode;

    if (newDarkMode) {
      // Going to dark: force Emerald as active theme, remember current light theme
      setLastLightTheme((prev) => {
        const remember = prev || theme || THEMES.GREEN;
        localStorage.setItem('lastLightTheme', remember);
        return remember;
      });
      setThemeState(THEMES.GREEN);
      localStorage.setItem('theme', THEMES.GREEN);

      setDarkModeState(true);
      localStorage.setItem('darkMode', 'true');

      applyTheme(THEMES.GREEN, true);
    } else {
      // Returning to light: restore last light theme
      const restore = localStorage.getItem('lastLightTheme') || lastLightTheme || THEMES.GREEN;
      setThemeState(restore);
      localStorage.setItem('theme', restore);

      setDarkModeState(false);
      localStorage.setItem('darkMode', 'false');

      applyTheme(restore, false);
    }
  }, [darkMode, theme, lastLightTheme, applyTheme]);
  
  // Set dark mode directly
  const setDarkMode = useCallback((isDark) => {
    if (isDark) {
      // Enable dark: force Emerald theme
      setLastLightTheme((prev) => {
        const remember = prev || theme || THEMES.GREEN;
        localStorage.setItem('lastLightTheme', remember);
        return remember;
      });
      setThemeState(THEMES.GREEN);
      localStorage.setItem('theme', THEMES.GREEN);

      setDarkModeState(true);
      localStorage.setItem('darkMode', 'true');

      applyTheme(THEMES.GREEN, true);
    } else {
      // Disable dark: restore last light theme
      const restore = localStorage.getItem('lastLightTheme') || lastLightTheme || THEMES.GREEN;
      setThemeState(restore);
      localStorage.setItem('theme', restore);

      setDarkModeState(false);
      localStorage.setItem('darkMode', 'false');

      applyTheme(restore, false);
    }
  }, [theme, lastLightTheme, applyTheme]);

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
