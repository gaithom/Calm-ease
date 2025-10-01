import React from 'react';
import { Link } from 'react-router-dom';
import CalmNowButton from '../components/CalmNowButton';
import { useSound } from '../context/SoundContext';

export default function Home() {
  const { favorites, backgroundSounds } = useSound();
  const favoriteSounds = backgroundSounds.filter(s => favorites.includes(s.id));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[rgb(var(--gradient-from))] via-white to-white dark:from-emerald-950 dark:via-emerald-900 dark:to-emerald-800 transition-colors duration-300">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,transparent,white,darkgray)] dark:[mask-image:linear-gradient(0deg,transparent,#064e3b,#065f46)]"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 mb-6">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Now available on all devices
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Find Your Calm,
            <span className="block bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">One Breath at a Time</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto">
            Simple, effective tools to help you manage anxiety and stress through guided breathing, 
            grounding exercises, and soothing sounds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <CalmNowButton className="w-full sm:w-auto transform hover:-translate-y-0.5 transition-transform duration-200" />
            <Link
              to="/relax"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-full text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 shadow-lg hover:shadow-emerald-500/30"
            >
              Start Relaxing
            </Link>
            <Link
              to="/grounding"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-full text-emerald-900 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 dark:bg-emerald-800 dark:text-emerald-100 dark:hover:bg-emerald-700"
            >
              Try Grounding
            </Link>
          </div>
          <div className="relative mx-auto w-full max-w-4xl h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-primary-600/20 dark:from-primary-500/10 dark:to-primary-700/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 dark:bg-primary-500/20 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Guided Meditation</h3>
                <p className="text-slate-600 dark:text-slate-300">5 min • For Beginners</p>
                <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-slate-600 dark:text-slate-300 mx-auto">
              Simple steps to a calmer, more centered you
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-emerald-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-emerald-800">
              <div className="w-16 h-16 bg-primary-100 dark:bg-emerald-800 rounded-2xl flex items-center justify-center mb-4 mx-auto text-primary-500">
                <span className="text-3xl">🎧</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white text-center mb-3">
                Listen to Soothing Sounds
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Choose from a variety of calming sounds to help you relax and focus.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-emerald-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-emerald-800">
              <div className="w-16 h-16 bg-primary-100 dark:bg-emerald-800 rounded-2xl flex items-center justify-center mb-4 mx-auto text-primary-500">
                <span className="text-3xl">🧘</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white text-center mb-3">
                Practice Mindfulness
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Follow guided meditations to reduce stress and improve focus.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-emerald-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-emerald-800">
              <div className="w-16 h-16 bg-primary-100 dark:bg-emerald-800 rounded-2xl flex items-center justify-center mb-4 mx-auto text-primary-500">
                <span className="text-3xl">🌬️</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white text-center mb-3">
                Breathe & Relax
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Use our breathing exercises to find your center and calm your mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Favorites Section */}
      <section className="py-16 bg-slate-50 dark:bg-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Your Favorites</h2>
            <Link to="/library" className="text-base font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200">
              View all sounds →
            </Link>
          </div>
          
          {favoriteSounds.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8 text-center border border-slate-200 dark:border-slate-700">
              <div className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">No favorites yet</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Add some sounds to your favorites to see them here.
              </p>
              <div className="mt-6">
                <Link
                  to="/library"
                  className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-full text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-md hover:shadow-primary-500/30 transition-all duration-200"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Browse Sound Library
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteSounds.map((sound) => (
                <div key={sound.id} className="relative rounded-2xl bg-white dark:bg-emerald-900 p-6 shadow-sm hover:shadow-md border border-slate-200 dark:border-emerald-800 transition-all duration-200 group">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-primary-100 dark:bg-emerald-800 flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-emerald-700 transition-colors duration-200">
                      <span className="text-primary-600 dark:text-primary-300 text-xl font-medium">
                        {sound.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white truncate">{sound.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Background Sound</p>
                      <div className="mt-3">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-1.5 border border-transparent text-sm font-medium rounded-full text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-slate-700 dark:text-primary-200 dark:hover:bg-slate-600 transition-colors duration-200"
                        >
                          Play Sound
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to find your calm?
          </h2>
          <p className="mt-4 text-xl text-primary-100">
            Start your journey to better mental well-being today.
          </p>
          <div className="mt-8">
            <Link
              to="/relax"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-primary-600 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
