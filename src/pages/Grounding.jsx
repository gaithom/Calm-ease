import React, { useState } from 'react';
import GroundingExercise from '../components/GroundingExercise';
import EmergencyGroundingSection from '../components/EmergencyGroundingSection';
import PublicGroundingExercises from '../components/PublicGroundingExercises';

export default function Grounding() {
  const [quickGroundingActive, setQuickGroundingActive] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const startQuickGrounding = () => {
    setQuickGroundingActive(true);
    // Auto-stop after 30 seconds
    setTimeout(() => {
      setQuickGroundingActive(false);
    }, 30000);
  };

  return (
    <main className="container relative">
      {/* Gentle Floating Helper */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Emergency Reset */}
        <div className="relative group">
          <button 
            className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-xs font-medium border-2 border-white/20"
            title="Gentle reset - start fresh"
            onClick={() => {
              document.body.style.transition = 'opacity 1s ease-out';
              document.body.style.opacity = '0.3';
              setTimeout(() => window.location.reload(), 1000);
            }}
          >
            <span className="text-lg mb-1">🔄</span>
            <span className="text-xs opacity-90">reset</span>
          </button>
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Fresh start? 🌱
          </div>
        </div>

        {/* Quick Grounding */}
        <div className="relative group">
          <button 
            className={`w-16 h-16 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-xs font-medium border-2 border-white/20 ${
              quickGroundingActive 
                ? 'bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 animate-pulse' 
                : 'bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600'
            }`}
            title={quickGroundingActive ? 'Grounding with you... you\'re safe' : '30 seconds of gentle grounding'}
            onClick={quickGroundingActive ? () => setQuickGroundingActive(false) : startQuickGrounding}
          >
            {quickGroundingActive ? (
              <>
                <span className="text-lg mb-1">🌏</span>
                <span className="text-xs opacity-90">safe</span>
              </>
            ) : (
              <>
                <span className="text-lg mb-1">🧠</span>
                <span className="text-xs opacity-90">30s</span>
              </>
            )}
          </button>
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {quickGroundingActive ? 'You\'re grounded and safe 🌿' : 'Quick grounding together 🌱'}
          </div>
        </div>

        {/* Go to Breathing */}
        <div className="relative group">
          <button 
            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-xs font-medium border-2 border-white/20"
            title="Try breathing exercises instead"
            onClick={() => {
              document.body.style.transition = 'opacity 0.5s ease-out';
              document.body.style.opacity = '0.7';
              setTimeout(() => {
                window.location.href = '/relax';
              }, 500);
            }}
          >
            <span className="text-lg mb-1">🤱</span>
            <span className="text-xs opacity-90">breathe</span>
          </button>
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Try breathing instead? 💙
          </div>
        </div>
      </div>

      {/* Gentle, reassuring header */}
      <section
        className="relative mt-4 rounded-3xl p-8 md:p-10 bg-gradient-to-br from-amber-50/80 via-blue-50/60 to-indigo-50/80 dark:from-amber-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 border border-amber-100/50 dark:border-amber-800/30 backdrop-blur-sm"
        aria-label="Grounding introduction"
      >
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-amber-100/70 dark:bg-amber-800/40 text-amber-800 dark:text-amber-200">
            <span className="text-lg">🧠</span>
            <span className="text-sm font-medium">You are here now</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-light text-slate-800 dark:text-amber-50 mb-4 leading-relaxed">
            Find your <span className="font-semibold text-amber-700 dark:text-amber-300">anchor</span> in the present
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
            Grounding techniques help you reconnect with the present moment and restore a sense of safety. 
            Simple sensory exercises can help calm your nervous system.  
          </p>
          
          {/* Gentle Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-light">You are grounded, you are safe</span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
        </div>
      </section>

      {/* Public Anxiety Exercises - NEW */}
      <PublicGroundingExercises />

      {/* Emergency Grounding Section for immediate relief */}
      <EmergencyGroundingSection quickGroundingActive={quickGroundingActive} />

      {/* Gentle Navigation Helper */}
      <div className="mt-12 max-w-2xl mx-auto">
        {!showAdvancedOptions && (
          <div className="text-center mb-8">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/30 dark:border-amber-700/30">
              <h3 className="text-lg font-light text-slate-800 dark:text-white mb-3">
                🌱 These gentle techniques are all you need
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Everything above is designed for immediate relief. For the detailed 5-4-3-2-1 exercise, 
                it's available when you're ready - no pressure.
              </p>
              <button 
                onClick={() => setShowAdvancedOptions(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-150 dark:bg-amber-800 dark:hover:bg-amber-700 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-sm"
              >
                <span>📝</span>
                <span>Show detailed 5-4-3-2-1 exercise</span>
                <span className="text-xs opacity-75">(optional)</span>
              </button>
            </div>
          </div>
        )}

        {showAdvancedOptions && (
          <div className="text-center mb-8">
            <div className="bg-blue-50/60 dark:bg-blue-900/30 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/30 dark:border-blue-700/30">
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                ☁️ This detailed exercise might feel like a lot right now. That's okay.
              </p>
              <button 
                onClick={() => setShowAdvancedOptions(false)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-150 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-sm"
              >
                <span>🤗</span>
                <span>Back to simple techniques</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {showAdvancedOptions && (
        <div className="mt-8 space-y-6">
          {/* Enhanced 5-4-3-2-1 exercise */}
          <GroundingExercise />
          
          {/* Enhanced Tips card */}
          <section className="card bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <h2 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200">Helpful Grounding Tips</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-slate-800 dark:text-white">For Your Body</h3>
                <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1 text-sm">
                  <li>Slow your breath: inhale 4s, hold 4s, exhale 6s</li>
                  <li>Press your feet firmly into the ground</li>
                  <li>Relax your muscles one area at a time</li>
                  <li>Hold something cold or warm in your hands</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-slate-800 dark:text-white">For Your Mind</h3>
                <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1 text-sm">
                  <li>Speak kindly to yourself: "This feeling will pass"</li>
                  <li>Name objects around you by color or shape</li>
                  <li>Count backward from 100 by 7s (100, 93, 86...)</li>
                  <li>Remind yourself: "I am safe right here, right now"</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
