import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { LightingRig } from './LightingRig';
import { ModelBoundary } from './ModelBoundary';
import type { LabMaterialMode, LabLightMode, LabMotionMode } from '../../types';

interface SceneCanvasProps {
  modelUrl?: string | null;
  materialMode?: LabMaterialMode;
  lightMode?: LabLightMode;
  motionMode?: LabMotionMode;
  wireframe?: boolean;
  exploded?: boolean;
  rotationSpeed?: number;
  autoRotate?: boolean;
  enableZoom?: boolean;
  enableOrbit?: boolean;
  cameraPosition?: [number, number, number];
  interactivePointer?: boolean;
  className?: string;
}

// Minimal technical loading indicator for light architectural theme
const CanvasLoadingIndicator: React.FC = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 bg-[#f6f5f1]/80 backdrop-blur-xs">
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-neutral-300 border-t-[#ff4800] animate-spin" />
      <div className="w-2 h-2 rounded-full bg-[#ff4800]" />
    </div>
    <span className="mt-3 text-[10px] uppercase tracking-[0.25em] text-[#383b42] font-mono-tech">
      INITIALIZING GEOMETRY // 3D
    </span>
  </div>
);

// Fallback if WebGL fails on client system
const WebGLUnavailableFallback: React.FC = () => (
  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#faf9f6] border border-[#e2ded6] rounded-xl">
    <div className="w-14 h-14 rounded-xl bg-[#ff4800]/10 border border-[#ff4800]/30 flex items-center justify-center mb-4 text-[#ff4800]">
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <h4 className="text-base font-display font-bold text-[#111215] mb-2">Hardware Acceleration Required</h4>
    <p className="text-xs text-[#525660] max-w-sm mb-4 leading-relaxed font-sans">
      WebGL is disabled or unsupported. Please enable 3D hardware acceleration to inspect the real-time spatial geometry.
    </p>
    <div className="text-[10px] font-mono-tech text-[#ff4800] uppercase tracking-widest">
      Obsidian Spatial Lab Fallback
    </div>
  </div>
);

export const SceneCanvas: React.FC<SceneCanvasProps> = ({
  modelUrl,
  materialMode = 'graphite',
  lightMode = 'studio',
  motionMode = 'inertia',
  wireframe = false,
  exploded = false,
  rotationSpeed = 1,
  autoRotate = true,
  enableZoom = false,
  enableOrbit = true,
  cameraPosition = [0, 0, 5.2],
  interactivePointer = true,
  className = 'w-full h-full',
}) => {
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!webglSupported) {
    return <WebGLUnavailableFallback />;
  }

  return (
    <div className={`relative ${className} select-none overflow-hidden`}>
      <Suspense fallback={<CanvasLoadingIndicator />}>
        <Canvas
          camera={{ position: cameraPosition, fov: 45 }}
          dpr={isMobile ? [1, 1.25] : [1, 1.75]}
          gl={{
            powerPreference: 'high-performance',
            antialias: !isMobile,
            alpha: true,
            stencil: false,
            depth: true,
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          style={{ pointerEvents: 'auto' }}
        >
          {/* Studio Architectural Lighting */}
          <LightingRig mode={lightMode} />

          {/* Core Isolated 3D Asset / Procedural Model */}
          <ModelBoundary
            modelUrl={modelUrl}
            materialMode={materialMode}
            motionMode={motionMode}
            wireframe={wireframe}
            exploded={exploded}
            rotationSpeed={rotationSpeed}
            autoRotate={autoRotate}
            interactivePointer={interactivePointer}
          />

          {/* Controlled OrbitControls to prevent disorienting spin & scroll lock */}
          {enableOrbit && (
            <OrbitControls
              enableZoom={enableZoom}
              enablePan={false}
              rotateSpeed={0.65}
              dampingFactor={0.05}
              minDistance={3.2}
              maxDistance={7.5}
              minPolarAngle={Math.PI / 4.5}
              maxPolarAngle={Math.PI - Math.PI / 4.5}
            />
          )}
        </Canvas>
      </Suspense>
    </div>
  );
};
