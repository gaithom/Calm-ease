import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSound } from '../context/SoundContext';
import EmergencyAccessSection from '../components/EmergencyAccessSection';
import PersonalizedDashboard from '../components/PersonalizedDashboard';
import backgroundImage from '../assets/background2.png';

export default function Home() {
  const { favorites, backgroundSounds } = useSound();
  const favoriteSounds = backgroundSounds.filter(s => favorites.includes(s.id));
  const [quickCalmActive, setQuickCalmActive] = useState(false);

  const startQuickCalm = () => {
    setQuickCalmActive(true);
    setTimeout(() => {
      setQuickCalmActive(false);
    }, 60000); // 1 minute
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 z-10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-20">
        {/* Floating Emergency Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            className={`w-16 h-16 rounded-full text-white shadow-lg transition-all duration-200 flex flex-col items-center justify-center text-xs font-medium ${
              quickCalmActive 
                ? 'bg-green-500 hover:bg-green-600 animate-pulse' 
                : 'bg-red-500 hover:bg-red-600'
            }`}
            title={quickCalmActive ? 'Quick calm active...' : 'Emergency calm - instant help'}
            onClick={quickCalmActive ? () => setQuickCalmActive(false) : startQuickCalm}
        >
          {quickCalmActive ? (
            <>
              <span className="text-lg">✓</span>
              <span>OK</span>
            </>
          ) : (
            <>
              <span className="text-lg">🆘</span>
              <span>HELP</span>
            </>
          )}
        </button>
      </div>

      {/* Gentle, Supportive Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-emerald-50/90 via-white/80 to-emerald-100/60 dark:from-emerald-900/30 dark:via-emerald-800/20 dark:to-emerald-900/40 transition-colors duration-300">
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-emerald-100/70 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200 shadow-sm">
            <span className="text-xl">🤗</span>
            <span className="font-medium">You're not alone in this</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light text-slate-800 dark:text-emerald-50 mb-6 leading-relaxed">
            When anxiety feels overwhelming,
            <br />
            <span className="font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              we're here to help
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
            Simple, gentle tools designed specifically for anxiety relief. 
            <br className="hidden md:block" />
            No complicated setups, no overwhelming choices - just immediate support when you need it most.
          </p>

          {/* Immediate Help Section */}
          <div className="bg-emerald-50/20 dark:bg-emerald-900/30 backdrop-blur-sm rounded-2xl p-6 mb-12 max-w-2xl mx-auto border border-emerald-200/30 dark:border-emerald-700/30 shadow-lg">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-200 mb-4">
              🆘 Need help right now?
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/relax"
                className="flex-1 btn btn-primary text-lg py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                🥰 Start Breathing
              </Link>
              <Link
                to="/grounding"
                className="flex-1 btn btn-secondary text-lg py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                🧠 Ground Yourself
              </Link>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-3">
              Both take less than 2 minutes and can be done anywhere, anytime
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Access Section */}
      <EmergencyAccessSection quickCalmActive={quickCalmActive} />

      {/* Anxiety-Specific Support Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50/80 to-white dark:from-emerald-900/40 dark:to-emerald-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-emerald-900 dark:text-white sm:text-4xl mb-4">
              When <span className="font-semibold text-emerald-700 dark:text-emerald-300">anxiety symptoms</span> feel overwhelming
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              We understand what you're going through. Here's how our tools can help with specific anxiety symptoms.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Racing Heart */}
            <div className="bg-emerald-50/20 dark:bg-emerald-900/30 backdrop-blur-sm p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30 shadow-lg transition-all">
              <div className="w-16 h-16 bg-red-100/70 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">❤️‍🩹</span>
              </div>
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-200 text-center mb-3">
                Racing Heart & Panic
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-center mb-4 text-sm">
                When your heart is pounding and you feel like you can't breathe
              </p>
              <div className="bg-red-50/60 dark:bg-red-900/30 p-3 rounded-lg backdrop-blur-sm border border-red-200/30 dark:border-red-700/30">
                <p className="text-xs text-red-800 dark:text-red-200 font-medium">✓ Box breathing slows your heart rate</p>
                <p className="text-xs text-red-800 dark:text-red-200 font-medium">✓ Cold water activates your parasympathetic nervous system</p>
              </div>
            </div>

            {/* Racing Thoughts */}
            <div className="bg-emerald-50/20 dark:bg-emerald-900/30 backdrop-blur-sm p-6 rounded-2xl border border-purple-200/30 dark:border-purple-700/30 shadow-lg transition-all">
              <div className="w-16 h-16 bg-purple-100/70 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">🌪️</span>
              </div>
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-200 text-center mb-3">
                Racing Thoughts
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-center mb-4 text-sm">
                When your mind won't stop spinning and you can't focus
              </p>
              <div className="bg-purple-50/60 dark:bg-purple-900/30 p-3 rounded-lg backdrop-blur-sm border border-purple-200/30 dark:border-purple-700/30">
                <p className="text-xs text-purple-800 dark:text-purple-200 font-medium">✓ 5-4-3-2-1 grounds you in the present</p>
                <p className="text-xs text-purple-800 dark:text-purple-200 font-medium">✓ Background sounds give your mind something to focus on</p>
              </div>
            </div>

            {/* Feeling Disconnected */}
            <div className="bg-emerald-50/20 dark:bg-emerald-900/30 backdrop-blur-sm p-6 rounded-2xl border border-amber-200/30 dark:border-amber-700/30 shadow-lg transition-all">
              <div className="w-16 h-16 bg-amber-100/70 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">🫥</span>
              </div>
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-200 text-center mb-3">
                Feeling Disconnected
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-center mb-4 text-sm">
                When you feel like you're floating or not really \"here\"
              </p>
              <div className="bg-amber-50/60 dark:bg-amber-900/30 p-3 rounded-lg backdrop-blur-sm border border-amber-200/30 dark:border-amber-700/30">
                <p className="text-xs text-amber-800 dark:text-amber-200 font-medium">✓ Grounding techniques reconnect you with your body</p>
                <p className="text-xs text-amber-800 dark:text-amber-200 font-medium">✓ Sensory focus brings you back to the present</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
          <div className="bg-emerald-50/20 dark:bg-emerald-900/30 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto border border-emerald-200/30 dark:border-emerald-700/30 shadow-lg">
              <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                🌱 Remember: Anxiety is treatable
              </h3>
              <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                These tools are designed to complement professional treatment. 
                If anxiety is significantly impacting your daily life, please consider speaking with a mental health professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Dashboard */}
      <PersonalizedDashboard favoriteSounds={favoriteSounds} />

      {/* Supportive Final CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-100/90 via-white/80 to-emerald-50/90 dark:from-emerald-900/40 dark:via-emerald-800/30 dark:to-emerald-900/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-6">🌱</div>
          <h2 className="text-3xl font-light text-emerald-900 dark:text-white sm:text-4xl mb-4">
            Taking the first step takes <span className="font-semibold text-emerald-700 dark:text-emerald-300">courage</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            You've already shown strength by seeking support for your anxiety. 
            These tools are here whenever you're ready - there's no pressure, no judgment, just gentle support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/relax"
              className="btn btn-primary btn-lg px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              😌 I'm ready to try breathing
            </Link>
            <Link
              to="/grounding"
              className="btn btn-secondary btn-lg px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              🧠 I'd like to try grounding
            </Link>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
            You can start with just 30 seconds. Progress, not perfection. ❤️
          </p>
        </div>
      </section>
      </div>
    </div>
  );
}
