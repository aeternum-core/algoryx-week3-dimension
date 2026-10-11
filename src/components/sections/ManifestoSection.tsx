import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair, ArrowDownRight } from 'lucide-react';
import { MANIFESTO_CONTENT } from '../../data/content';
import { Badge } from '../ui/Badge';

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto" className="relative py-28 bg-[#f6f5f1] border-t border-[#e2ded6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header with technical index */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e2ded6]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="orange" size="sm">
                SECTION {MANIFESTO_CONTENT.sectionIndex}
              </Badge>
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#636874]">
                {MANIFESTO_CONTENT.sectionLabel}
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-[#111215] tracking-tight">
              {MANIFESTO_CONTENT.headline}
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base font-sans text-[#383b42] font-normal leading-relaxed">
              {MANIFESTO_CONTENT.supportingCopy}
            </p>
          </div>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Architectural Editorial Text Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-[#faf9f6] border border-[#e2ded6] p-8 sm:p-12 rounded-sm relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 text-[#ff4800] font-mono-tech text-xs">+</div>
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[#636874] uppercase tracking-wider">
                <Crosshair className="w-3.5 h-3.5 text-[#ff4800]" />
                <span>SPATIAL RIGOR // FABRICATION DISCIPLINE</span>
              </div>

              <blockquote className="font-display text-2xl sm:text-3xl text-[#111215] font-bold leading-snug">
                “In the digital realm, mathematics possesses the exact density,
                tactile resistance, and gravitational consequence of carved stone.”
              </blockquote>

              <p className="text-sm sm:text-base text-[#4b4f57] font-sans leading-relaxed">
                {MANIFESTO_CONTENT.extendedCopy}
              </p>

              <div className="pt-6 border-t border-[#e2ded6] flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech text-[#636874]">
                <span>METHOD: PARAMETRIC SPLINE TOPOLOGY</span>
                <span className="text-[#3b4d3e] font-semibold">STATUS: VERIFIED</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Technical Stats Matrix & Axiom Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Measured Stats */}
            <div className="grid grid-cols-3 gap-3">
              {MANIFESTO_CONTENT.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white border border-[#e2ded6] rounded-xs text-center flex flex-col justify-between"
                >
                  <div className="text-lg sm:text-xl font-display font-black text-[#111215]">
                    {stat.metric}
                  </div>
                  <div className="text-[9px] font-mono-tech uppercase text-[#8c9099] tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Axiom Note Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="p-6 bg-[#faf9f6] border border-[#e2ded6] rounded-xs space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono-tech text-[#111215] font-semibold">
                <span className="flex items-center gap-1.5">
                  <ArrowDownRight className="w-3.5 h-3.5 text-[#ff4800]" />
                  AXIOM 01: MASS & MOMENTUM
                </span>
                <span className="text-[10px] text-[#ff4800]">01 // 03</span>
              </div>
              <p className="text-xs text-[#525660] leading-relaxed font-sans">
                A digital object without inertia feels cheap. Momentum must be calibrated
                to human drag velocity, dissipating with calculated friction rather than stopping abruptly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="p-6 bg-[#faf9f6] border border-[#e2ded6] rounded-xs space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono-tech text-[#111215] font-semibold">
                <span className="flex items-center gap-1.5">
                  <ArrowDownRight className="w-3.5 h-3.5 text-[#ff4800]" />
                  AXIOM 02: SPECULAR CLARITY
                </span>
                <span className="text-[10px] text-[#ff4800]">02 // 03</span>
              </div>
              <p className="text-xs text-[#525660] leading-relaxed font-sans">
                Grazing angle reflections reveal silhouette curvature. By tuning clearcoat
                roughness to microfacet models, ambient light defines edges without synthetic glow.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
