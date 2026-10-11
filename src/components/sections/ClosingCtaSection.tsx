import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Orbit, Crosshair } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const ClosingCtaSection: React.FC = () => {
  const scrollToExplorer = () => {
    const el = document.getElementById('explorer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative py-32 bg-[#faf9f6] border-t border-[#e2ded6] overflow-hidden text-center">
      {/* Subtle architectural background crosshairs */}
      <div className="absolute top-8 left-8 text-[#d5d0c5] font-mono-tech text-xs">+</div>
      <div className="absolute top-8 right-8 text-[#d5d0c5] font-mono-tech text-xs">+</div>
      <div className="absolute bottom-8 left-8 text-[#d5d0c5] font-mono-tech text-xs">+</div>
      <div className="absolute bottom-8 right-8 text-[#d5d0c5] font-mono-tech text-xs">+</div>

      <div className="relative max-w-4xl mx-auto px-6 z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <div className="flex justify-center">
            <Badge variant="orange" size="sm" dot>
              SPATIAL CONCLUSION
            </Badge>
          </div>

          <h2 className="font-display font-black text-5xl sm:text-7xl text-[#111215] tracking-tight leading-tight">
            THERE IS MORE <br />
            <span className="text-[#ff4800]">TO EXPLORE.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4b4f57] font-sans font-normal max-w-xl mx-auto pt-2 leading-relaxed">
            Every curve, surface, and proportion changes with perspective. Return to the primary 3D workspace
            to manipulate materials, trigger exploded topology, or inspect kinematic inertia.
          </p>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <Button
            variant="orange"
            size="lg"
            onClick={scrollToExplorer}
            icon={<Orbit className="w-4 h-4" />}
          >
            RETURN TO OBJECT EXPLORER
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={scrollToHero}
            icon={<ArrowUp className="w-4 h-4" />}
          >
            BACK TO TOP
          </Button>
        </motion.div>

        {/* Spatial Lab Engineering Spec */}
        <div className="pt-8 flex items-center justify-center gap-2 text-xs font-mono-tech text-[#8c9099]">
          <Crosshair className="w-3.5 h-3.5 text-[#ff4800]" />
          <span>Algoryx UI/UX Internship — Week 3 Interactive Spatial Prototype</span>
        </div>
      </div>
    </section>
  );
};
