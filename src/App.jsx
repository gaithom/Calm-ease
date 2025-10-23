import React, { useEffect, Suspense, lazy, useCallback, memo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SoundProvider } from './context/SoundContext';
import { ThemeProvider, useTheme, THEMES } from './context/ThemeContext';

// Lazy load page components with prefetching
const lazyWithPrefetch = (factory) => {
  const Component = lazy(factory);
  Component.prefetch = factory;
  return Component;
};

const Home = lazyWithPrefetch(() => import(/* webpackPrefetch: true */ './pages/Home'));
const Relax = lazyWithPrefetch(() => import(/* webpackPrefetch: true */ './pages/Relax'));
const Grounding = lazyWithPrefetch(() => import(/* webpackPrefetch: true */ './pages/Grounding'));
const About = lazyWithPrefetch(() => import(/* webpackPrefetch: true */ './pages/About'));
const Library = lazyWithPrefetch(() => import(/* webpackPrefetch: true */ './pages/Library'));

// Component to handle theme application
const ThemeWrapper = memo(({ children }) => {
  const { theme, darkMode } = useTheme();

  // Apply theme class to html element
  useEffect(() => {
    // Set theme class on html element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Set dark mode class and background color
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0f172a'; // Dark background for the entire page
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc'; // Light background for the entire page
    }
    
    // Update CSS variables based on theme
    const root = document.documentElement;
    if (theme === THEMES.GREEN) {
      root.style.setProperty('--primary-50', '#f0fdf4');
      root.style.setProperty('--primary-100', '#dcfce7');
      root.style.setProperty('--primary-200', '#bbf7d0');
      root.style.setProperty('--primary-300', '#86efac');
      root.style.setProperty('--primary-400', '#4ade80');
      root.style.setProperty('--primary-500', '#22c55e');
      root.style.setProperty('--primary-600', '#16a34a');
      root.style.setProperty('--primary-700', '#15803d');
      root.style.setProperty('--primary-800', '#166534');
      root.style.setProperty('--primary-900', '#14532d');
    } else if (theme === THEMES.TEAL) {
      root.style.setProperty('--primary-50', '#f0fdfa');
      root.style.setProperty('--primary-100', '#ccfbf1');
      root.style.setProperty('--primary-200', '#99f6e4');
      root.style.setProperty('--primary-300', '#5eead4');
      root.style.setProperty('--primary-400', '#2dd4bf');
      root.style.setProperty('--primary-500', '#14b8a6');
      root.style.setProperty('--primary-600', '#0d9488');
      root.style.setProperty('--primary-700', '#0f766e');
      root.style.setProperty('--primary-800', '#115e59');
      root.style.setProperty('--primary-900', '#134e4a');
    } else if (theme === THEMES.BLUE) {
      root.style.setProperty('--primary-50', '#eff6ff');
      root.style.setProperty('--primary-100', '#dbeafe');
      root.style.setProperty('--primary-200', '#bfdbfe');
      root.style.setProperty('--primary-300', '#93c5fd');
      root.style.setProperty('--primary-400', '#60a5fa');
      root.style.setProperty('--primary-500', '#3b82f6');
      root.style.setProperty('--primary-700', '#1d4ed8');
      root.style.setProperty('--primary-800', '#1e40af');
      root.style.setProperty('--primary-900', '#1e3a8a');
    }
  }, [theme, darkMode]);
  
  return (
    <div className={`min-h-screen flex flex-col bg-emerald-50 dark:bg-emerald-900 transition-colors duration-200`}>
      {children}
    </div>
  );
});

// Add display name for better debugging
ThemeWrapper.displayName = 'ThemeWrapper';

// Memoized App component to prevent unnecessary re-renders
const App = memo(() => {
  // Preload other routes when the app loads
  useEffect(() => {
    // Prefetch all route components
    [Home, Relax, Grounding, About, Library].forEach(component => {
      if (component.prefetch) {
        component.prefetch().catch(() => {});
      }
    });
  }, []);

  return (
    <ThemeProvider>
      <SoundProvider>
        <BrowserRouter>
          <ThemeWrapper>
            <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
              <Navbar />
              <main className="flex-grow">
                <ScrollToTop />
                <Suspense fallback={
                  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                    <div className="animate-pulse text-2xl text-gray-800 dark:text-white">
                      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p>Loading...</p>
                    </div>
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/relax" element={<Relax />} />
                    <Route path="/grounding" element={<Grounding />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/about" element={<About />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </ThemeWrapper>
        </BrowserRouter>
      </SoundProvider>
    </ThemeProvider>
  );
});

// Add display name for better debugging
App.displayName = 'App';

export default App;
