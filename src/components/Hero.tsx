import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { CanvasContainer } from './3d/CanvasContainer.tsx';
import { MewHeroScene } from './3d/MewHeroScene.tsx';

export const Hero: React.FC = () => {
  return (
    <section className="hero section-wrap" id="top" aria-label="Hero Section">
      <div className="hero-copy">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          <span className="live-dot" />
          <span>INTERACTIVE 3D PLAYGROUND</span>
          <span className="eyebrow-line" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero-headline"
        >
          ENTER ANOTHER <span className="accent-text">DIMENSION.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-description"
        >
          Four models. Infinite perspectives. One interactive playground.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hero-actions"
        >
          <a className="button button-orange hero-cta" href="#characters">
            Explore Models <ArrowRight size={16} />
          </a>
          <a className="button button-outline" href="#motion">
            <Play size={14} className="fill-current" /> Motion Lab
          </a>
        </motion.div>

        <div className="hero-metrics">
          <div className="metric-item">
            <span className="metric-label">OFFICIAL ASSETS</span>
            <span className="metric-value">04 GLB Models</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">DYNAMIC STUDY</span>
            <span className="metric-value">Real-Time WebGL</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">COMMUNITY</span>
            <span className="metric-value">Algoryx Curated</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hero-stage"
      >
        <div className="stage-frame">
          <div className="stage-grid-bg" />
          <div className="stage-ring ring-outer" />
          <div className="stage-ring ring-inner" />

          <div className="stage-badge badge-top-left">
            <span className="badge-bullet">№ 001</span>
            <span className="badge-text">HERO OBJECT STUDY</span>
          </div>

          <div className="stage-badge badge-top-right">
            <Sparkles size={12} className="badge-icon" />
            <span className="badge-text">520K POLYGONS</span>
          </div>

          <div className="hero-canvas-wrapper">
            <CanvasContainer
              className="hero-canvas"
              camera={{ position: [0, 0, 3.4], fov: 34 }}
            >
              <MewHeroScene />
            </CanvasContainer>
          </div>

          <div className="stage-badge badge-bottom-left">
            <span className="tiny-square" />
            <span className="badge-title">MEW / FORM IN SPACE</span>
          </div>

          <div className="stage-instruction">
            <span>DRAG TO ORBIT</span>
            <span className="instruction-arrow">↗</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
