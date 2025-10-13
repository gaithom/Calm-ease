import React from 'react';

const GlassCard = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`backdrop-blur-sm bg-white/20 dark:bg-slate-800/30 border border-white/30 dark:border-white/10 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-white/30 dark:hover:bg-slate-800/40 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
