import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaWind, FaLeaf, FaBook, FaInfoCircle } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { name: 'Home', path: '/', icon: <FaHome className="mr-2 group-hover:animate-bounce" /> },
  { name: 'Relax', path: '/relax', icon: <FaWind className="mr-2 group-hover:animate-bounce" /> },
  { name: 'Grounding', path: '/grounding', icon: <FaLeaf className="mr-2 group-hover:animate-bounce" /> },
  { name: 'Library', path: '/library', icon: <FaBook className="mr-2 group-hover:animate-bounce" /> },
  { name: 'About', path: '/about', icon: <FaInfoCircle className="mr-2 group-hover:animate-bounce" /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    // Listen for route changes
    const unlisten = () => {
      handleRouteChange();
    };

    // Close menu when route changes
    window.addEventListener('popstate', unlisten);
    return () => {
      window.removeEventListener('popstate', unlisten);
    };
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
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-800/95 backdrop-blur-sm shadow-sm' : 'bg-gray-800'}`}
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
                <span className="sr-only">Calm Space</span>
              </div>
              <span className="text-xl font-bold text-white">
                Calm Space
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
                  `group relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    isActive
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`
                }
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <span className="flex items-center">
                  {item.icon}
                  {item.name}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:ml-4 md:flex md:items-center space-x-4">
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-3 p-3 rounded-md text-white hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors duration-200"
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
        className={`md:hidden transition-all duration-300 ease-in-out bg-gray-800 ${
          isOpen 
            ? 'max-h-screen opacity-100 visible py-2' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}
        id="mobile-menu"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="mobile-menu-button"
        aria-expanded={isOpen}
      >
        <nav className="px-4 py-2 space-y-2" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-700 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white active:scale-95'
                }`
              }
              onClick={() => setIsOpen(false)}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
            >
              {React.cloneElement(item.icon, { 
                className: `mr-3 flex-shrink-0 ${
                  location.pathname === item.path 
                    ? 'text-white' 
                    : 'text-gray-400 group-hover:text-white'
                }` 
              })}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
