import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import calmTheme from '../theme';

const EmergencyMode = ({ onExit }) => {
  const [breathing, setBreathing] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
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
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: calmTheme.colors.background.light,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
      }}>
        <div style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          backgroundColor: breathing ? calmTheme.colors.primary[200] : calmTheme.colors.primary[100],
          margin: '0 auto 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 1.5s ease-in-out',
          transform: breathing ? 'scale(1.1)' : 'scale(1)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
        }}>
          <span style={{
            fontSize: '24px',
            color: calmTheme.colors.primary[700],
          }}>
            {breathing ? '🌬️' : '😌'}
          </span>
        </div>

        <h2 style={{
          fontSize: '24px',
          marginBottom: '20px',
          color: calmTheme.colors.text.light,
          fontWeight: 500,
        }}>
          {steps[step]}
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '100%',
          maxWidth: '300px',
          margin: '0 auto',
        }}>
          <button
            onClick={() => setBreathing(!breathing)}
            style={{
              backgroundColor: breathing ? calmTheme.colors.primary[500] : calmTheme.colors.primary[400],
              color: 'white',
              border: 'none',
              padding: '16px',
              borderRadius: calmTheme.radii.md,
              fontSize: '18px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {breathing ? 'Pause Breathing' : 'Start Calm Breathing'}
          </button>

          <button
            onClick={onExit}
            style={{
              backgroundColor: 'transparent',
              color: calmTheme.colors.primary[600],
              border: `1px solid ${calmTheme.colors.primary[300]}`,
              padding: '12px',
              borderRadius: calmTheme.radii.md,
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Exit Emergency Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyMode;
