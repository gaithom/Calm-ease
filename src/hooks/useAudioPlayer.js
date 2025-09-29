// Hook to derive reactive state from an existing HTMLAudioElement ref
import { useEffect, useState, useCallback } from 'react';

export default function useAudioPlayer(audioRef) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onError = () => setError('Audio failed to load. Please add media files to public/sounds.');

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('error', onError);
    };
  }, [audioRef]);

  const play = useCallback(async () => {
    try {
      await audioRef.current?.play();
    } catch (e) {
      setError('Playback was prevented by the browser. Interact with the page first.');
    }
  }, [audioRef]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, [audioRef]);

  const seek = useCallback((time) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  }, [audioRef]);

  const setVolume = useCallback((vol) => {
    if (audioRef.current) audioRef.current.volume = vol;
  }, [audioRef]);

  return { isPlaying, duration, currentTime, error, play, pause, seek, setVolume };
}
