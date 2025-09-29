import React from 'react';
import { useSound } from '../context/SoundContext';

export default function CalmNowButton({ size = 'lg' }) {
  const { calmNow } = useSound();
  const sizeClasses = size === 'sm' ? 'px-3 py-2 text-sm rounded-lg' : 'px-5 py-3 text-base rounded-xl';
  return (
    <button
      className={`btn btn-primary ${sizeClasses}`}
      onClick={calmNow}
      aria-label="Calm Now: instantly play a calming track"
    >
      <span aria-hidden>🧘‍♀️</span>
      <span className="ml-2">Calm Now</span>
    </button>
  );
}
