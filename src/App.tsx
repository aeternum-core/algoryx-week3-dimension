import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar.tsx';
import { ScrollHero } from './components/ScrollHero.tsx';
import { EditorialIntro } from './components/EditorialIntro.tsx';
import { CharacterLab } from './components/CharacterLab.tsx';
import { MotionLab } from './components/MotionLab.tsx';
import { AssetGallery } from './components/AssetGallery.tsx';
import { ProcessSection } from './components/ProcessSection.tsx';
import { ClosingCta } from './components/ClosingCta.tsx';
import { Footer } from './components/Footer.tsx';
import { CHARACTER_MODELS } from './data/models.ts';
import type { ModelMetadata } from './types/index.ts';

export function App() {
  const [selectedCharacter, setSelectedCharacter] = useState<ModelMetadata>(CHARACTER_MODELS[0]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectCharacter = (model: ModelMetadata) => {
    setSelectedCharacter(model);
  };

  return (
    <div className="site-shell">
      <Navbar />

      <main id="main-content">
        {/* Signature Scroll-Driven 3D Storytelling Experience */}
        <ScrollHero />

        {/* Editorial Kinetic Ticker */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            <span>BEYOND THE FRAME</span>
            <span className="ticker-symbol">✳</span>
            <span>ORGANIC TOPOLOGY</span>
            <span className="ticker-symbol">✳</span>
            <span>KINEMATIC BEHAVIOR</span>
            <span className="ticker-symbol">✳</span>
            <span>INFINITE PERSPECTIVES</span>
            <span className="ticker-symbol">✳</span>
            <span>PBR SHADING</span>
            <span className="ticker-symbol">✳</span>
            <span>NEURAL MATRIX</span>
            <span className="ticker-symbol">✳</span>
            <span>BEYOND THE FRAME</span>
            <span className="ticker-symbol">✳</span>
            <span>ORGANIC TOPOLOGY</span>
            <span className="ticker-symbol">✳</span>
            <span>KINEMATIC BEHAVIOR</span>
            <span className="ticker-symbol">✳</span>
            <span>INFINITE PERSPECTIVES</span>
            <span className="ticker-symbol">✳</span>
            <span>PBR SHADING</span>
            <span className="ticker-symbol">✳</span>
            <span>NEURAL MATRIX</span>
            <span className="ticker-symbol">✳</span>
          </div>
        </div>

        {/* Editorial Narrative Introduction */}
        <EditorialIntro />

        {/* Character Lab (Mew, Robot, Iron Man) */}
        <CharacterLab
          selectedModel={selectedCharacter}
          onSelectModel={handleSelectCharacter}
        />

        {/* Motion Lab (Neural Grid, Robot) */}
        <MotionLab />

        {/* Four-Asset Collection Gallery */}
        <AssetGallery onSelectCharacter={handleSelectCharacter} />

        {/* Process & Interaction Methodology */}
        <ProcessSection />

        {/* Closing CTA */}
        <ClosingCta />
      </main>

      <Footer />

      {/* Lightweight initial boot animation */}
      <AnimatePresence>
        {!isReady && (
          <motion.div
            className="boot-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="boot-content">
              <span className="boot-mark">D</span>
              <p className="boot-text">INITIALIZING DIMENSION…</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
