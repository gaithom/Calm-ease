import React, { useState, useEffect } from 'react';

const EmergencyMode = ({ onExit }) => {
  const [breathing, setBreathing] = useState(false);
  const [step, setStep] = useState(0);
  const steps = [
    "You're safe right now.",
    "Breathe in slowly...",
    "Hold for a moment...",
    "Breathe out slowly...",
    "You're doing great.",
  ];

  useEffect(() => {
    if (breathing) {
      const timer = setInterval(() => {
        setStep((prev) => (prev + 1) % steps.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [breathing, steps.length]);

  return (
    <div className="fixed inset-0 bg-background-light flex flex-col items-center justify-center z-50 p-5 text-center">
      <div className="max-w-md w-full">
        <div
          className={`w-36 h-36 rounded-full mx-auto mb-10 flex items-center justify-center transition-all duration-1000 ease-in-out shadow-md ${breathing ? 'bg-primary-200 scale-110' : 'bg-primary-100 scale-100'}`}>
          <span className="text-4xl text-primary-700">
            {breathing ? '🌬️' : '😌'}
          </span>
        </div>

        <h2 className="text-2xl mb-5 text-text-light font-medium">
          {steps[step]}
        </h2>

        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <button
            onClick={() => setBreathing(!breathing)}
            className={`text-white border-none px-4 py-4 rounded-md text-lg font-medium cursor-pointer transition-all duration-200 ${breathing ? 'bg-primary-500' : 'bg-primary-400'}`}>
            {breathing ? 'Pause Breathing' : 'Start Calm Breathing'}
          </button>

          <button
            onClick={onExit}
            className="bg-transparent text-primary-600 border border-primary-300 px-4 py-3 rounded-md text-base cursor-pointer transition-all duration-200">
            Exit Emergency Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyMode;
