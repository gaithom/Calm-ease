import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmergencyMode from '../components/EmergencyMode';
import calmTheme from '../theme';

export default function Home() {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  
  if (emergencyMode) {
    return <EmergencyMode onExit={() => setEmergencyMode(false)} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: calmTheme.colors.background.light,
      color: calmTheme.colors.text.light,
      fontFamily: calmTheme.fonts.body,
      position: 'relative',
      overflowX: 'hidden',
    }}>
      {/* Floating Emergency Button */}
      <button 
        onClick={() => setEmergencyMode(true)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: calmTheme.colors.primary[500],
          color: 'white',
          border: 'none',
          boxShadow: calmTheme.shadows.lg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          fontSize: '14px',
          fontWeight: 500,
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span style={{ fontSize: '24px', marginBottom: '4px' }}>🆘</span>
        <span>I need help</span>
      </button>

      {/* Main Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px',
        textAlign: 'center',
      }}>
        {/* Header */}
        <header style={{ marginBottom: '60px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 20px',
            borderRadius: '20px',
            backgroundColor: calmTheme.colors.primary[100],
            color: calmTheme.colors.primary[700],
            marginBottom: '20px',
            fontSize: '15px',
          }}>
            <span>🤗</span>
            <span>You're not alone</span>
          </div>
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 300,
            color: calmTheme.colors.text.light,
            marginBottom: '20px',
            lineHeight: 1.3,
          }}>
            Calm moments,<br />
            <span style={{
              fontWeight: 500,
              background: `linear-gradient(135deg, ${calmTheme.colors.primary[500]}, ${calmTheme.colors.secondary[500]})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>one breath at a time</span>
          </h1>
          
          <p style={{
            fontSize: '1.1rem',
            color: calmTheme.colors.text.light,
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Simple, gentle tools designed specifically for anxiety relief.
          </p>
        </header>

        {/* Main Actions */}
        <div style={{
          display: 'grid',
          gap: '20px',
          marginBottom: '60px',
        }}>
          <Link
            to="/relax"
            style={{
              display: 'block',
              backgroundColor: calmTheme.colors.primary[500],
              color: 'white',
              padding: '20px',
              borderRadius: calmTheme.radii.lg,
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              boxShadow: calmTheme.shadows.md,
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            🌬️ Start Breathing Exercise
          </Link>
          
          <Link
            to="/grounding"
            style={{
              display: 'block',
              backgroundColor: calmTheme.colors.secondary[500],
              color: 'white',
              padding: '20px',
              borderRadius: calmTheme.radii.lg,
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              boxShadow: calmTheme.shadows.md,
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            🌍 Grounding Exercise
          </Link>
        </div>

        {/* More Options */}
        <div>
          <button 
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            style={{
              backgroundColor: 'transparent',
              border: `1px solid ${calmTheme.colors.primary[300]}`,
              color: calmTheme.colors.primary[600],
              padding: '12px 24px',
              borderRadius: calmTheme.radii.md,
              fontSize: '1rem',
              cursor: 'pointer',
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto 30px',
            }}
          >
            {showMoreOptions ? 'Show Less' : 'More Options'}
            <span style={{
              transform: showMoreOptions ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.3s ease',
              display: 'inline-block',
            }}>▼</span>
          </button>

          {showMoreOptions && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              padding: '20px',
              borderRadius: calmTheme.radii.lg,
              marginBottom: '40px',
              textAlign: 'left',
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                marginBottom: '15px',
                color: calmTheme.colors.primary[700],
              }}>Additional Resources</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gap: '12px',
              }}>
                <li>
                  <a href="#" style={{
                    color: calmTheme.colors.primary[600],
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span>📚</span>
                    <span>Guided Meditations</span>
                  </a>
                </li>
                <li>
                  <a href="#" style={{
                    color: calmTheme.colors.primary[600],
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span>🎵</span>
                    <span>Calming Sounds</span>
                  </a>
                </li>
                <li>
                  <a href="#" style={{
                    color: calmTheme.colors.primary[600],
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span>📱</span>
                    <span>Emergency Contacts</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Anxiety-Specific Support Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50/80 to-white dark:from-emerald-900/40 dark:to-emerald-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-emerald-900 dark:text-white sm:text-4xl mb-4">
              When <span className="font-semibold text-emerald-700 dark:text-emerald-300">anxiety symptoms</span> feel overwhelming
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              We understand what you're going through. Here's how our tools can help with specific anxiety symptoms.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Racing Heart */}
            <div className="bg-emerald-50/20 dark:bg-emerald-900/30 backdrop-blur-sm p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30 shadow-lg transition-all">
              <div className="w-16 h-16 bg-red-100/70 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">❤️‍🩹</span>
              </div>
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-200 text-center mb-3">
                Racing Heart & Panic
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-center mb-4 text-sm">
                When your heart is pounding and you feel like you can't breathe
              </p>
              <div className="bg-red-50/60 dark:bg-red-900/30 p-3 rounded-lg backdrop-blur-sm border border-red-200/30 dark:border-red-700/30">
                <p className="text-xs text-red-800 dark:text-red-200 font-medium">✓ Box breathing slows your heart rate</p>
                <p className="text-xs text-red-800 dark:text-red-200 font-medium">✓ Cold water activates your parasympathetic nervous system</p>
              </div>
            </div>

            {/* Racing Thoughts */}
            <div className="bg-emerald-50/20 dark:bg-emerald-900/30 backdrop-blur-sm p-6 rounded-2xl border border-purple-200/30 dark:border-purple-700/30 shadow-lg transition-all">
              <div className="w-16 h-16 bg-purple-100/70 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">🌪️</span>
              </div>
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-200 text-center mb-3">
                Racing Thoughts
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-center mb-4 text-sm">
                When your mind won't stop spinning and you can't focus
              </p>
              <div className="bg-purple-50/60 dark:bg-purple-900/30 p-3 rounded-lg backdrop-blur-sm border border-purple-200/30 dark:border-purple-700/30">
                <p className="text-xs text-purple-800 dark:text-purple-200 font-medium">✓ 5-4-3-2-1 grounds you in the present</p>
                <p className="text-xs text-purple-800 dark:text-purple-200 font-medium">✓ Background sounds give your mind something to focus on</p>
              </div>
            </div>

            {/* Feeling Disconnected */}
            <div className="bg-emerald-50/20 dark:bg-emerald-900/30 backdrop-blur-sm p-6 rounded-2xl border border-amber-200/30 dark:border-amber-700/30 shadow-lg transition-all">
              <div className="w-16 h-16 bg-amber-100/70 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl">🫥</span>
              </div>
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-200 text-center mb-3">
                Feeling Disconnected
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-center mb-4 text-sm">
                When you feel like you're floating or not really \"here\"
              </p>
              <div className="bg-amber-50/60 dark:bg-amber-900/30 p-3 rounded-lg backdrop-blur-sm border border-amber-200/30 dark:border-amber-700/30">
                <p className="text-xs text-amber-800 dark:text-amber-200 font-medium">✓ Grounding techniques reconnect you with your body</p>
                <p className="text-xs text-amber-800 dark:text-amber-200 font-medium">✓ Sensory focus brings you back to the present</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
          <div className="bg-emerald-50/20 dark:bg-emerald-900/30 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto border border-emerald-200/30 dark:border-emerald-700/30 shadow-lg">
              <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                🌱 Remember: Anxiety is treatable
              </h3>
              <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                These tools are designed to complement professional treatment. 
                If anxiety is significantly impacting your daily life, please consider speaking with a mental health professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supportive Final CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-100/90 via-white/80 to-emerald-50/90 dark:from-emerald-900/40 dark:via-emerald-800/30 dark:to-emerald-900/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-6">🌱</div>
          <h2 className="text-3xl font-light text-emerald-900 dark:text-white sm:text-4xl mb-4">
            Taking the first step takes <span className="font-semibold text-emerald-700 dark:text-emerald-300">courage</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            You've already shown strength by seeking support for your anxiety. 
            These tools are here whenever you're ready - there's no pressure, no judgment, just gentle support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/relax"
              className="btn btn-primary btn-lg px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              😌 I'm ready to try breathing
            </Link>
            <Link
              to="/grounding"
              className="btn btn-secondary btn-lg px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              🧠 I'd like to try grounding
            </Link>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
            You can start with just 30 seconds. Progress, not perfection. ❤️
          </p>
        </div>
      </section>
    </div>
  );
}
