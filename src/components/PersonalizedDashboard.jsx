import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RECENT_ACTIVITIES = [
  { type: 'breathing', name: '4-7-8 Breathing', time: '2 hours ago', duration: '3 min', icon: '🫁' },
  { type: 'grounding', name: '5-4-3-2-1 Exercise', time: '1 day ago', duration: '5 min', icon: '🧠' },
  { type: 'sounds', name: 'Ocean Waves', time: '2 days ago', duration: '15 min', icon: '🌊' }
];

const SUGGESTED_ACTIVITIES = [
  { 
    name: 'Try Morning Breathing', 
    description: 'Start your day with 3 minutes of calm breathing',
    link: '/relax',
    icon: '🌅',
    reason: 'Great for morning anxiety'
  },
  { 
    name: 'Quick Grounding Check', 
    description: 'Use your senses to reconnect with the present',
    link: '/grounding',
    icon: '🌱',
    reason: 'Helps when feeling scattered'
  },
  { 
    name: 'Evening Wind Down', 
    description: 'Gentle sounds to help you transition to rest',
    link: '/library',
    icon: '🌙',
    reason: 'Perfect for better sleep'
  }
];

export default function PersonalizedDashboard({ favoriteSounds = [] }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const getTimeOfDayMessage = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { message: "Good morning! How are you feeling today?", icon: "🌅" };
    if (hour < 17) return { message: "Good afternoon! Need a moment to reset?", icon: "☀️" };
    return { message: "Good evening! Ready to unwind?", icon: "🌙" };
  };

  const timeMessage = getTimeOfDayMessage();

  // Mock data - in real app this would come from user's actual usage
  const weeklyStats = {
    sessionsCompleted: 12,
    totalMinutes: 45,
    longestStreak: 5,
    favoriteTime: 'Evening'
  };

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50/50 to-blue-50/50 dark:from-emerald-950/50 dark:to-blue-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Personal Greeting */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-white dark:bg-white rounded-full shadow-md border border-emerald-200 dark:border-emerald-300">
            <span className="text-2xl">{timeMessage.icon}</span>
            <span className="font-medium text-slate-800 dark:text-slate-800">{timeMessage.message}</span>
          </div>
          <h2 className="text-3xl font-light text-emerald-900 dark:text-white mb-2">
            Your <span className="font-semibold text-emerald-700 dark:text-emerald-300">calm journey</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Every small step towards calm matters. Here's how you're doing.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white dark:bg-white rounded-2xl p-4 text-center border border-emerald-300 dark:border-emerald-300 shadow-sm">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-700">{weeklyStats.sessionsCompleted}</div>
            <div className="text-xs text-slate-600 dark:text-slate-600">Sessions this week</div>
          </div>
          
          <div className="bg-white dark:bg-white rounded-2xl p-4 text-center border border-emerald-300 dark:border-emerald-300 shadow-sm">
            <div className="text-2xl mb-2">⏱️</div>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-700">{weeklyStats.totalMinutes}m</div>
            <div className="text-xs text-slate-600 dark:text-slate-600">Total practice time</div>
          </div>
          
          <div className="bg-white dark:bg-white rounded-2xl p-4 text-center border border-emerald-300 dark:border-emerald-300 shadow-sm">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-700">{weeklyStats.longestStreak}</div>
            <div className="text-xs text-slate-600 dark:text-slate-600">Day streak</div>
          </div>
          
          <div className="bg-white dark:bg-white rounded-2xl p-4 text-center border border-emerald-300 dark:border-emerald-300 shadow-sm">
            <div className="text-2xl mb-2">🌟</div>
            <div className="text-sm font-bold text-emerald-700 dark:text-emerald-700">{weeklyStats.favoriteTime}</div>
            <div className="text-xs text-slate-600 dark:text-slate-600">Preferred time</div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-white rounded-2xl p-6 border border-emerald-200 dark:border-emerald-300 shadow-md">
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-900 mb-4 flex items-center gap-2">
                <span className="text-xl">📋</span>
                Recent Activity
              </h3>
              
              {RECENT_ACTIVITIES.length > 0 ? (
                <div className="space-y-3">
                  {RECENT_ACTIVITIES.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-50/50 dark:bg-slate-700/50 rounded-lg">
                      <div className="text-xl">{activity.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-800 dark:text-white text-sm truncate">
                          {activity.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {activity.time} • {activity.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                  <div className="text-2xl mb-2">🌱</div>
                  <p className="text-sm">Start your first session to see activity here</p>
                </div>
              )}
            </div>
          </div>

          {/* Suggested for You */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-white rounded-2xl p-6 border border-emerald-200 dark:border-emerald-300 shadow-md">
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-900 mb-4 flex items-center gap-2">
                <span className="text-xl">💡</span>
                Suggested for You
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SUGGESTED_ACTIVITIES.map((activity, index) => (
                  <Link
                    key={index}
                    to={activity.link}
                    className="block p-4 bg-gradient-to-br from-slate-50/80 to-emerald-50/80 dark:from-slate-700/50 dark:to-emerald-900/30 rounded-xl border border-emerald-200/30 dark:border-emerald-700/30 hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{activity.icon}</div>
                      <h4 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">
                        {activity.name}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                        {activity.description}
                      </p>
                      <div className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                        {activity.reason}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Your Favorite Sounds */}
        {favoriteSounds.length > 0 && (
          <div className="mt-8">
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-xl">❤️</span>
                  Your Favorite Sounds
                </h3>
                <Link to="/library" className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
                  View all →
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteSounds.slice(0, 3).map((sound) => (
                  <div key={sound.id} className="flex items-center gap-3 p-3 bg-slate-50/50 dark:bg-slate-700/50 rounded-lg">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-800 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-600 dark:text-emerald-300 font-medium">
                        {sound.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-800 dark:text-white text-sm truncate">
                        {sound.name}
                      </div>
                      <button className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
                        Play now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Encouragement */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-emerald-100/80 to-blue-100/80 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-700/50 max-w-3xl mx-auto">
            <div className="text-3xl mb-3">🌈</div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
              You're doing great!
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Taking time for your mental health is an act of self-care and strength. 
              Every session, no matter how short, is progress worth celebrating.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/relax" className="btn btn-primary px-6 py-2">
                Continue Your Practice
              </Link>
              <Link to="/grounding" className="btn btn-secondary px-6 py-2">
                Try Something New
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}