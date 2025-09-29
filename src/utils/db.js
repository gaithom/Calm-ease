// Simple IndexedDB helper for storing user audio tracks as Blobs
// Schema: DB name 'calmease-db', store 'tracks' with { id, name, kind, createdAt, type, size, blob }

const DB_NAME = 'calmease-db';
const STORE = 'tracks';
const VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
        store.createIndex('kind', 'kind');
        store.createIndex('createdAt', 'createdAt');
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function addTrack({ name, kind, file }) {
  const db = await openDB();
  const tx = db.transaction(STORE, 'readwrite');
  const store = tx.objectStore(STORE);
  const blob = file;
  const rec = {
    name,
    kind, // 'voice' | 'background'
    createdAt: Date.now(),
    type: file.type || 'audio/*',
    size: file.size,
    blob,
  };
  const id = await new Promise((resolve, reject) => {
    const r = store.add(rec);
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
  await tx.complete; // no-op in some browsers but safe
  db.close();
  return id;
}

export async function listTracks() {
  const db = await openDB();
  const tx = db.transaction(STORE, 'readonly');
  const store = tx.objectStore(STORE);
  const res = [];
  await new Promise((resolve, reject) => {
    const req = store.openCursor();
    req.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        const { id, name, kind, createdAt, type, size } = cursor.value;
        res.push({ id, name, kind, createdAt, type, size });
        cursor.continue();
      } else {
        resolve();
      }
    };
    req.onerror = () => reject(req.error);
  });
  db.close();
  return res.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getTrackURL(id) {
  const db = await openDB();
  const tx = db.transaction(STORE, 'readonly');
  const store = tx.objectStore(STORE);
  const rec = await new Promise((resolve, reject) => {
    const r = store.get(id);
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
  db.close();
  if (!rec) return null;
  return URL.createObjectURL(rec.blob);
}

export async function removeTrack(id) {
  const db = await openDB();
  const tx = db.transaction(STORE, 'readwrite');
  const store = tx.objectStore(STORE);
  await new Promise((resolve, reject) => {
    const r = store.delete(id);
    r.onsuccess = () => resolve();
    r.onerror = () => reject(r.error);
  });
  db.close();
}
