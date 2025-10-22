import React from 'react';
import { Link } from 'react-router-dom';
import EmergencyAccessSection from '../components/EmergencyAccessSection';
import QuickReliefSection from '../components/QuickReliefSection';
import PersonalizedDashboard from '../components/PersonalizedDashboard';
import ScrollAnimation from '../components/ScrollAnimation';

export default function Home() {
  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-emerald-900">
      <div className="relative z-10">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ScrollAnimation>
            <section
              className="relative rounded-3xl p-8 md:p-12 bg-gradient-to-br from-blue-50/80 via-emerald-50/60 to-indigo-50/80 dark:from-emerald-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 border border-emerald-100/50 dark:border-emerald-800/30 backdrop-blur-sm mb-8"
              aria-label="Welcome message"
            >
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-emerald-100/70 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200">
                  <span className="text-lg">🤗</span>
                  <span className="text-sm font-medium">Welcome to your safe space</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-light text-slate-800 dark:text-emerald-50 mb-4 leading-relaxed">
                  Find your calm, one breath at a time
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
                  This is your space to find peace and quiet. Explore the tools below to get started.
                </p>
              </div>
            </section>
          </ScrollAnimation>

          <ScrollAnimation>
            <QuickReliefSection />
          </ScrollAnimation>
          <ScrollAnimation>
            <PersonalizedDashboard />
          </ScrollAnimation>
          <ScrollAnimation>
            <EmergencyAccessSection />
          </ScrollAnimation>
        </main>
      </div>
    </div>
  );
}
