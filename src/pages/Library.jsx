import React from 'react';
import LibraryManager from '../components/LibraryManager';

export default function Library() {
  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-emerald-900">
      <div className="relative z-10">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <section
            className="relative rounded-3xl p-8 md:p-12 bg-gradient-to-br from-blue-50/80 via-emerald-50/60 to-indigo-50/80 dark:from-emerald-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 border border-emerald-100/50 dark:border-emerald-800/30 backdrop-blur-sm mb-8"
            aria-label="Library introduction"
          >
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-emerald-100/70 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200">
                <span className="text-lg">📚</span>
                <span className="text-sm font-medium">Your Sound Library</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-light text-slate-800 dark:text-emerald-50 mb-4 leading-relaxed">
                Manage your saved sounds and exercises
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
                Here you can find all your saved sounds and exercises. You can also add new sounds and exercises to your library.
              </p>
            </div>
          </section>

          <div className="mb-8">
            <LibraryManager />
          </div>

          <div className="bg-white/60 dark:bg-slate-800/40 rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🔒</span>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Privacy & Security</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-700/50">
                <div className="text-2xl mb-3">💾</div>
                <h3 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2">Local Storage</h3>
                <p className="text-emerald-700 dark:text-emerald-300">All files stay on your device using IndexedDB - never uploaded to servers</p>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-700/50">
                <div className="text-2xl mb-3">🎧</div>
                <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Audio Types</h3>
                <p className="text-blue-700 dark:text-blue-300">Upload music, voice notes, or nature sounds for background or guidance</p>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-700/50">
                <div className="text-2xl mb-3">📱</div>
                <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Compatible Files</h3>
                <p className="text-amber-700 dark:text-amber-300">Supports most audio formats - YouTube requires direct file uploads</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
