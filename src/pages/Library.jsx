import React from 'react';
import LibraryManager from '../components/LibraryManager';

export default function Library() {
  return (
    <div className="space-y-6">
      <LibraryManager />
      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Notes</h2>
        <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 text-sm">
          <li>Files are stored locally in your browser (IndexedDB). They never upload to a server.</li>
          <li>You can upload songs or voice notes and play them as voice guidance or background.</li>
          <li>YouTube links can’t be added as audio files due to copyright/CORS. If you want, I can add a YouTube embed player instead.</li>
        </ul>
      </section>
    </div>
  );
}
