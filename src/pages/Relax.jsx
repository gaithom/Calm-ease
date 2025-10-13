import React, { useState } from 'react';
import RelaxationPlayer from '../components/RelaxationPlayer';
import BackgroundSound from '../components/BackgroundSound';
import QuickReliefSection from '../components/QuickReliefSection';

const Relax = () => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [quickBreathingActive, setQuickBreathingActive] = useState(false);
  
  const startQuickBreathing = () => {
    setQuickBreathingActive(true);
    // Auto-stop after 1 minute
    setTimeout(() => {
      setQuickBreathingActive(false);
    }, 60000);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-900 z-0">
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20 z-10"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-8">
        {/* Hero Section */}
        <section
          className="relative rounded-3xl p-8 md:p-12 bg-gradient-to-br from-blue-50/80 via-emerald-50/60 to-indigo-50/80 dark:from-emerald-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 border border-emerald-100/50 dark:border-emerald-800/30 backdrop-blur-sm mb-8"
          aria-label="Safe space introduction"
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-emerald-100/70 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200">
              <span className="text-lg">🤱</span>
              <span className="text-sm font-medium">You're in a safe space</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-slate-800 dark:text-emerald-50 mb-4 leading-relaxed">
              Take a moment to <span className="font-semibold text-emerald-700 dark:text-emerald-300">breathe</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
              You don't need to do anything complicated right now. Just focus on your breath, 
              and let these tools guide you back to calm.
            </p>
            
            {/* Gentle Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-light">You are here, you are safe</span>
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
        </section>
      </div>
      
      <main className="container relative z-20 py-4 px-4 sm:px-6 lg:px-8">
        <div className="glass-container max-w-6xl mx-auto p-6 sm:p-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Gentle Floating Helper */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 glass-card p-2 rounded-2xl">
              {/* Emergency Stop - but gentler */}
              <div className="relative group">
                <button 
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-xs font-medium border-2 border-white/20"
                  title="Gentle stop - pause everything softly"
                  onClick={() => {
                    // Gentler stop - fade out instead of hard reload
                    document.body.style.transition = 'opacity 1s ease-out';
                    document.body.style.opacity = '0.3';
                    setTimeout(() => window.location.reload(), 1000);
                  }}
                >
                  <span className="text-lg mb-1">⏸️</span>
                  <span className="text-xs opacity-90">pause</span>
                </button>
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Need a gentle break? 💙
                </div>
              </div>

                {/* Quick Breathing - more encouraging */}
              <div className="relative group">
                <button 
                  className={`w-16 h-16 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-xs font-medium border-2 border-white/20 ${
                    quickBreathingActive 
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 animate-pulse' 
                      : 'bg-gradient-to-br from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600'
                  }`}
                  title={quickBreathingActive ? 'Breathing together... you\'re doing amazing' : 'One minute of gentle breathing'}
                  onClick={quickBreathingActive ? () => setQuickBreathingActive(false) : startQuickBreathing}
                >
                  {quickBreathingActive ? (
                    <>
                      <span className="text-lg mb-1">🌱</span>
                      <span className="text-xs opacity-90">calm</span>
                    </>
                  ) : (
                    <>
                      <span className="text-lg mb-1">🫁</span>
                      <span className="text-xs opacity-90">1min</span>
                    </>
                  )}
                </button>
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {quickBreathingActive ? 'You\'re doing wonderfully 🌟' : 'Gentle breathing together 💙'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Main Content - Progressive Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-8">
        {/* Immediate Relief Section */}
        <QuickReliefSection />

        {/* Advanced options toggle for when in simple view */}
        {showAdvancedOptions && (
          <div className="text-center my-8">
            <div className="bg-blue-50/60 dark:bg-blue-900/30 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/30 dark:border-blue-700/30">
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                ☁️ Feeling overwhelmed by the options? That's completely normal.
              </p>
              <button 
                onClick={() => setShowAdvancedOptions(false)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-150 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-sm"
              >
                <span>🤗</span>
                <span>Take me back to simple view</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content - Progressive Layout */}
        <div className="mt-6">
          {!showAdvancedOptions ? (
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="glass-card">
                <RelaxationPlayer isSimpleView={true} />
              </div>
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-24 space-y-6">
                  <BackgroundSound />

                  {/* Priority: Immediate Grounding Techniques */}
                  <section className="card" aria-label="Emergency grounding techniques">
                    <h2 className="text-lg font-semibold mb-3 text-emerald-800 dark:text-emerald-200">🌊 Right Now</h2>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold text-lg">•</span>
                        <span><strong>5-4-3-2-1:</strong> Notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold text-lg">•</span>
                        <span><strong>Feet on ground:</strong> Feel your feet touching the floor. You are safe and supported</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold text-lg">•</span>
                        <span><strong>Cool water:</strong> Hold a cold object or splash cool water on your wrists</span>
                      </li>
                    </ul>
                  </section>

                  {/* Session Optimization Tips */}
                  <details className="card">
                    <summary className="text-lg font-semibold mb-3 cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400">💡 Session Tips</summary>
                    <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 text-sm mt-3">
                      <li>Find a comfortable posture and relax your shoulders</li>
                      <li>Try headphones for a more immersive experience</li>
                      <li>Lower background volume if it distracts from the guidance</li>
                      <li>If your mind wanders, gently return to the breath</li>
                      <li>It's okay to pause anytime - you're in control</li>
                    </ul>
                  </details>
                </div>
              </aside>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="glass-card">
                <RelaxationPlayer isSimpleView={false} />
              </div>
              <BackgroundSound />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Relax;
