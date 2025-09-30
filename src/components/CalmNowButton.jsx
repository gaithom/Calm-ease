import React from 'react';
import { Link } from 'react-router-dom';

export default function CalmNowButton({ size = 'base', className = '' }) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    base: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg'
  };

  return (
    <Link
      to="/calm-now"
      className={`inline-flex items-center justify-center rounded-full font-medium ${sizeClasses[size] || sizeClasses.base} 
        bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 
        text-white shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
        transition-all duration-200 transform active:scale-95 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
          clipRule="evenodd"
        />
      </svg>
      Calm Now
    </Link>
  );
}
