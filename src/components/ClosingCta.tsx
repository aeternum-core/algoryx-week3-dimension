import React from 'react';
import { ArrowUpRight, Play } from 'lucide-react';

export const ClosingCta: React.FC = () => {
  return (
    <section className="closing-section section-wrap" aria-label="Closing Call to Action">
      <div className="closing-card">
        <div className="closing-inner">
          <span className="eyebrow">[ END / BEGIN AGAIN ]</span>
          <h2 className="closing-headline">
            YOUR NEXT PERSPECTIVE <br />
            <em>STARTS HERE.</em>
          </h2>
          <p className="closing-subtitle">
            Orbit the characters, analyze the neural grid wave dynamics, and experience
            real-time Three.js rendering crafted for performance and tactile precision.
          </p>
          <div className="closing-actions">
            <a href="#characters" className="button button-orange">
              Enter Character Lab <ArrowUpRight size={16} />
            </a>
            <a href="#motion" className="button button-outline">
              <Play size={14} className="fill-current" /> Launch Motion Lab
            </a>
          </div>
        </div>
        <div className="closing-stamp" aria-hidden="true">
          <span>DIMENSION</span>
          <b>3D</b>
          <span className="stamp-sub">ALGORYX</span>
        </div>
      </div>
    </section>
  );
};
