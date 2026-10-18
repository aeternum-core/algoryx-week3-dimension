import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Activity, Waves, Sparkles, Gauge } from 'lucide-react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { MOTION_MODELS } from '../data/models.ts';
import type { ModelMetadata } from '../types/index.ts';
import { CanvasContainer } from './3d/CanvasContainer.tsx';
import { MotionScene } from './3d/MotionScene.tsx';

interface MotionLabProps {
  initialModelId?: 'robot' | 'grid';
}

export const MotionLab: React.FC<MotionLabProps> = ({ initialModelId = 'grid' }) => {
  const [selectedModel, setSelectedModel] = useState<ModelMetadata>(
    MOTION_MODELS.find((m) => m.id === initialModelId) || MOTION_MODELS[1]
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(1.0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(selectedModel.animationDuration || 4.0);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const handleModelSwitch = (model: ModelMetadata) => {
    setSelectedModel(model);
    setIsPlaying(true);
    setTotalDuration(model.animationDuration || 4.0);
    setCurrentTime(0);
    setResetTrigger((prev) => prev + 1);
  };

  const handleResetCamera = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, []);

  const handleResetAnimation = useCallback(() => {
    setResetTrigger((prev) => prev + 1);
    setIsPlaying(true);
  }, []);

  const handleProgress = useCallback((time: number, duration: number) => {
    setCurrentTime(time);
    setTotalDuration(duration);
  }, []);

  const progressPercent = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;
  const isGrid = selectedModel.id === 'grid';

  return (
    <section
      className={`motion-lab section-wrap ${isGrid ? 'theme-grid' : 'theme-robot'}`}
      id="motion"
      aria-label="Motion Lab"
    >
      <div className="section-header">
        <div className="header-meta">
          <p className="eyebrow">
            <span className="live-dot" />
            [ MOTION LAB / 002 ]
          </p>
          <h2 className="section-title">
            Not just form. <em>A moment in motion.</em>
          </h2>
        </div>
        <p className="section-lead">
          Kinetic studies in structural choreography. Compare the coordinated wave propagation of
          the 540-node neural grid against the multi-axis mechanical articulation of the companion robot.
        </p>
      </div>

      <div className="motion-lab-container">
        {/* Model Switcher Bar */}
        <div className="motion-nav-bar">
          <div className="motion-model-tabs" role="tablist">
            {MOTION_MODELS.map((model) => {
              const active = selectedModel.id === model.id;
              return (
                <button
                  key={model.id}
                  role="tab"
                  aria-selected={active}
                  className={`motion-tab ${active ? 'active' : ''}`}
                  onClick={() => handleModelSwitch(model)}
                >
                  {model.id === 'grid' ? <Waves size={16} /> : <Sparkles size={16} />}
                  <span className="motion-tab-text">
                    <b>{model.number}</b> {model.name}
                  </span>
                  <span className="motion-tab-anim">{model.animationName}</span>
                </button>
              );
            })}
          </div>

          <div className="motion-telemetry">
            <span className="telemetry-item">
              <Activity size={13} className="telemetry-icon" />
              <span>
                {currentTime.toFixed(1)}s / {totalDuration.toFixed(1)}s
              </span>
            </span>
            <span className="telemetry-item">
              <Gauge size={13} className="telemetry-icon" />
              <span>{speed}x Rate</span>
            </span>
          </div>
        </div>

        {/* 3D Motion Stage */}
        <div className="motion-stage-box">
          <div className="motion-canvas-wrapper">
            <CanvasContainer
              className="motion-canvas"
              camera={{
                position: selectedModel.cameraPreset.position,
                fov: selectedModel.cameraPreset.fov,
              }}
            >
              <MotionScene
                key={selectedModel.id}
                model={selectedModel}
                isPlaying={isPlaying}
                speed={speed}
                resetTrigger={resetTrigger}
                onProgress={handleProgress}
                onControlsReady={(controls) => {
                  controlsRef.current = controls;
                }}
              />
            </CanvasContainer>
          </div>

          {/* Timeline Scrubber / Progress Line */}
          <div className="timeline-bar-wrapper">
            <div className="timeline-track">
              <div
                className="timeline-fill"
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: selectedModel.accent,
                }}
              />
            </div>
          </div>

          {/* Master Transport Controls */}
          <div className="transport-controls">
            <div className="transport-left">
              <button
                className={`transport-btn play-btn ${isPlaying ? 'active' : ''}`}
                onClick={() => setIsPlaying((prev) => !prev)}
                aria-label={isPlaying ? 'Pause Animation' : 'Play Animation'}
                title={isPlaying ? 'Pause Animation' : 'Play Animation'}
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} className="fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                className="transport-btn secondary"
                onClick={handleResetAnimation}
                title="Restart Animation Loop"
                aria-label="Restart Animation Loop"
              >
                <RotateCcw size={14} />
                <span>Restart</span>
              </button>

              <button
                className="transport-btn secondary"
                onClick={handleResetCamera}
                title="Reset 3D Perspective"
                aria-label="Reset 3D Perspective"
              >
                <span>Reset View</span>
              </button>
            </div>

            <div className="transport-speed">
              <span className="speed-label">SPEED</span>
              {[0.5, 1.0, 1.5, 2.0].map((rate) => (
                <button
                  key={rate}
                  className={`speed-btn ${speed === rate ? 'active' : ''}`}
                  onClick={() => setSpeed(rate)}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Kinematic Analysis Card */}
        <div className="motion-notes-grid">
          <div className="motion-note-card">
            <span className="eyebrow">[ KINEMATIC DOSSIER ]</span>
            <h4 className="note-card-title">{selectedModel.name} Animation Analysis</h4>
            <p className="note-card-desc">{selectedModel.description}</p>
          </div>

          <div className="motion-note-card">
            <span className="eyebrow">[ CHANNEL ARCHITECTURE ]</span>
            <div className="channel-stats">
              <div className="channel-row">
                <span>Active Track Clip</span>
                <span className="mono bold">{selectedModel.animationName}</span>
              </div>
              <div className="channel-row">
                <span>Loop Mode</span>
                <span className="mono">Continuous Seamless Wrap</span>
              </div>
              <div className="channel-row">
                <span>Target Node Density</span>
                <span className="mono">
                  {selectedModel.id === 'grid' ? '540 Block Array' : '16 Articulated Joints'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
