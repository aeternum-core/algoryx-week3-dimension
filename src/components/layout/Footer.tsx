import React from 'react';
import { ArrowUp, Box, Layers, Cpu, MoveRight, Crosshair } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../data/content';
import { Badge } from '../ui/Badge';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#e2ded6] bg-[#eeece5] text-[#4b4f57] overflow-hidden pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-[#d5d0c5]">
          {/* Identity & Concept */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-[#111215] rounded-xs flex items-center justify-center text-white">
                <span className="w-2 h-2 rotate-45 border-2 border-[#ff4800]" />
              </div>
              <span className="font-display font-extrabold tracking-[0.2em] text-lg text-[#111215]">
                OBSIDIAN
              </span>
              <span className="text-[10px] font-mono-tech text-[#ff4800] font-bold">
                LAB
              </span>
            </div>

            <p className="text-sm font-sans text-[#525660] max-w-sm leading-relaxed">
              FORM IN ANOTHER DIMENSION — an experimental spatial design laboratory exploring
              parametric geometry, mineral materials, and calibrated kinematics.
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-1">
              <Badge variant="orange" size="sm">Algoryx Internship · Week 03</Badge>
              <Badge variant="outline" size="sm">Three.js / R3F</Badge>
              <Badge variant="olive" size="sm">Spatial Lab Edition</Badge>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#111215] font-bold mb-1">
              Index
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-mono-tech">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-2 text-[#525660] hover:text-[#ff4800] transition-colors group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ff4800]"
                  >
                    <span className="text-[#ff4800] text-[10px]">{item.code}</span>
                    <span>{item.label}</span>
                    <MoveRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#ff4800]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Baseline & Asset Slot */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#111215] font-bold mb-1">
              Architecture Baseline
            </h4>
            <div className="p-4 rounded-xs bg-white border border-[#d5d0c5] text-xs font-mono-tech flex flex-col gap-2.5 shadow-2xs">
              <div className="flex items-center justify-between text-[#525660]">
                <span className="flex items-center gap-2">
                  <Box className="w-3.5 h-3.5 text-[#111215]" />
                  Procedural Core
                </span>
                <span className="text-[#111215] font-semibold">Mobius-Torus M3</span>
              </div>
              <div className="flex items-center justify-between text-[#525660]">
                <span className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#ff4800]" />
                  Asset Slot
                </span>
                <span className="text-[#ff4800] font-semibold">GLB Drop-in Ready</span>
              </div>
              <div className="flex items-center justify-between text-[#525660]">
                <span className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#3b4d3e]" />
                  Stack
                </span>
                <span className="text-[#111215] font-semibold">React 19 + R3F + Tailwind</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-[#8c9099]">
          <div className="flex items-center gap-2">
            <Crosshair className="w-3.5 h-3.5 text-[#ff4800]" />
            <span>Algoryx UI/UX Design Internship — Week 3</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Obsidian Spatial Lab © 2026</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#525660] hover:text-[#ff4800] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ff4800] rounded-xs px-2 py-1"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#ff4800]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
