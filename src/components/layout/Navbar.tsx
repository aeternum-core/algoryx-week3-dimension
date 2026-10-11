import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Crosshair } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../data/content';
import { Badge } from '../ui/Badge';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['manifesto', 'explorer', 'dimensions', 'process'];
      const scrollPos = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#f6f5f1]/95 backdrop-blur-md border-b border-[#e2ded6] py-3 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand Identity: Obsidian Spatial Lab */}
        <a
          href="#"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4800] rounded-xs p-1"
          aria-label="OBSIDIAN Spatial Lab Home"
        >
          <div className="w-7 h-7 bg-[#111215] rounded-xs flex items-center justify-center text-white border border-[#111215] group-hover:bg-[#ff4800] group-hover:border-[#ff4800] transition-colors">
            <span className="w-2.5 h-2.5 rotate-45 border-2 border-white" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold tracking-[0.2em] text-sm md:text-base text-[#111215]">
                OBSIDIAN
              </span>
              <span className="text-[10px] font-mono-tech text-[#ff4800] font-bold">
                LAB
              </span>
            </div>
            <span className="text-[9px] font-mono-tech uppercase tracking-[0.22em] text-[#636874] -mt-0.5">
              Spatial Design Study
            </span>
          </div>
        </a>

        {/* Center Technical Links - Desktop */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 bg-white/80 border border-[#e2ded6] px-3 py-1 rounded-sm shadow-2xs"
        >
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative px-3.5 py-1.5 rounded-xs text-[11px] font-mono-tech tracking-[0.14em] uppercase transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ff4800] ${
                  isActive
                    ? 'text-[#111215] bg-[#ebe8df] font-semibold'
                    : 'text-[#636874] hover:text-[#111215] hover:bg-[#f6f5f1]'
                }`}
              >
                <span className="text-[9px] text-[#ff4800] mr-1.5">{item.code}</span>
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Section: Interaction Hint & Action */}
        <div className="hidden lg:flex items-center gap-3.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white border border-[#e2ded6] text-[10px] font-mono-tech text-[#636874] tracking-wider">
            <Crosshair className="w-3 h-3 text-[#ff4800]" />
            <span>360° DRAG ORBIT</span>
          </div>

          <Badge variant="olive" size="sm">
            WK 03
          </Badge>

          <a
            href="#explorer"
            onClick={(e) => scrollToSection(e, '#explorer')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-mono-tech uppercase tracking-wider bg-[#111215] hover:bg-[#ff4800] text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4800]"
          >
            <span>Explore 3D</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#111215] hover:text-[#ff4800] rounded-xs border border-[#e2ded6] bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4800]"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-[#faf9f6] border-b border-[#e2ded6] p-6 shadow-xl transition-all">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2ded6] text-xs font-mono-tech text-[#636874]">
              <span className="flex items-center gap-2">
                <Crosshair className="w-3.5 h-3.5 text-[#ff4800]" />
                SPATIAL STUDY // 001
              </span>
              <Badge variant="orange" size="sm">Interactive</Badge>
            </div>

            <nav className="flex flex-col gap-2">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xs bg-white hover:bg-[#f0ede6] border border-[#e2ded6] text-xs font-mono-tech tracking-wider uppercase text-[#111215]"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[#ff4800] text-[10px] font-semibold">{item.code}</span>
                    {item.label}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8c9099]" />
                </a>
              ))}
            </nav>

            <a
              href="#explorer"
              onClick={(e) => scrollToSection(e, '#explorer')}
              className="mt-2 text-center py-2.5 rounded-xs bg-[#ff4800] text-white font-mono-tech text-xs uppercase tracking-widest font-semibold hover:bg-[#e03f00] transition-colors"
            >
              Enter Object Explorer
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
