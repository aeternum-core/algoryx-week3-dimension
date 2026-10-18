import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="section-wrap footer-inner">
        <div className="footer-brand-col">
          <a className="brand" href="#top">
            <span className="brand-mark">D</span>
            <span className="brand-text">DIMENSION</span>
            <span className="brand-dot">.</span>
          </a>
          <p className="footer-tagline">
            An interactive 3D playground exploring character, form, and motion.
            <br />
            Built for Algoryx Technologies UI/UX Internship — Week 3.
          </p>
        </div>

        <div className="footer-links-col">
          <span className="footer-col-title">NAVIGATION</span>
          <nav className="footer-nav">
            <a href="#top">Hero Overview</a>
            <a href="#characters">Character Lab</a>
            <a href="#motion">Motion Lab</a>
            <a href="#collection">Asset Collection</a>
            <a href="#process">Process & Methodology</a>
          </nav>
        </div>

        <div className="footer-credit-col">
          <span className="footer-col-title">ASSET ATTRIBUTION</span>
          <p className="footer-attribution">
            All four 3D assets (<strong>Mew.glb</strong>, <strong>Robot.glb</strong>,{' '}
            <strong>Iron Man.glb</strong>, and{' '}
            <strong>Interactive Waving Neural Grid.glb</strong>) are official assets supplied from
            the <strong>Algoryx Community</strong>.
          </p>
          <span className="footer-copy">© 2026 DIMENSION — Algoryx UI/UX Internship</span>
        </div>

        <div className="footer-top-col">
          <a href="#top" className="back-to-top-btn" aria-label="Back to Top">
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
};
