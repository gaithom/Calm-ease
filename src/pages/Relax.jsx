import React, { useState } from 'react';
import RelaxationPlayer from '../components/RelaxationPlayer';
import BackgroundSound from '../components/BackgroundSound';

const Relax = () => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-900 z-0">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20 z-10"></div>
      </div>

      <div className="relative z-20">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                You don't need to do anything complicated right now. Just focus on your breath, and let these tools guide you back to calm.
              </p>
            </div>
          </section>

          <div className={`transition-opacity duration-500 ${showAdvancedOptions ? 'opacity-100' : 'opacity-0'}`}>
            {showAdvancedOptions && (
              <div className="glass-card mb-8">
                <RelaxationPlayer isSimpleView={false} />
              </div>
            )}
          </div>

          <div className={`transition-opacity duration-500 ${!showAdvancedOptions ? 'opacity-100' : 'opacity-0'}`}>
            {!showAdvancedOptions && (
              <div className="glass-card mb-8">
                <RelaxationPlayer isSimpleView={true} />
              </div>
            )}
          </div>

          <BackgroundSound />

          <div className="text-center mt-8">
            <button 
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-sm"
            >
              <span>{showAdvancedOptions ? 'Show Simple View' : 'Show Advanced Options'}</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Relax;
