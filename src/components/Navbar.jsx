import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaWind, FaLeaf, FaBook, FaInfoCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import ThemeSelector from './ThemeSelector';

const navItems = [
  { name: 'Home', path: '/', icon: <FaHome className="mr-2" /> },
  { name: 'Relax', path: '/relax', icon: <FaWind className="mr-2" /> },
  { name: 'Grounding', path: '/grounding', icon: <FaLeaf className="mr-2" /> },
  { name: 'Library', path: '/library', icon: <FaBook className="mr-2" /> },
  { name: 'About', path: '/about', icon: <FaInfoCircle className="mr-2" /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // Set initial scroll state
    handleScroll();

    // Add passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  // Add/remove event listeners for keyboard navigation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Close menu when clicking outside
  const navRef = React.useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header 
      ref={navRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-emerald-600/95 dark:bg-emerald-900/95 backdrop-blur-sm shadow-sm' 
          : 'bg-emerald-600 dark:bg-emerald-900'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <NavLink 
              to="/" 
              className="flex items-center space-x-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
              aria-label="Home"
            >
              <div className="relative">
                <img 
                  src="/logo512.png" 
                  alt="" 
                  className="h-8 w-8 transition-transform duration-300 group-hover:rotate-12 group-focus:ring-2 group-focus:ring-primary-500 rounded-full" 
                  aria-hidden="true"
                />
                <span className="sr-only">Calm-ease</span>
              </div>
              <span className="text-xl font-bold text-white">
                Calm-space
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:ml-10 md:flex md:items-center md:space-x-6"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                    isActive
                      ? 'text-white'
                      : 'text-white/90 hover:text-white'
                  }`
                }
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center">
                      {item.icon}
                      {item.name}
                    </span>
                    <span 
                      className={`absolute -bottom-1 left-1/2 w-4/5 h-0.5 bg-white/70 rounded-full transform -translate-x-1/2 transition-all duration-300 ${
                        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                      }`}
                      aria-hidden="true"
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:ml-4 md:flex md:items-center space-x-4">
            <ThemeSelector />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <ThemeSelector />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-3 p-2 rounded-md text-surface-700 hover:text-surface-900 dark:text-surface-300 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <>
                  <FaTimes className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Close menu</span>
                </>
              ) : (
                <>
                  <FaBars className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Open menu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-screen opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}
        id="mobile-menu"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="mobile-menu-button"
      >
        <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800/50'
                }`
              }
              onClick={() => setIsOpen(false)}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
            >
              {React.cloneElement(item.icon, { 
                className: `mr-3 flex-shrink-0 ${
                  location.pathname === item.path 
                    ? 'text-primary-500 dark:text-primary-400' 
                    : 'text-surface-400 group-hover:text-surface-700 dark:text-surface-500 dark:group-hover:text-surface-300'
                }` 
              })}
              <span>{item.name}</span>
              {location.pathname === item.path && (
                <span className="ml-auto inline-block h-2 w-2 rounded-full bg-primary-500 dark:bg-primary-400" aria-hidden="true" />
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
