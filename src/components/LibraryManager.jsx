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
    <div className="flex flex-col sm:flex-row sm:items-end gap-3">
      <div>
        <h2 className="text-xl font-semibold">My Library</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">Upload calming songs or voice notes, and play them as voice guidance or background.</p>
      </div>
      <div className="sm:ml-auto flex items-center gap-3">
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="radio" name="kind" value="background" checked={kind==='background'} onChange={() => setKind('background')} />
          Background
        </label>
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="radio" name="kind" value="voice" checked={kind==='voice'} onChange={() => setKind('voice')} />
          Voice
        </label>
      </div>
    </div>
  ), [kind]);

  return (
    <section className="card" aria-label="Your personal audio library">
      {header}

      <div className="mt-4 flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2">
          <label className="block text-sm text-slate-600 dark:text-slate-300">Upload audio files</label>
          <input
            type="file"
            accept="audio/*"
            multiple
            onChange={onPickFiles}
            className="mt-1 block w-full text-sm"
          />
          <p className="mt-2 text-xs text-slate-500">Files are stored locally in your browser (IndexedDB). They never leave your device.</p>

          <form onSubmit={onAddByUrl} className="mt-4 flex gap-2">
            <input
              type="url"
              placeholder="Add audio by URL (not YouTube)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 p-2"
            />
            <button className="btn btn-ghost" disabled={adding}>Add URL</button>
          </form>
          <p className="mt-1 text-xs text-slate-500">For YouTube, upload an audio file you own or ask to embed a YouTube player instead.</p>
        </div>

        <div className="md:w-1/2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Saved tracks</h3>
            <button className="text-sm underline" onClick={refresh} disabled={loading}>Refresh</button>
          </div>
          {loading ? (
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Loading…</p>
          ) : items.length === 0 ? (
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">No tracks yet. Upload files or add by URL.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {items.map((it) => (
                <li key={it.id} className="flex items-center justify-between gap-3 rounded-lg bg-white/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 p-3">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">{it.kind} • {(it.size/1024/1024).toFixed(2)} MB</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="btn btn-ghost" onClick={() => playItem(it)}>{it.kind === 'voice' ? 'Play Voice' : 'Play Background'}</button>
                    <button className="btn btn-ghost" onClick={() => removeItem(it.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
