import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Disc, Activity, Crosshair } from 'lucide-react';
import { DIMENSIONS_DATA } from '../../data/content';
import { Badge } from '../ui/Badge';

export const AnatomySection: React.FC = () => {
  return (
    <section id="dimensions" className="relative py-28 bg-[#f6f5f1] border-t border-[#e2ded6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e2ded6]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="orange" size="sm">
                SECTION 03
              </Badge>
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#636874]">
                SPATIAL INVESTIGATION
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-[#111215] tracking-tight">
              THREE DIMENSIONS.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm font-sans text-[#383b42] font-light leading-relaxed">
              Deconstructing the spatial artifact into three core principles: topological silhouette,
              mineral materiality, and inertial kinematics.
            </p>
          </div>
        </div>

        {/* 3 Distinct Connected Compositions */}
        <div className="mt-14 space-y-12">
          {/* 01 / FORM — Wide Blueprint & Topological Tension */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="p-8 sm:p-10 bg-[#faf9f6] border border-[#e2ded6] rounded-xs relative overflow-hidden group hover:border-[#ff4800] transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono-tech text-xs tracking-[0.2em] text-[#ff4800] font-bold">
                    DIMENSION // {DIMENSIONS_DATA[0].index}
                  </span>
                  <span className="text-xs font-mono-tech text-[#8c9099]">// {DIMENSIONS_DATA[0].tag}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#111215] flex items-center gap-3">
                    <Layers className="w-6 h-6 text-[#ff4800]" />
                    {DIMENSIONS_DATA[0].title}
                  </h3>
                  <p className="text-xs font-mono-tech text-[#636874]">
                    {DIMENSIONS_DATA[0].subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#4b4f57] font-sans leading-relaxed max-w-xl">
                  {DIMENSIONS_DATA[0].description}
                </p>

                {/* Parameters Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#e2ded6]">
                  {DIMENSIONS_DATA[0].parameters.map((p, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xs border border-[#e2ded6] font-mono-tech">
                      <span className="text-[9px] uppercase text-[#8c9099] block mb-0.5">{p.key}</span>
                      <span className="text-xs text-[#111215] font-semibold">{p.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Visualizer: Precision Geometric Schematic */}
              <div className="lg:col-span-5">
                <div className="h-60 sm:h-64 bg-white border border-[#e2ded6] p-5 flex flex-col justify-between relative overflow-hidden rounded-xs">
                  <div className="flex items-center justify-between text-xs font-mono-tech text-[#636874]">
                    <span>TOPOLOGY // M-01</span>
                    <span className="text-[#ff4800]">G2 CONTINUOUS</span>
                  </div>

                  <div className="relative flex items-center justify-center py-4">
                    <div className="w-28 h-28 rounded-full border border-[#111215] flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border border-dashed border-[#ff4800] animate-spin" style={{ animationDuration: '24s' }} />
                      <div className="w-10 h-10 bg-[#111215] rotate-45 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff4800]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#8c9099]">
                    <span>128 × 36 SUBDIVISIONS</span>
                    <span>TANGENT NORMAL: 1.0</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 02 / MATERIAL — Asymmetric Swatch & Reflection Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="p-8 sm:p-10 bg-[#faf9f6] border border-[#e2ded6] rounded-xs relative overflow-hidden group hover:border-[#ff4800] transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center lg:flex-row-reverse">
              {/* Material Substrate Visualizer */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="h-60 sm:h-64 bg-white border border-[#e2ded6] p-5 flex flex-col justify-between relative overflow-hidden rounded-xs">
                  <div className="flex items-center justify-between text-xs font-mono-tech text-[#636874]">
                    <span>SUBSTRATE ANALYSIS</span>
                    <span className="text-[#3b4d3e]">IOR: 2.42</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-2">
                    <div className="p-3 bg-[#1c1d22] text-white rounded-xs text-center font-mono-tech text-[10px]">
                      <div className="w-4 h-4 rounded-full bg-white/20 mx-auto mb-2" />
                      <span>GRAPHITE</span>
                    </div>
                    <div className="p-3 bg-[#f0ede6] text-[#111215] border border-[#e2ded6] rounded-xs text-center font-mono-tech text-[10px]">
                      <div className="w-4 h-4 rounded-full bg-[#ff4800]/30 mx-auto mb-2" />
                      <span>CERAMIC</span>
                    </div>
                    <div className="p-3 bg-[#ff4800] text-white rounded-xs text-center font-mono-tech text-[10px]">
                      <div className="w-4 h-4 rounded-full bg-white mx-auto mb-2" />
                      <span>VERMILION</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#8c9099]">
                    <span>COOK-TORRANCE PBR</span>
                    <span>GRAZING SPECULAR: 94.2%</span>
                  </div>
                </div>
              </div>

              {/* Text & Parameters */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono-tech text-xs tracking-[0.2em] text-[#ff4800] font-bold">
                    DIMENSION // {DIMENSIONS_DATA[1].index}
                  </span>
                  <span className="text-xs font-mono-tech text-[#8c9099]">// {DIMENSIONS_DATA[1].tag}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#111215] flex items-center gap-3">
                    <Disc className="w-6 h-6 text-[#ff4800]" />
                    {DIMENSIONS_DATA[1].title}
                  </h3>
                  <p className="text-xs font-mono-tech text-[#636874]">
                    {DIMENSIONS_DATA[1].subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#4b4f57] font-sans leading-relaxed max-w-xl">
                  {DIMENSIONS_DATA[1].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#e2ded6]">
                  {DIMENSIONS_DATA[1].parameters.map((p, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xs border border-[#e2ded6] font-mono-tech">
                      <span className="text-[9px] uppercase text-[#8c9099] block mb-0.5">{p.key}</span>
                      <span className="text-xs text-[#111215] font-semibold">{p.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 03 / MOTION — Kinematic Inertia & Spatial Momentum */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="p-8 sm:p-10 bg-[#faf9f6] border border-[#e2ded6] rounded-xs relative overflow-hidden group hover:border-[#ff4800] transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono-tech text-xs tracking-[0.2em] text-[#ff4800] font-bold">
                    DIMENSION // {DIMENSIONS_DATA[2].index}
                  </span>
                  <span className="text-xs font-mono-tech text-[#8c9099]">// {DIMENSIONS_DATA[2].tag}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#111215] flex items-center gap-3">
                    <Activity className="w-6 h-6 text-[#ff4800]" />
                    {DIMENSIONS_DATA[2].title}
                  </h3>
                  <p className="text-xs font-mono-tech text-[#636874]">
                    {DIMENSIONS_DATA[2].subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#4b4f57] font-sans leading-relaxed max-w-xl">
                  {DIMENSIONS_DATA[2].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#e2ded6]">
                  {DIMENSIONS_DATA[2].parameters.map((p, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xs border border-[#e2ded6] font-mono-tech">
                      <span className="text-[9px] uppercase text-[#8c9099] block mb-0.5">{p.key}</span>
                      <span className="text-xs text-[#111215] font-semibold">{p.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kinematic Momentum Curve Visualizer */}
              <div className="lg:col-span-5">
                <div className="h-60 sm:h-64 bg-white border border-[#e2ded6] p-5 flex flex-col justify-between relative overflow-hidden rounded-xs">
                  <div className="flex items-center justify-between text-xs font-mono-tech text-[#636874]">
                    <span>KINEMATIC DAMPING</span>
                    <span className="text-[#3b4d3e]">0.045 s⁻¹ LERP</span>
                  </div>

                  <div className="relative flex flex-col items-center justify-center py-2 space-y-2">
                    <div className="w-full flex items-center justify-between text-[10px] font-mono-tech text-[#8c9099]">
                      <span>DRAG INPUT</span>
                      <span>SMOOTH DECAY</span>
                    </div>
                    <div className="w-full h-2 bg-[#f0ede6] rounded-full overflow-hidden flex">
                      <div className="w-3/4 h-full bg-[#ff4800]" />
                      <div className="w-1/4 h-full bg-[#111215]" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-[#111215]">
                      <Crosshair className="w-3 h-3 text-[#ff4800]" />
                      <span>NO SCROLL LOCK // PAN-Y PASS-THROUGH</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#8c9099]">
                    <span>FRAME BUDGET: 60/120 FPS</span>
                    <span>LERP FACTOR: 0.05</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
