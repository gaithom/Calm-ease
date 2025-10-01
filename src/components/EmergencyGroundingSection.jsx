import React, { useState, useEffect } from 'react';

const QUICK_GROUNDING_TECHNIQUES = [
  {
    id: 'body-scan',
    name: 'Body Scan',
    duration: 30,
    icon: '🧘‍♀️',
    color: 'purple',
    steps: [
      'Close your eyes and take a deep breath',
      'Start at the top of your head - notice any tension',
      'Slowly scan down to your forehead and face',
      'Move to your neck and shoulders - let them relax',
      'Check your chest and arms - breathe deeply',
      'Notice your stomach and back',
      'Scan your hips and legs',
      'End at your feet - feel them touching the ground'
    ]
  },
  {
    id: 'pressure-points',
    name: 'Pressure Points',
    duration: 20,
    icon: '✋',
    color: 'blue',
    steps: [
      'Press the space between your thumb and index finger',
      'Hold for 5 seconds, breathe deeply',
      'Press the center of your palm with the other thumb',
      'Massage your temples in small circles',
      'Press the point between your eyebrows',
      'Gently squeeze your earlobes',
      'Press both sides of your neck (gently)',
      'Take three deep breaths to finish'
    ]
  },
  {
    id: 'safe-place',
    name: 'Safe Place Visualization',
    duration: 25,
    icon: '🏡',
    color: 'green',
    steps: [
      'Think of a place where you feel completely safe',
      'It could be real or imaginary',
      'Picture yourself there in detail',
      'What do you see around you?',
      'What sounds do you hear?',
      'What does the air feel like on your skin?',
      'Notice how safe and peaceful you feel',
      'Stay here as long as you need'
    ]
  }
];

const IMMEDIATE_GROUNDING = [
  {
    name: 'Name 3 Colors',
    instruction: 'Look around and name 3 different colors you can see',
    icon: '🎨'
  },
  {
    name: 'Feel Your Feet',
    instruction: 'Press your feet firmly into the ground and notice the sensation',
    icon: '👣'
  },
  {
    name: 'Count Backward',
    instruction: 'Count backward from 10 to 1, slowly and clearly',
    icon: '🔢'
  },
  {
    name: 'Cold Water',
    instruction: 'Splash cold water on your face or hold an ice cube',
    icon: '❄️'
  }
];

export default function EmergencyGroundingSection({ quickGroundingActive }) {
  const [activeExercise, setActiveExercise] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Handle quick grounding timer
  useEffect(() => {
    if (!quickGroundingActive) return;

    setTimeRemaining(30);
    setIsRunning(true);

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [quickGroundingActive]);

  const startExercise = (exercise) => {
    setActiveExercise(exercise);
    setCurrentStep(0);
    setTimeRemaining(exercise.duration);
    setIsRunning(true);

    // Auto-advance through steps
    const stepInterval = exercise.duration / exercise.steps.length;
    let stepTimer = 0;
    
    const interval = setInterval(() => {
      stepTimer += 1;
      
      if (stepTimer >= stepInterval && currentStep < exercise.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
        stepTimer = 0;
      }
      
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          setActiveExercise(null);
          setCurrentStep(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const stopExercise = () => {
    setActiveExercise(null);
    setIsRunning(false);
    setCurrentStep(0);
    setTimeRemaining(0);
  };

  return (
    <section className="mt-8">
      <div className="max-w-4xl mx-auto">
        {/* Active Exercise Display */}
        {activeExercise && (
          <div className="mb-8 card border-2 border-emerald-300 dark:border-emerald-600 bg-emerald-50/70 dark:bg-emerald-900/30">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="text-3xl">{activeExercise.icon}</span>
                <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200">
                  {activeExercise.name}
                </h3>
              </div>
              <div className="text-sm text-emerald-700 dark:text-emerald-300">
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')} remaining
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-lg font-medium text-slate-800 dark:text-white mb-2">
                Step {currentStep + 1} of {activeExercise.steps.length}
              </div>
              <p className="text-lg text-slate-700 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                {activeExercise.steps[currentStep]}
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={stopExercise}
                className="btn btn-outline px-6"
              >
                Stop Exercise
              </button>
            </div>

            {/* Progress bar */}
            <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${((activeExercise.duration - timeRemaining) / activeExercise.duration) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Quick grounding feedback */}
        {quickGroundingActive && !activeExercise && (
          <div className="mb-8 card border-2 border-amber-300 dark:border-amber-600 bg-amber-50/70 dark:bg-amber-900/30">
            <div className="text-center">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">
                Quick Grounding Active
              </h3>
              <p className="text-amber-700 dark:text-amber-300 mb-3">
                Focus on your breathing and the present moment
              </p>
              <div className="text-sm text-amber-600 dark:text-amber-400">
                {timeRemaining} seconds remaining
              </div>
              <div className="mt-3 w-full bg-amber-200 dark:bg-amber-700 rounded-full h-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${((30 - timeRemaining) / 30) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main content when no active exercise */}
        {!activeExercise && !quickGroundingActive && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-light text-slate-800 dark:text-amber-50 mb-2">
                Choose what feels right for you
              </h2>
              <p className="text-slate-600 dark:text-slate-300">Immediate techniques or guided exercises</p>
            </div>

            {/* Immediate Relief Cards */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-red-700 dark:text-red-300">
                🚨 Right Now (10-15 seconds each)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {IMMEDIATE_GROUNDING.map((technique, index) => (
                  <div
                    key={index}
                    className="card border-l-4 border-l-red-400 hover:border-l-red-500 transition-colors cursor-pointer hover:bg-red-50/50 dark:hover:bg-red-900/20"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{technique.icon}</div>
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                        {technique.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
                        {technique.instruction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guided Exercises */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">
                🧘 Guided Exercises
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {QUICK_GROUNDING_TECHNIQUES.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="card border-l-4 border-l-blue-400 hover:border-l-blue-500 transition-all hover:shadow-md cursor-pointer"
                    onClick={() => startExercise(exercise)}
                  >
                    <div className="text-center mb-4">
                      <div className="text-3xl mb-2">{exercise.icon}</div>
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                        {exercise.name}
                      </h4>
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {exercise.duration} seconds • {exercise.steps.length} steps
                      </div>
                    </div>
                    
                    <button className="w-full btn btn-primary btn-sm">
                      Start {exercise.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Recovery message */}
        {!quickGroundingActive && !activeExercise && (
          <div className="mt-8 text-center p-6 bg-green-50/50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <div className="text-2xl mb-2">🌱</div>
            <p className="text-green-800 dark:text-green-200">
              <strong>Remember:</strong> You are safe. You are here. This moment will pass.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}