import React from 'react';

const ValueCard = ({ icon, title, children }) => (
  <div className="bg-white/60 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">{title}</h3>
    <p className="text-slate-600 dark:text-slate-300 text-sm">{children}</p>
  </div>
);

export default function About() {
  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-emerald-900">
      <div className="relative z-10">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <section
            className="relative rounded-3xl p-8 md:p-12 bg-gradient-to-br from-blue-50/80 via-emerald-50/60 to-indigo-50/80 dark:from-emerald-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 border border-emerald-100/50 dark:border-emerald-800/30 backdrop-blur-sm mb-12"
            aria-label="About introduction"
          >
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-emerald-100/70 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200">
                <span className="text-lg">💡</span>
                <span className="text-sm font-medium">About Calm-ease</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-light text-slate-800 dark:text-emerald-50 mb-4 leading-relaxed">
                A safe space for your mental well-being
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
                Calm-ease is a lightweight, accessible app designed to help you manage anxiety using guided relaxation, grounding, and soothing sounds. Use the Calm Now button whenever you need immediate relief.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light text-center text-slate-800 dark:text-white mb-8">Our Core Principles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <ValueCard icon="🤝" title="Accessibility">
                We strive to make our app accessible to everyone, regardless of their technical skills or physical abilities.
              </ValueCard>
              <ValueCard icon="🔒" title="Privacy">
                We are committed to protecting your privacy and will never share your data with third parties.
              </ValueCard>
              <ValueCard icon="❤️" title="Empathy">
                We believe in the power of empathy and compassion, and we strive to create a supportive and non-judgmental community.
              </ValueCard>
            </div>
          </section>

          <section className="mb-12 glass-card">
            <h2 className="text-3xl font-light text-center text-slate-800 dark:text-white mb-8">Behind the Design</h2>
            <p className="text-slate-700 dark:text-slate-300 max-w-3xl mx-auto text-center">
              Every element of Calm-ease has been thoughtfully designed to create a serene and calming experience. From the soft, muted colors to the gentle animations, our goal is to provide a digital sanctuary where you can find a moment of peace. We've prioritized simplicity and ease-of-use, so you can focus on what matters most: your well-being.
            </p>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-light text-slate-800 dark:text-white mb-4">Join Our Journey</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
              Your feedback and ideas are invaluable to us. If you have any suggestions or just want to share your story, we would love to hear from you.
            </p>
            <a href="mailto:feedback@calm-ease.com" className="inline-block bg-primary-500 text-white px-8 py-3 rounded-lg text-lg font-medium transition-transform transform hover:-translate-y-1 shadow-md">
              Get in Touch
            </a>
          </section>
        </main>
      </div>
    </div>
  );
}
