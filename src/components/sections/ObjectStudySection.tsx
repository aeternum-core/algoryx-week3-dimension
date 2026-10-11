import React, { useState } from 'react';
import {
  RotateCcw,
  Maximize2,
  Crosshair,
  ArrowUp,
  Cpu,
  Info,
  CircleDot,
} from 'lucide-react';
import { SceneCanvas } from '../three/SceneCanvas';
import type { LabMaterialMode, LabLightMode, LabMotionMode, StudyTab } from '../../types';
import { Badge } from '../ui/Badge';
import { STUDY_TAB_CONTENT, INITIAL_SCULPTURE_STATS } from '../../data/content';

export const ObjectStudySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StudyTab>('FORM');
  const [materialMode, setMaterialMode] = useState<LabMaterialMode>('graphite');
  const [lightMode, setLightMode] = useState<LabLightMode>('studio');
  const [motionMode, setMotionMode] = useState<LabMotionMode>('inertia');
  const [exploded, setExploded] = useState<boolean>(false);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const resetControls = () => {
    setActiveTab('FORM');
    setMaterialMode('graphite');
    setLightMode('studio');
    setMotionMode('inertia');
    setExploded(false);
    setWireframe(false);
    setRotationSpeed(1.0);
  };

  const toggleFullscreen = () => {
    const container = document.getElementById('explorer-viewport-container');
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const tabData = STUDY_TAB_CONTENT[activeTab];

  return (
    <section id="explorer" className="relative py-28 bg-[#f6f5f1] border-t border-[#e2ded6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#e2ded6]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="orange" size="sm" dot>
                SECTION 02
              </Badge>
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#636874]">
                PRIMARY 3D WORKSPACE
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-[#111215] tracking-tight">
              OBJECT EXPLORER.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm font-sans text-[#383b42] font-light leading-relaxed">
              A dedicated spatial inspection deck. Rotate the object 360°, inspect topological curvature,
              cycle substrate materials, and observe calibrated momentum damping.
            </p>
          </div>
        </div>

        {/* The Spatial Lab Workspace Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main 3D Viewport (8 Columns) */}
          <div
            id="explorer-viewport-container"
            className="lg:col-span-8 relative rounded-sm bg-[#faf9f6] border border-[#e2ded6] overflow-hidden shadow-xs h-[520px] sm:h-[620px] flex flex-col justify-between"
          >
            {/* Viewport Header Toolbar */}
            <div className="relative z-20 flex items-center justify-between p-4 sm:p-5 bg-[#faf9f6]/90 backdrop-blur-xs border-b border-[#e2ded6]">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#ff4800]" />
                <span className="font-mono-tech text-xs uppercase tracking-wider text-[#111215] font-semibold">
                  OBJECT / 001 // PARAMETRIC CORE
                </span>
                <span className="text-[10px] font-mono-tech text-[#8c9099] hidden sm:inline">
                  (DRAG ORBIT ENABLED)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-white hover:bg-[#eeece5] border border-[#d5d0c5] text-[#383b42] hover:text-[#111215] transition-colors text-xs font-mono-tech"
                  title="Return to Hero section"
                  aria-label="Return to Hero"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-[#ff4800]" />
                  <span className="hidden sm:inline">HERO</span>
                </button>

                <button
                  onClick={resetControls}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-white hover:bg-[#eeece5] border border-[#d5d0c5] text-[#383b42] hover:text-[#111215] transition-colors text-xs font-mono-tech"
                  title="Reset viewport parameters"
                  aria-label="Reset viewport parameters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">RESET</span>
                </button>

                <button
                  onClick={toggleFullscreen}
                  className={`p-1.5 rounded-xs border transition-colors ${
                    isFullscreen
                      ? 'bg-[#ff4800] text-white border-[#ff4800]'
                      : 'bg-white hover:bg-[#eeece5] border-[#d5d0c5] text-[#383b42]'
                  }`}
                  title={isFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}
                  aria-label="Toggle Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3D Scene Canvas */}
            <div className="absolute inset-0 z-10">
              <SceneCanvas
                materialMode={materialMode}
                lightMode={lightMode}
                motionMode={motionMode}
                wireframe={wireframe}
                exploded={exploded}
                rotationSpeed={rotationSpeed}
                enableZoom={true}
                enableOrbit={true}
                cameraPosition={[0, 0, 5.0]}
              />
            </div>

            {/* Bottom Interaction Guide Bar */}
            <div className="relative z-20 p-4 bg-[#faf9f6]/90 backdrop-blur-xs border-t border-[#e2ded6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono-tech text-[#636874]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff4800]" />
                  DRAG: 360° ORBIT
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111215]" />
                  SCROLL: ZOOM RANGE
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Crosshair className="w-3.5 h-3.5 text-[#ff4800]" />
                <span>DROP-IN GLB ASSET READY</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Object Information Panel (4 Columns) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Tab Control Header: FORM | MATERIAL | MOTION */}
            <div className="p-1.5 bg-[#eeece5] border border-[#e2ded6] rounded-xs grid grid-cols-3 gap-1">
              {(['FORM', 'MATERIAL', 'MOTION'] as const).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      // Trigger contextual visual enhancement
                      if (tab === 'FORM' && wireframe) {
                        // Keep wireframe state active
                      } else if (tab === 'MATERIAL' && wireframe) {
                        setWireframe(false);
                      }
                    }}
                    className={`py-2 px-3 text-xs font-mono-tech uppercase tracking-wider rounded-xs transition-all font-semibold ${
                      isActive
                        ? 'bg-[#111215] text-white shadow-xs'
                        : 'text-[#636874] hover:text-[#111215] hover:bg-[#faf9f6]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Active Tab Explanatory Content Card */}
            <div className="p-6 bg-[#faf9f6] border border-[#e2ded6] rounded-xs space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#ff4800] font-bold">
                    INVESTIGATION // {activeTab}
                  </span>
                  <CircleDot className="w-3.5 h-3.5 text-[#3b4d3e]" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#111215]">
                  {tabData.title}
                </h3>
                <p className="text-xs font-mono-tech text-[#636874]">
                  {tabData.subtitle}
                </p>
              </div>

              <p className="text-xs text-[#4b4f57] font-sans leading-relaxed">
                {tabData.summary}
              </p>

              {/* Specs Readout for Active Tab */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#e2ded6] text-[11px] font-mono-tech">
                {tabData.specs.map((item, idx) => (
                  <div key={idx} className="bg-white p-2.5 rounded-xs border border-[#e2ded6]">
                    <span className="text-[9px] uppercase text-[#8c9099] block mb-0.5">
                      {item.label}
                    </span>
                    <span className="text-[#111215] font-semibold truncate block">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dynamic Interactive Controls mapped to the selected tab */}
              <div className="pt-4 border-t border-[#e2ded6] space-y-3">
                {activeTab === 'FORM' && (
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#636874] block">
                      Topological Modifiers:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setExploded(!exploded)}
                        className={`p-2.5 text-xs font-mono-tech rounded-xs border transition-all text-left flex items-center justify-between ${
                          exploded
                            ? 'bg-[#111215] text-white border-[#111215]'
                            : 'bg-white text-[#111215] border-[#d5d0c5] hover:border-[#ff4800]'
                        }`}
                      >
                        <span>Exploded View</span>
                        <span className="text-[10px]">{exploded ? 'ON' : 'OFF'}</span>
                      </button>

                      <button
                        onClick={() => setWireframe(!wireframe)}
                        className={`p-2.5 text-xs font-mono-tech rounded-xs border transition-all text-left flex items-center justify-between ${
                          wireframe
                            ? 'bg-[#ff4800] text-white border-[#ff4800]'
                            : 'bg-white text-[#111215] border-[#d5d0c5] hover:border-[#ff4800]'
                        }`}
                      >
                        <span>CAD Wireframe</span>
                        <span className="text-[10px]">{wireframe ? 'ON' : 'OFF'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'MATERIAL' && (
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#636874] block">
                      Substrate Shaders:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {(
                        [
                          { id: 'graphite', label: 'Graphite' },
                          { id: 'ceramic', label: 'Bone Ceramic' },
                          { id: 'titanium', label: 'Titanium' },
                          { id: 'vermilion', label: 'Vermilion' },
                        ] as const
                      ).map((m) => (
                        <button
                          key={m.id}
                          onClick={() => {
                            setMaterialMode(m.id);
                            setWireframe(false);
                          }}
                          className={`p-2.5 text-xs font-mono-tech rounded-xs border transition-all text-left ${
                            materialMode === m.id && !wireframe
                              ? 'bg-[#111215] text-white border-[#111215] shadow-xs'
                              : 'bg-white text-[#111215] border-[#d5d0c5] hover:border-[#ff4800]'
                          }`}
                        >
                          <div className="font-semibold">{m.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'MOTION' && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#636874] block">
                      Kinematic Modes:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5 font-mono-tech text-xs">
                      {(
                        [
                          { id: 'inertia', label: 'Inertia' },
                          { id: 'kinetic', label: 'Kinetic' },
                          { id: 'static', label: 'Static' },
                        ] as const
                      ).map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => setMotionMode(mode.id)}
                          className={`py-2 px-2 text-center rounded-xs border transition-all ${
                            motionMode === mode.id
                              ? 'bg-[#111215] text-white border-[#111215]'
                              : 'bg-white text-[#111215] border-[#d5d0c5] hover:border-[#ff4800]'
                          }`}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[10px] font-mono-tech text-[#636874]">
                        <span>Angular Velocity</span>
                        <span className="font-semibold text-[#111215]">{rotationSpeed.toFixed(1)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="2.5"
                        step="0.1"
                        value={rotationSpeed}
                        onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                        className="w-full accent-[#ff4800] bg-[#e2ded6] h-1 rounded-sm cursor-pointer"
                        aria-label="Adjust angular velocity"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Architecture Telemetry Box */}
            <div className="p-4 bg-white border border-[#e2ded6] rounded-xs font-mono-tech text-xs space-y-2.5">
              <div className="flex items-center justify-between text-[#636874] pb-2 border-b border-[#e2ded6]">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#ff4800]" />
                  Asset Boundary Slot
                </span>
                <span className="text-[#3b4d3e] font-semibold">Active & Isolated</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-[#636874]">
                <div>
                  <span>Density:</span>{' '}
                  <span className="text-[#111215] font-semibold">{INITIAL_SCULPTURE_STATS.materialDensity}</span>
                </div>
                <div>
                  <span>Polycount:</span>{' '}
                  <span className="text-[#111215] font-semibold">{INITIAL_SCULPTURE_STATS.polyCount.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 text-[9px] text-[#8c9099] flex items-center gap-1.5 border-t border-[#e2ded6]">
                <Info className="w-3 h-3 text-[#ff4800] shrink-0" />
                <span>Drop official Algoryx GLB into /public/models/ to swap model.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
