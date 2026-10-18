import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        <a className="brand" href="#hero-story" onClick={closeMenu}>
          <span className="brand-mark">D</span>
          <span className="brand-text">DIMENSION</span>
          <span className="brand-dot">.</span>
        </a>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main Navigation">
          <a href="#hero-story" onClick={closeMenu}>
            Explore
          </a>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#characters" onClick={closeMenu}>
            Characters
          </a>
          <a href="#motion" onClick={closeMenu}>
            Motion Lab
          </a>
          <a href="#collection" onClick={closeMenu}>
            Collection
          </a>
          <a href="#process" onClick={closeMenu}>
            Process
          </a>
        </nav>

        <div className="nav-actions">
          <a className="nav-cta button button-dark" href="#characters" onClick={closeMenu}>
            Explore Models <ArrowUpRight size={14} />
          </a>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
};
