import React, { useState } from 'react';

const PUBLIC_GROUNDING_TECHNIQUES = [
  {
    id: 'discreet-breathing',
    name: 'Invisible Breathing',
    icon: '😌',
    duration: '1-2 minutes',
    urgency: 'immediate',
    description: 'Calm breathing that looks natural to others',
    color: 'blue',
    steps: [
      'Keep your eyes open and look straight ahead',
      'Breathe in slowly through your nose for 4 counts',
      'Hold gently for 2 counts',
      'Exhale slowly through slightly parted lips for 6 counts',
      'No one around you will notice - this looks completely natural',
      'Continue for 5-10 breaths until you feel steadier'
    ]
  },
  {
    id: 'pocket-grounding',
    name: 'Pocket Anchor',
    icon: '🤲',
    duration: '30 seconds',
    urgency: 'immediate', 
    description: 'Use items in your pocket or bag for grounding',
    color: 'purple',
    steps: [
      'Put your hand in your pocket or bag',
      'Find a coin, key, phone, or any small object',
      'Feel its texture, temperature, weight',
      'Trace its edges with your fingers',
      'Notice: Is it smooth? Rough? Cold? Warm?',
      'This anchors you to the physical world'
    ]
  },
  {
    id: 'mental-list',
    name: 'Silent Categories',
    icon: '🧩',
    duration: '1-3 minutes',
    urgency: 'immediate',
    description: 'Mental exercises that look like normal thinking',
    color: 'green',
    steps: [
      'Pick a category: colors, names, animals, foods',
      'Start with A and mentally list items: Apple, Avocado, Asparagus...',
      'Move to B: Banana, Bread, Butter...',
      'Continue through the alphabet',
      'This occupies your mind and grounds your thoughts',
      'No one knows you\'re doing this - it looks like normal thinking'
    ]
  },
  {
    id: 'observation-game',
    name: 'Secret Observer',
    icon: '👀',
    duration: '2-5 minutes',
    urgency: 'low',
    description: 'Mindful observation that looks like casual looking around',
    color: 'orange',
    steps: [
      'Look around casually, as if you\'re just waiting or people-watching',
      'Count: 3 things that are red, 3 that are blue',
      'Notice textures: rough, smooth, soft, hard',
      'Listen: identify 3 different sounds',
      'Feel your feet in your shoes, your back against the chair',
      'This grounds you while looking completely normal to others'
    ]
  }
];

const BATHROOM_TECHNIQUES = [
  {
    id: 'bathroom-retreat',
    name: 'Bathroom Reset',
    icon: '🚪',
    description: 'Private space for deeper grounding',
    steps: [
      'Find a bathroom - the most acceptable private space in public',
      'Splash cold water on your wrists and face',
      'Look at yourself in the mirror and say "I am safe"',
      'Do 5 deep breaths with full exhales',
      'Ground your feet, feel the floor',
      'Take as much time as you need - no one questions bathroom time'
    ]
  },
  {
    id: 'phone-call-escape',
    name: 'Fake Phone Call',
    icon: '📱',
    description: 'Create a private space using your phone',
    steps: [
      'Hold your phone to your ear (doesn\'t need to be a real call)',
      'Step aside or find a quieter spot',
      'Speak quietly: "Yes, I\'m okay, just taking a moment"',
      'Use this private bubble to do breathing exercises',
      'Ground yourself while looking like you\'re on a call',
      'This gives you permission to step away and collect yourself'
    ]
  }
];

const WORKPLACE_TECHNIQUES = [
  {
    id: 'desk-grounding',
    name: 'Desk Anchor',
    icon: '💻',
    description: 'Grounding at your workspace',
    steps: [
      'Feel your feet flat on the floor under your desk',
      'Press your palms on your desk surface',
      'Notice the temperature and texture',
      'Take slow breaths while typing or reading',
      'Roll your shoulders back 3 times',
      'This looks like normal work behavior'
    ]
  },
  {
    id: 'water-break',
    name: 'Water Cooler Reset',
    icon: '💧',
    description: 'Use water breaks for grounding',
    steps: [
      'Walk slowly to get water',
      'Feel your feet with each step',
      'Focus on the sound of water pouring',
      'Feel the cool cup in your hands',
      'Take 3 slow sips, noticing the temperature',
      'Walk back slowly, feeling grounded'
    ]
  }
];

export default function PublicGroundingExercises() {
  const [activeExercise, setActiveExercise] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const startExercise = (exercise) => {
    setActiveExercise(exercise);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < activeExercise.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const closeExercise = () => {
    setActiveExercise(null);
    setCurrentStep(0);
  };

  return (
    <section className="mt-8">
      <div className="max-w-6xl mx-auto">
        {/* Active Exercise Display */}
        {activeExercise && (
          <div className="mb-8 card border-2 border-amber-300 dark:border-amber-600 bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-900/30 dark:to-orange-900/30">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="text-3xl">{activeExercise.icon}</span>
                <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200">
                  {activeExercise.name}
                </h3>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
                {activeExercise.description}
              </p>
            </div>

            <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Step {currentStep + 1} of {activeExercise.steps.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="btn btn-ghost btn-sm px-2 disabled:opacity-30"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={currentStep === activeExercise.steps.length - 1}
                    className="btn btn-ghost btn-sm px-2 disabled:opacity-30"
                  >
                    Next →
                  </button>
                </div>
              </div>
              
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-center">
                {activeExercise.steps[currentStep]}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-xs text-amber-600 dark:text-amber-400">
                💡 Remember: This looks completely natural to others
              </div>
              <button
                onClick={closeExercise}
                className="btn btn-outline btn-sm px-4"
              >
                I'm Done
              </button>
            </div>

            {/* Progress bar */}
            <div className="mt-4 w-full bg-amber-200 dark:bg-amber-700 rounded-full h-2">
              <div 
                className="bg-amber-500 h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${((currentStep + 1) / activeExercise.steps.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Main content when no active exercise */}
        {!activeExercise && (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-amber-100/70 dark:bg-amber-800/40 text-amber-800 dark:text-amber-200">
                <span className="text-lg">🌆</span>
                <span className="font-medium">Public Spaces & Anxiety</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-light text-slate-800 dark:text-amber-50 mb-3">
                <span className="font-semibold text-amber-700 dark:text-amber-300">Invisible</span> grounding techniques
              </h2>
              
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 max-w-3xl mx-auto">
                These techniques are designed to look completely natural to anyone around you. 
                No one will know you're managing anxiety - they just see normal behavior.
              </p>
            </div>

            {/* Immediate Techniques for Any Public Space */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
                <span className="text-2xl">🚶</span>
                Anywhere in Public (Completely Invisible)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {PUBLIC_GROUNDING_TECHNIQUES.map((technique) => (
                  <div
                    key={technique.id}
                    className={`card border-l-4 hover:shadow-lg transition-all cursor-pointer group ${
                      technique.color === 'blue' ? 'border-l-blue-400 hover:border-l-blue-500 bg-blue-50/30 dark:bg-blue-900/20' :
                      technique.color === 'purple' ? 'border-l-purple-400 hover:border-l-purple-500 bg-purple-50/30 dark:bg-purple-900/20' :
                      technique.color === 'green' ? 'border-l-green-400 hover:border-l-green-500 bg-green-50/30 dark:bg-green-900/20' :
                      'border-l-orange-400 hover:border-l-orange-500 bg-orange-50/30 dark:bg-orange-900/20'
                    }`}
                    onClick={() => startExercise(technique)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {technique.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                          {technique.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                          {technique.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300">
                            {technique.duration}
                          </span>
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Click to start →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Semi-Private Techniques */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
                <span className="text-2xl">🚪</span>
                When You Can Step Away Briefly
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BATHROOM_TECHNIQUES.map((technique, index) => (
                  <div
                    key={technique.id}
                    className="card border-l-4 border-l-indigo-400 hover:border-l-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/20 hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => startExercise(technique)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {technique.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                          {technique.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                          {technique.description}
                        </p>
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Tap for step-by-step guide →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workplace Specific */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
                <span className="text-2xl">🏢</span>
                At Work or School
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {WORKPLACE_TECHNIQUES.map((technique, index) => (
                  <div
                    key={technique.id}
                    className="card border-l-4 border-l-teal-400 hover:border-l-teal-500 bg-teal-50/30 dark:bg-teal-900/20 hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => startExercise(technique)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {technique.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                          {technique.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                          {technique.description}
                        </p>
                        <span className="text-xs text-teal-600 dark:text-teal-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Click for workplace-friendly steps →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reassurance */}
            <div className="text-center p-6 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-700">
              <div className="text-2xl mb-3">🤝</div>
              <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                You're Not Alone in This
              </h3>
              <p className="text-emerald-700 dark:text-emerald-300 text-sm max-w-2xl mx-auto">
                Many people experience anxiety in public spaces. These techniques are used by countless people every day. 
                You're managing your wellbeing wisely and discretely - that's strength, not weakness.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}