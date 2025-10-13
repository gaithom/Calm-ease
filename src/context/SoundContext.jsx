// Global audio state for CalmEase
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  const voiceRef = useRef(new Audio());
  const bgRef = useRef(new Audio());

  const [voiceSrc, setVoiceSrc] = useState(null);
  const [bgSrc, setBgSrc] = useState(null);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [isBgPlaying, setIsBgPlaying] = useState(false);
  const [voiceVolume, setVoiceVolume] = useState(0.9);
  const [bgVolume, setBgVolume] = useState(0.5);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('calmease:favorites') || '[]'); } catch { return []; }
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('calmease:theme') || 'light');

  // Available background sounds - natural and realistic options
  const backgroundSounds = useMemo(() => ([
    { id: 'ocean-waves', name: 'Ocean Waves', src: '/sounds/ocean-waves.wav', category: 'water' },
    { id: 'gentle-rain', name: 'Gentle Rain', src: '/sounds/gentle-rain.wav', category: 'rain' },
    { id: 'forest-ambience', name: 'Forest Ambience', src: '/sounds/forest-ambience.wav', category: 'nature' },
    { id: 'mountain-stream', name: 'Mountain Stream', src: '/sounds/mountain-stream.wav', category: 'water' },
    { id: 'summer-meadow', name: 'Summer Meadow', src: '/sounds/summer-meadow.wav', category: 'nature' },
    { id: 'thunderstorm', name: 'Distant Thunderstorm', src: '/sounds/thunderstorm.wav', category: 'rain' },
    { id: 'beach-waves', name: 'Beach Waves', src: '/sounds/beach-waves.wav', category: 'water' },
    { id: 'autumn-forest', name: 'Autumn Forest', src: '/sounds/autumn-forest.wav', category: 'nature' },
    { id: 'night-crickets', name: 'Night Crickets', src: '/sounds/night-crickets.wav', category: 'night' },
    { id: 'mountain-wind', name: 'Mountain Wind', src: '/sounds/mountain-wind.wav', category: 'wind' },
    { id: 'tropical-jungle', name: 'Tropical Jungle', src: '/sounds/tropical-jungle.wav', category: 'nature' },
    { id: 'winter-wind', name: 'Winter Wind', src: '/sounds/winter-wind.wav', category: 'wind' },
  ]), []);

  // Apply volumes and loop behavior
  useEffect(() => {
    const v = voiceRef.current;
    const b = bgRef.current;
    v.volume = voiceVolume;
    b.volume = bgVolume;
    b.loop = true;
  }, [voiceVolume, bgVolume]);

  // Theme handling
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    localStorage.setItem('calmease:theme', theme);
  }, [theme]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('calmease:favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Core controls
  const playVoice = async (src) => {
    const v = voiceRef.current;
    if (src && src !== voiceSrc) {
      setVoiceSrc(src);
      v.src = src;
    }
    try {
      await v.play();
      setIsVoicePlaying(true);
    } catch (e) {
      console.warn('Unable to play voice track', e);
      setIsVoicePlaying(false);
    }
  };

  const pauseVoice = () => {
    voiceRef.current.pause();
    setIsVoicePlaying(false);
  };

  const stopVoice = () => {
    const v = voiceRef.current;
    v.pause();
    v.currentTime = 0;
    setIsVoicePlaying(false);
  };

  const playBg = async (src) => {
    const b = bgRef.current;
    if (src && src !== bgSrc) {
      setBgSrc(src);
      b.src = src;
    }
    try {
      await b.play();
      setIsBgPlaying(true);
    } catch (e) {
      console.warn('Unable to play background sound', e);
      setIsBgPlaying(false);
    }
  };

  const pauseBg = () => {
    bgRef.current.pause();
    setIsBgPlaying(false);
  };

  const stopBg = () => {
    const b = bgRef.current;
    b.pause();
    b.currentTime = 0;
    setIsBgPlaying(false);
  };

  const stopAll = () => {
    stopVoice();
    stopBg();
  };

  const calmNow = async () => {
    // Pre-set calming combo: voice + soft piano
    const voice = '/sounds/voice-guided.wav';
    const piano = '/sounds/soft-piano.wav';
    setVoiceVolume(0.9);
    setBgVolume(0.4);
    await playVoice(voice);
    await playBg(piano);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const value = {
    // refs
    voiceRef,
    bgRef,
    // sources
    voiceSrc, setVoiceSrc,
    bgSrc, setBgSrc,
    // playback state
    isVoicePlaying, isBgPlaying,
    voiceVolume, setVoiceVolume,
    bgVolume, setBgVolume,
    // controls
    playVoice, pauseVoice, stopVoice,
    playBg, pauseBg, stopBg,
    stopAll, calmNow,
    // sounds and favorites
    backgroundSounds, favorites, toggleFavorite,
    // theme
    theme, setTheme,
  };

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
}
