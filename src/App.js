import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Relax from './pages/Relax';
import Grounding from './pages/Grounding';
import About from './pages/About';
import Library from './pages/Library';
import { SoundProvider } from './context/SoundContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Component to handle theme application
function ThemeWrapper({ children }) {
  const { darkMode } = useTheme();

  // Apply theme class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
      {children}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <BrowserRouter>
          <ThemeWrapper>
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/relax" element={<Relax />} />
                <Route path="/grounding" element={<Grounding />} />
                <Route path="/library" element={<Library />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </ThemeWrapper>
        </BrowserRouter>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
