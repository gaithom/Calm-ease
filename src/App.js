import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Relax from './pages/Relax';
import Grounding from './pages/Grounding';
import About from './pages/About';
import Library from './pages/Library';
import { SoundProvider } from './context/SoundContext';

function App() {
  return (
    <SoundProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 to-surface dark:from-slate-950 dark:to-slate-900">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/relax" element={<Relax />} />
              <Route path="/grounding" element={<Grounding />} />
              <Route path="/library" element={<Library />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </SoundProvider>
  );
}

export default App;
