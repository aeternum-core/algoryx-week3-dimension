import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ManifestoSection } from './components/sections/ManifestoSection';
import { ObjectStudySection } from './components/sections/ObjectStudySection';
import { AnatomySection } from './components/sections/AnatomySection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ClosingCtaSection } from './components/sections/ClosingCtaSection';
import { Footer } from './components/layout/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-[#f6f5f1] text-[#111215] flex flex-col selection:bg-[#ff4800]/20 selection:text-[#ff4800]">
      {/* Editorial Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <HeroSection />
        <ManifestoSection />
        <ObjectStudySection />
        <AnatomySection />
        <ExperienceSection />
        <ClosingCtaSection />
      </main>

      {/* Project Footer */}
      <Footer />
    </div>
  );
}

export default App;
