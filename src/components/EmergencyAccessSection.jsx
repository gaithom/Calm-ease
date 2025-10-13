import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CRISIS_TECHNIQUES = [
  {
    id: 'box-breathing',
    name: '4-4-4 Box Breathing',
    description: 'Inhale 4s, hold 4s, exhale 4s, hold 4s',
    icon: '📦',
    duration: '30 seconds',
    link: '/relax',
    urgency: 'high'
  },
  {
    id: '54321-grounding',
    name: '5-4-3-2-1 Grounding',
    description: '5 see, 4 touch, 3 hear, 2 smell, 1 taste',
    icon: '🔢',
    duration: '2 minutes',
    link: '/grounding',
    urgency: 'high'
  },
  {
    id: 'cold-water',
    name: 'Cold Water Reset',
    description: 'Splash cold water on face/wrists',
    icon: '❄️',
    duration: '10 seconds',
    urgency: 'immediate'
  },
  {
    id: 'feet-grounding',
    name: 'Feel Your Feet',
    description: 'Press feet firmly into ground',
    icon: '👣',
    duration: '15 seconds',
    urgency: 'immediate'
  }
];

const COMFORT_REMINDERS = [
  "This feeling is temporary and will pass",
  "You are safe right here, right now",
  "You've gotten through difficult moments before",
  "Your feelings are valid, and it's okay to ask for help"
];

export default function EmergencyAccessSection({ quickCalmActive }) {
  const [selectedTechnique, setSelectedTechnique] = useState(null);

  return (
    <section className="py-12 backdrop-blur-sm bg-white/20 dark:bg-slate-800/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Active Quick Calm Feedback */}
        {quickCalmActive && (
          <div className="mb-8 p-6 backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 rounded-2xl border border-white/20 dark:border-white/10 shadow-lg">
            <div className="text-center">
              <div className="text-3xl mb-3">🌱</div>
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
                Quick Calm Active
              </h3>
              <p className="text-green-700 dark:text-green-300 mb-4">
                Take a moment to focus on your breathing. You're doing great.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {COMFORT_REMINDERS.map((reminder, index) => (
                  <div key={index} className="p-3 backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 rounded-lg border border-white/20 dark:border-white/10">
                    <p className="text-green-800 dark:text-green-200">{reminder}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!quickCalmActive && (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-red-100/70 dark:bg-red-800/40 text-red-800 dark:text-red-200">
                <span className="text-lg">⚡</span>
                <span className="font-medium">Crisis Support</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-light text-slate-800 dark:text-amber-50 mb-3">
                If you're having a <span className="font-semibold text-red-700 dark:text-red-300">panic attack</span> or anxiety crisis
              </h2>
              
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 max-w-3xl mx-auto">
                These techniques can help you right now. Choose what feels manageable - even 10 seconds can make a difference.
              </p>
            </div>

            {/* Immediate vs Guided Techniques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              
              {/* Immediate (0-30 seconds) */}
              <div className="backdrop-blur-sm bg-white/20 dark:bg-slate-800/30 rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-lg">
                <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🚨</span>
                  Right Now (0-30 seconds)
                </h3>
                
                <div className="space-y-3">
                  {CRISIS_TECHNIQUES.filter(t => t.urgency === 'immediate').map((technique) => (
                    <div
                      key={technique.id}
                      className="p-4 backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 rounded-lg border border-white/20 dark:border-white/10 cursor-pointer hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors"
                      onClick={() => setSelectedTechnique(technique)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{technique.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {technique.name}
                          </h4>
                          <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                            {technique.description}
                          </p>
                          <div className="text-xs text-red-600 dark:text-red-400">
                            {technique.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guided (30s - 2min) */}
              <div className="backdrop-blur-sm bg-white/20 dark:bg-slate-800/30 rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-lg">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🧘</span>
                  Guided Techniques (30s - 2min)
                </h3>
                
                <div className="space-y-3">
                  {CRISIS_TECHNIQUES.filter(t => t.urgency === 'high').map((technique) => (
                    <Link
                      key={technique.id}
                      to={technique.link}
                      className="block p-4 backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{technique.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {technique.name}
                          </h4>
                          <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                            {technique.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-blue-600 dark:text-blue-400">
                              {technique.duration}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              Tap to start →
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Professional Help Notice */}
            <div className="backdrop-blur-sm bg-white/20 dark:bg-slate-800/30 rounded-2xl p-6 border border-white/20 dark:border-white/10 text-center shadow-lg">
              <div className="text-2xl mb-3">💜</div>
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">
                If you're having thoughts of self-harm
              </h3>
              <p className="text-purple-600 dark:text-purple-200 mb-4">
                Please reach out for professional support immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center text-sm">
                <div className="font-medium text-purple-800 dark:text-purple-100">Crisis Text Line: Text HOME to 741741</div>
                <div className="font-medium text-purple-800 dark:text-purple-100">National Suicide Prevention Lifeline: 988</div>
              </div>
            </div>
          </>
        )}

        {/* Selected Technique Detail Modal/Overlay */}
        {selectedTechnique && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/80 rounded-2xl p-6 max-w-md w-full border border-white/20 dark:border-white/10 shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{selectedTechnique.icon}</div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {selectedTechnique.name}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 mt-2">
                  {selectedTechnique.description}
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                {selectedTechnique.id === 'cold-water' && (
                  <div className="text-center">
                    <p className="text-slate-700 dark:text-slate-300 mb-3">
                      Go to your bathroom or kitchen sink and:
                    </p>
                    <ol className="text-left text-sm space-y-2">
                      <li>1. Turn on cold water</li>
                      <li>2. Cup your hands and splash your face</li>
                      <li>3. Or hold your wrists under the cold water</li>
                      <li>4. Take three deep breaths</li>
                    </ol>
                  </div>
                )}
                
                {selectedTechnique.id === 'feet-grounding' && (
                  <div className="text-center">
                    <p className="text-slate-700 dark:text-slate-300 mb-3">
                      Right where you are:
                    </p>
                    <ol className="text-left text-sm space-y-2">
                      <li>1. Press both feet firmly into the ground</li>
                      <li>2. Notice the feeling of support beneath you</li>
                      <li>3. Say "I am here, I am grounded"</li>
                      <li>4. Take a slow, deep breath</li>
                    </ol>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedTechnique(null)}
                  className="flex-1 btn btn-ghost"
                >
                  Close
                </button>
                {selectedTechnique.link && (
                  <Link
                    to={selectedTechnique.link}
                    className="flex-1 btn btn-primary"
                  >
                    Try Full Version
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}