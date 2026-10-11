import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Orbit, Play, Crosshair } from 'lucide-react';
import { SceneCanvas } from '../three/SceneCanvas';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { HERO_CONTENT } from '../../data/content';

export const HeroSection: React.FC = () => {
  const scrollToExplorer = () => {
    const el = document.getElementById('explorer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToManifesto = () => {
    const el = document.getElementById('manifesto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#f6f5f1] bg-lab-grid">
      {/* Subtle architectural border lines framing the hero */}
      <div className="absolute inset-x-6 md:inset-x-12 top-24 bottom-12 border-x border-[#e2ded6] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10">
        {/* Left Column: Architectural Editorial Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col justify-center space-y-6 pt-4 lg:pt-0"
        >
          {/* Eyebrow & Secondary Category */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="orange" size="sm" dot>
              {HERO_CONTENT.eyebrow}
            </Badge>
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#636874] border-l border-[#d5d0c5] pl-3">
              {HERO_CONTENT.secondaryLabel}
            </span>
          </div>

          {/* Main Title: DESIGN IN ANOTHER DIMENSION. */}
          <div className="space-y-1">
            <h1 className="font-display font-black text-5xl sm:text-6xl xl:text-7xl tracking-[-0.03em] leading-[0.92] text-[#111215]">
              {HERO_CONTENT.headlineLine1} <br />
              {HERO_CONTENT.headlineLine2} <br />
              <span className="text-[#ff4800]">{HERO_CONTENT.headlineLine3}</span>
            </h1>
          </div>

          {/* Concise supporting copy */}
          <p className="text-base sm:text-lg text-[#383b42] font-sans font-light leading-relaxed max-w-lg">
            {HERO_CONTENT.supportingCopy}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="orange"
              size="md"
              onClick={scrollToExplorer}
              icon={<Play className="w-3 h-3 fill-current" />}
            >
              {HERO_CONTENT.primaryCta}
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={scrollToManifesto}
              icon={<ArrowDown className="w-3 h-3 text-[#ff4800]" />}
            >
              Read Manifesto
            </Button>
          </div>

          {/* Technical Specs Metric Bar */}
          <div className="pt-6 border-t border-[#e2ded6] grid grid-cols-3 gap-4 max-w-md font-mono-tech text-xs">
            <div>
              <div className="text-[9px] uppercase text-[#8c9099] tracking-widest">Topology</div>
              <div className="text-[#111215] font-semibold mt-0.5">Mobius-Torus M3</div>
            </div>
            <div>
              <div className="text-[9px] uppercase text-[#8c9099] tracking-widest">Surface</div>
              <div className="text-[#111215] font-semibold mt-0.5">Milled Graphite</div>
            </div>
            <div>
              <div className="text-[9px] uppercase text-[#8c9099] tracking-widest">Asset Slot</div>
              <div className="text-[#ff4800] font-semibold mt-0.5">Drop-in GLB Ready</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Light Architectural 3D Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="lg:col-span-6 relative flex items-center justify-center min-h-[440px] sm:min-h-[520px] lg:min-h-[600px]"
        >
          {/* Subtle Technical Canvas Framing with Measurement Corners */}
          <div className="absolute inset-0 border border-[#e2ded6] bg-[#faf9f6] rounded-sm pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-lab-subgrid opacity-60" />
            
            {/* Corner Crosshairs */}
            <span className="absolute top-2 left-2 font-mono-tech text-[10px] text-[#ff4800]">+</span>
            <span className="absolute top-2 right-2 font-mono-tech text-[10px] text-[#ff4800]">+</span>
            <span className="absolute bottom-2 left-2 font-mono-tech text-[10px] text-[#ff4800]">+</span>
            <span className="absolute bottom-2 right-2 font-mono-tech text-[10px] text-[#ff4800]">+</span>

            {/* Subtle Circular Radial Guide */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[340px] h-[340px] rounded-full border border-[#d5d0c5]/50 border-dashed" />
              <div className="w-[240px] h-[240px] rounded-full border border-[#d5d0c5]/30" />
            </div>
          </div>

          {/* Technical Annotations Around the Object */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-2.5 py-1 rounded-xs bg-white/90 border border-[#e2ded6] text-[10px] font-mono-tech text-[#111215] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4800]" />
            <span className="font-semibold">OBJECT / 001</span>
          </div>

          <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-white/90 border border-[#e2ded6] text-[10px] font-mono-tech text-[#636874] shadow-2xs">
            <span className="text-[#3b4d3e]">ROTATION / ENABLED</span>
          </div>

          <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-white/90 border border-[#e2ded6] text-[10px] font-mono-tech text-[#636874] shadow-2xs">
            <span>MATERIAL / GRAPHITE</span>
          </div>

          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xs bg-[#111215] text-white border border-[#111215] text-[10px] font-mono-tech shadow-md">
            <Orbit className="w-3.5 h-3.5 text-[#ff4800] animate-pulse" />
            <span className="font-medium tracking-wider">VIEW / INTERACTIVE</span>
          </div>

          {/* 3D Scene Viewport */}
          <div className="relative w-full h-[440px] sm:h-[500px] lg:h-[560px] z-10">
            <SceneCanvas
              materialMode="graphite"
              lightMode="studio"
              motionMode="inertia"
              rotationSpeed={1.0}
              enableZoom={false}
              enableOrbit={true}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 z-10 text-[#8c9099] text-[10px] font-mono-tech uppercase tracking-[0.2em]">
        <Crosshair className="w-3 h-3 text-[#ff4800]" />
        <span>SCROLL TO PROCEED // MANIFESTO</span>
      </div>
    </section>
  );
};
