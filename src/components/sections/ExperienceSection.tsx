import React from 'react';
import { motion } from 'framer-motion';
import { Compass, CheckCircle2 } from 'lucide-react';
import { PROCESS_STAGES } from '../../data/content';
import { Badge } from '../ui/Badge';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="process" className="relative py-28 bg-[#f6f5f1] border-t border-[#e2ded6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e2ded6]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="orange" size="sm">
                SECTION 04
              </Badge>
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#636874]">
                METHODOLOGY & FABRICATION
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-[#111215] tracking-tight">
              SPATIAL PROCESS.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm font-sans text-[#383b42] font-light leading-relaxed">
              A four-stage workflow bridging physical industrial design curiosity with real-time WebGL engineering.
            </p>
          </div>
        </div>

        {/* 4-Stage Process Sequence Diagram: OBSERVE → SHAPE → INTERACT → REFINE */}
        <div className="mt-14 relative">
          {/* Connecting Line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-[#d5d0c5] -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {PROCESS_STAGES.map((stage, idx) => (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="bg-[#faf9f6] border border-[#e2ded6] p-7 rounded-xs flex flex-col justify-between hover:border-[#ff4800] transition-all group shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#e2ded6] mb-5">
                    <span className="text-xs font-mono-tech text-[#ff4800] font-bold tracking-wider">
                      STAGE {stage.step}
                    </span>
                    <span className="w-5 h-5 rounded-full bg-white border border-[#d5d0c5] flex items-center justify-center text-[10px] font-mono-tech text-[#111215] group-hover:bg-[#ff4800] group-hover:text-white group-hover:border-[#ff4800] transition-colors">
                      {idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    <h3 className="font-display font-bold text-2xl text-[#111215] group-hover:text-[#ff4800] transition-colors">
                      {stage.title}
                    </h3>
                    <p className="text-xs font-mono-tech text-[#636874] uppercase tracking-wider">
                      {stage.label}
                    </p>
                  </div>

                  <p className="text-xs text-[#525660] leading-relaxed font-sans font-normal">
                    {stage.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#e2ded6] flex items-center justify-between text-[10px] font-mono-tech text-[#8c9099]">
                  <span>{stage.code}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3b4d3e]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Spatial Engineering Benchmark Banner */}
        <div className="mt-14 p-6 bg-white border border-[#e2ded6] rounded-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-[#ff4800]/10 flex items-center justify-center text-[#ff4800]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono-tech text-[#111215] font-semibold">
                LAB DISCIPLINE: ZERO-LOCK ROTATION
              </div>
              <div className="text-[11px] text-[#636874] font-sans">
                Drag gestures are partitioned into local camera coordinates, preventing document scroll capture.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="olive" size="sm">
              Week 03 Benchmark
            </Badge>
            <span className="text-[10px] font-mono-tech text-[#3b4d3e]">VERIFIED 60 FPS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
