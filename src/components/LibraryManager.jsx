import React, { useEffect, useMemo, useState } from 'react';
import { addTrack, listTracks, getTrackURL, removeTrack } from '../utils/db';
import { useSound } from '../context/SoundContext';

export default function LibraryManager() {
  const { playVoice, playBg, pauseVoice, pauseBg } = useSound();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kind, setKind] = useState('background'); // 'background' | 'voice'
  const [adding, setAdding] = useState(false);
  const [objectURLs, setObjectURLs] = useState({});
  const [urlInput, setUrlInput] = useState('');

  const refresh = async () => {
    setLoading(true);
    const rows = await listTracks();
    setItems(rows);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
    return () => {
      // Revoke any created object URLs to avoid leaks
      Object.values(objectURLs).forEach(u => URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFiles = async (files) => {
    if (!files?.length) return;
    setAdding(true);
    try {
      for (const file of files) {
        const name = file.name.replace(/\.[^.]+$/, '') || 'Untitled';
        await addTrack({ name, kind, file });
      }
      await refresh();
    } finally {
      setAdding(false);
    }
  };

  const playItem = async (it) => {
    // Create or reuse object URL
    let url = objectURLs[it.id];
    if (!url) {
      url = await getTrackURL(it.id);
      setObjectURLs((prev) => ({ ...prev, [it.id]: url }));
    }
    if (it.kind === 'voice') {
      await playVoice(url);
    } else {
      await playBg(url);
    }
  };

  const stopAll = () => {
    pauseVoice();
    pauseBg();
  };

  const removeItem = async (id) => {
    stopAll();
    await removeTrack(id);
    if (objectURLs[id]) {
      URL.revokeObjectURL(objectURLs[id]);
      setObjectURLs((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
    await refresh();
  };

  const onPickFiles = (e) => onFiles(e.target.files);

  const onAddByUrl = async (e) => {
    e.preventDefault();
    const url = urlInput.trim();
    if (!url) return;
    if (/youtube\.com|youtu\.be/.test(url)) {
      alert('YouTube links cannot be added as audio files. Please upload an audio file you own, or ask me to embed a YouTube player.');
      return;
    }
    try {
      setAdding(true);
      // Fetch remote file as Blob (may be blocked by CORS)
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch URL');
      const blob = await res.blob();
      const fileName = url.split('/').pop()?.split('?')[0] || 'Track';
      await addTrack({ name: fileName, kind, file: blob });
      setUrlInput('');
      await refresh();
    } catch (err) {
      alert('Could not fetch that URL (CORS or invalid audio). Please download the file and upload it here.');
    } finally {
      setAdding(false);
    }
  };

  const header = useMemo(() => (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-light text-slate-800 dark:text-slate-200 mb-4">
        Manage Your <span className="font-semibold text-emerald-700 dark:text-emerald-300">Audio Collection</span>
      </h2>
      
      <div className="inline-flex flex-wrap justify-center items-center gap-4 p-2 rounded-2xl bg-slate-100/70 dark:bg-slate-700/40 border border-slate-200/50 dark:border-slate-600/50">
        <label className="inline-flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all hover:bg-white/70 dark:hover:bg-slate-600/50 text-sm font-medium">
          <input 
            type="radio" 
            name="kind" 
            value="background" 
            checked={kind==='background'} 
            onChange={() => setKind('background')}
            className="text-emerald-600 dark:text-emerald-400 focus:ring-emerald-500" 
          />
          <span className="text-slate-700 dark:text-slate-300">🎵 Background Music</span>
        </label>
        <label className="inline-flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all hover:bg-white/70 dark:hover:bg-slate-600/50 text-sm font-medium">
          <input 
            type="radio" 
            name="kind" 
            value="voice" 
            checked={kind==='voice'} 
            onChange={() => setKind('voice')}
            className="text-emerald-600 dark:text-emerald-400 focus:ring-emerald-500" 
          />
          <span className="text-slate-700 dark:text-slate-300">🎤 Voice Guidance</span>
        </label>
      </div>
    </div>
  ), [kind]);

  return (
    <section className="bg-white/70 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200/60 dark:border-slate-700/50 backdrop-blur-sm shadow-lg" aria-label="Your personal audio library">
      {header}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-50/70 to-sky-50/70 dark:from-emerald-900/20 dark:to-sky-900/20 rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-700/30">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📁</span>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Upload Files</h3>
            </div>
            
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Choose audio files from your device</label>
            <input
              type="file"
              accept="audio/*"
              multiple
              onChange={onPickFiles}
              className="mt-1 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-emerald-100 dark:file:bg-emerald-800 file:text-emerald-700 dark:file:text-emerald-200 hover:file:bg-emerald-200 dark:hover:file:bg-emerald-700 file:cursor-pointer"
            />
            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
              <span>🔒</span>
              <span>Stored locally - never leaves your device</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/70 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/30">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔗</span>
              <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">Add by URL</h3>
            </div>
            
            <form onSubmit={onAddByUrl} className="space-y-3">
              <input
                type="url"
                placeholder="Paste audio URL here"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-700/60 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit"
                className="w-full btn bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-xl" 
                disabled={adding}
              >
                {adding ? 'Adding...' : 'Add Audio URL'}
              </button>
            </form>
            <div className="mt-3 flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
              <span>⚠️</span>
              <span>YouTube links not supported - upload audio files instead</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-violet-50/70 to-purple-50/70 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-violet-200/50 dark:border-violet-700/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎶</span>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Your Collection</h3>
              </div>
              <button 
                className="text-sm px-4 py-2 rounded-lg bg-violet-100 dark:bg-violet-800 text-violet-700 dark:text-violet-200 hover:bg-violet-200 dark:hover:bg-violet-700 transition-colors" 
                onClick={refresh} 
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">⏳</div>
                <p className="text-sm text-slate-600 dark:text-slate-300">Loading your audio collection...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🎵</div>
                <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">No tracks yet</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Upload your first audio file or add a URL to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((it) => (
                  <div key={it.id} className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/80 dark:bg-slate-700/60 border border-slate-200/60 dark:border-slate-600/60 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="text-2xl">{it.kind === 'voice' ? '🎤' : '🎵'}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-800 dark:text-slate-200 truncate">{it.name}</div>
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <span className={`px-2 py-1 rounded-full ${
                            it.kind === 'voice' 
                              ? 'bg-purple-100 dark:bg-purple-800/50 text-purple-700 dark:text-purple-300'
                              : 'bg-blue-100 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300'
                          }`}>
                            {it.kind === 'voice' ? 'Voice Guidance' : 'Background'}
                          </span>
                          <span>• {(it.size/1024/1024).toFixed(2)} MB</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        className="btn btn-sm flex-grow sm:flex-grow-0 bg-emerald-600 hover:bg-emerald-700 text-white border-0 rounded-lg" 
                        onClick={() => playItem(it)}
                      >
                        ▶️ Play
                      </button>
                      <button 
                        className="btn btn-sm btn-outline btn-error rounded-lg" 
                        onClick={() => removeItem(it.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="flex justify-center gap-4">
            <button 
              className="btn btn-outline rounded-xl px-6" 
              onClick={stopAll}
            >
              ⏸️ Stop All Audio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
