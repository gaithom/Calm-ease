import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SoundProvider } from './context/SoundContext';
import { ThemeProvider, useTheme, THEMES } from './context/ThemeContext';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const Relax = lazy(() => import('./pages/Relax'));
const Grounding = lazy(() => import('./pages/Grounding'));
const About = lazy(() => import('./pages/About'));
const Library = lazy(() => import('./pages/Library'));

// Component to handle theme application
function ThemeWrapper({ children }) {
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
}

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ThemeWrapper>
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<div className='flex-grow flex justify-center items-center'><div className='text-xl font-semibold'>Loading...</div></div>}>
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
          </ThemeWrapper>
        </BrowserRouter>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
