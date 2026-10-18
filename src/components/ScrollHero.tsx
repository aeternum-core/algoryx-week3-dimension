import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, RotateCcw, ArrowRight, Compass, Sparkles, Layers } from 'lucide-react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { CanvasContainer } from './3d/CanvasContainer.tsx';
import { MewScrollScene, type ScrollStoryProxy } from './3d/MewScrollScene.tsx';

gsap.registerPlugin(ScrollTrigger);

export const ScrollHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyFrameRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  // 3D story proxy read directly by useFrame inside MewScrollScene
  const storyProxy = useRef<ScrollStoryProxy>({
    progress: 0,
    rotY: 0,
    rotX: 0,
    posX: 0,
    posY: 0,
    scale: 2.2,
    isInteractive: false,
  });

  const [activeScene, setActiveScene] = useState<number>(1);
  const [isInteractive, setIsInteractive] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Scene DOM refs for smooth GSAP opacity & transform scrubbing
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);

  const handleResetCamera = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsInteractive(true);
      storyProxy.current.isInteractive = true;
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Reset initial scene states
    if (scene1Ref.current) gsap.set(scene1Ref.current, { opacity: 1, y: 0 });
    if (scene2Ref.current) gsap.set(scene2Ref.current, { opacity: 0, y: 30 });
    if (scene3Ref.current) gsap.set(scene3Ref.current, { opacity: 0, y: 30 });
    if (scene4Ref.current) gsap.set(scene4Ref.current, { opacity: 0, y: 30 });

    const isMobile = window.innerWidth <= 768;
    const posXOffset = isMobile ? 0 : 0.85;
    const negPosXOffset = isMobile ? 0 : -0.85;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            storyProxy.current.progress = p;

            // Update active scene indicator for HUD
            if (p < 0.25) {
              setActiveScene(1);
              setIsInteractive(false);
              storyProxy.current.isInteractive = false;
            } else if (p < 0.52) {
              setActiveScene(2);
              setIsInteractive(false);
              storyProxy.current.isInteractive = false;
            } else if (p < 0.75) {
              setActiveScene(3);
              setIsInteractive(false);
              storyProxy.current.isInteractive = false;
            } else {
              setActiveScene(4);
              setIsInteractive(true);
              storyProxy.current.isInteractive = true;
            }
          },
        },
      });

      // ==========================================
      // SECTION 1 -> 2 (Arrival -> Form) [0 to 0.35]
      // ==========================================
      tl.to(
        scene1Ref.current,
        {
          opacity: 0,
          y: -40,
          ease: 'power1.in',
          duration: 0.18,
        },
        0.05
      );

      tl.to(
        storyProxy.current,
        {
          rotY: 0.95,
          rotX: -0.12,
          posX: posXOffset,
          posY: 0,
          scale: 2.35,
          ease: 'power2.inOut',
          duration: 0.32,
        },
        0.04
      );

      tl.to(
        scene2Ref.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.16,
        },
        0.18
      );

      // ==========================================
      // SECTION 2 -> 3 (Form -> Perspective) [0.35 to 0.7]
      // ==========================================
      tl.to(
        scene2Ref.current,
        {
          opacity: 0,
          y: -40,
          ease: 'power1.in',
          duration: 0.16,
        },
        0.42
      );

      tl.to(
        storyProxy.current,
        {
          rotY: -1.05,
          rotX: 0.2,
          posX: negPosXOffset,
          posY: 0.05,
          scale: 2.4,
          ease: 'power2.inOut',
          duration: 0.32,
        },
        0.4
      );

      tl.to(
        scene3Ref.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.16,
        },
        0.52
      );

      // ==========================================
      // SECTION 3 -> 4 (Perspective -> Interactive) [0.7 to 1.0]
      // ==========================================
      tl.to(
        scene3Ref.current,
        {
          opacity: 0,
          y: -40,
          ease: 'power1.in',
          duration: 0.15,
        },
        0.72
      );

      tl.to(
        storyProxy.current,
        {
          rotY: 0,
          rotX: 0,
          posX: 0,
          posY: 0,
          scale: 2.2,
          ease: 'power2.inOut',
          duration: 0.24,
        },
        0.7
      );

      tl.to(
        scene4Ref.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.16,
        },
        0.78
      );
    }, container);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [prefersReducedMotion]);

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className={`scroll-hero-wrapper ${prefersReducedMotion ? 'reduced-motion-mode' : ''}`}
      id="hero-story"
      aria-label="Interactive 3D Narrative Hero"
    >
      <div ref={stickyFrameRef} className="scroll-hero-sticky">
        {/* Apple-style Timeline Progress HUD */}
        <div className="story-progress-hud" aria-label="Narrative Progress">
          {[
            { step: 1, label: 'ARRIVAL' },
            { step: 2, label: 'FORM' },
            { step: 3, label: 'PERSPECTIVE' },
            { step: 4, label: 'INTERACT' },
          ].map((item) => (
            <div
              key={item.step}
              className={`story-step ${activeScene === item.step ? 'active' : ''}`}
            >
              <span className="step-bar" />
              <span className="step-num">0{item.step}</span>
              <span className="step-label">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Global Technical Badges */}
        <div className="story-corner-badge top-left">
          <span className="badge-bullet">№ 001</span>
          <span>MEW / OFFICIAL ALGORYX ASSET</span>
        </div>

        <div className="story-corner-badge top-right">
          <Sparkles size={12} className="accent-icon" />
          <span>520K POLYGONS · WEBP PBR</span>
        </div>

        {/* Central WebGL Stage */}
        <div className="story-canvas-layer">
          <CanvasContainer
            className="story-canvas"
            camera={{ position: [0, 0, 3.4], fov: 34 }}
          >
            <MewScrollScene
              storyProxy={storyProxy}
              isInteractive={isInteractive}
              onControlsReady={(controls) => {
                controlsRef.current = controls;
              }}
            />
          </CanvasContainer>
        </div>

        {/* Overlaid Narrative Text Scenes */}
        <div className="story-narrative-overlay section-wrap">
          {/* SCENE 01 — ARRIVAL */}
          <div ref={scene1Ref} className="story-scene scene-arrival">
            <div className="eyebrow">
              <span className="live-dot" />
              <span>INTERACTIVE 3D PLAYGROUND</span>
              <span className="eyebrow-line" />
            </div>
            <h1 className="hero-headline">
              BEYOND THE <span className="accent-text">FRAME.</span>
            </h1>
            <p className="hero-description">
              Four digital forms. New perspectives at every turn.
              An art-directed exploration of character, form, and kinematics.
            </p>
            <div className="scene-actions">
              <button
                className="button button-orange"
                onClick={() => scrollToSection('characters')}
              >
                Explore Models <ArrowRight size={15} />
              </button>
              <button
                className="button button-outline"
                onClick={() => scrollToSection('motion')}
              >
                Motion Lab
              </button>
            </div>
            <div className="scroll-cue">
              <span className="scroll-cue-text">SCROLL TO DISCOVER</span>
              <ArrowDown size={14} className="bounce-arrow" />
            </div>
          </div>

          {/* SCENE 02 — FORM */}
          <div ref={scene2Ref} className="story-scene scene-form">
            <div className="scene-card">
              <div className="eyebrow">[ SCENE 02 / FORM &amp; TOPOLOGY ]</div>
              <h2 className="scene-headline">Organic geometry. Sculpted to precision.</h2>
              <p className="scene-body">
                Over 520,000 polygons compose Mew&apos;s continuous curvature. Notice how light interacts
                seamlessly across the micro-faceted PBR textures without polygonal distortion or
                visible triangulation.
              </p>
              <div className="scene-tags">
                <span className="tech-tag">
                  <Layers size={11} /> 520,106 Triangles
                </span>
                <span className="tech-tag">WebP Specular PBR</span>
                <span className="tech-tag">EXT_meshopt Decoded</span>
              </div>
            </div>
          </div>

          {/* SCENE 03 — PERSPECTIVE */}
          <div ref={scene3Ref} className="story-scene scene-perspective">
            <div className="scene-card right-aligned">
              <div className="eyebrow">[ SCENE 03 / PERSPECTIVE &amp; SPACE ]</div>
              <h2 className="scene-headline">New perspectives at every turn.</h2>
              <p className="scene-body">
                Move beyond the flat screen. As directional vectors shift, subsurface details and
                rim lighting reveal the anatomical balance and tactile character of the form.
              </p>
              <div className="scene-tags">
                <span className="tech-tag">1.00m × 1.00m × 0.66m Bounds</span>
                <span className="tech-tag">Multi-Point Studio Rig</span>
                <span className="tech-tag">Zero Asset Modification</span>
              </div>
            </div>
          </div>

          {/* SCENE 04 — INTERACTION */}
          <div ref={scene4Ref} className="story-scene scene-interaction">
            <div className="scene-card center-card">
              <div className="eyebrow">
                <span className="live-dot" />
                [ SCENE 04 / DIRECT INTERACTION ]
              </div>
              <h2 className="scene-headline">Take control. Orbit the form.</h2>
              <p className="scene-body">
                Tactile manipulation unlocked. Drag in any direction with pointer or touch to
                inspect Mew freely from any spatial angle.
              </p>
              <div className="interaction-tools-bar">
                <div className="interaction-tip">
                  <Compass size={14} />
                  <span>Drag 360° to Orbit · Scroll to Zoom</span>
                </div>
                <button
                  className="action-btn"
                  onClick={handleResetCamera}
                  title="Reset Camera Framing"
                >
                  <RotateCcw size={13} />
                  <span>Reset View</span>
                </button>
                <button
                  className="button button-dark next-section-btn"
                  onClick={() => scrollToSection('about')}
                >
                  Meet the Full Collection <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Ticker Bar */}
        <div className="story-status-footer">
          <span>01 / 04 MEW</span>
          <span className="dot-sep">·</span>
          <span>REAL-TIME GLTF SHADER PIPELINE</span>
          <span className="dot-sep">·</span>
          <span>COMMUNITY ASSETS FROM ALGORYX</span>
        </div>
      </div>
    </section>
  );
};
