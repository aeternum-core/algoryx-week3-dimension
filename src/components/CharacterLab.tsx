import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Box, Layers, Eye, Compass, ArrowRight } from 'lucide-react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { CHARACTER_MODELS } from '../data/models.ts';
import type { ModelMetadata } from '../types/index.ts';
import { CanvasContainer } from './3d/CanvasContainer.tsx';
import { CharacterScene } from './3d/CharacterScene.tsx';

interface CharacterLabProps {
  selectedModel?: ModelMetadata;
  onSelectModel?: (model: ModelMetadata) => void;
}

export const CharacterLab: React.FC<CharacterLabProps> = ({
  selectedModel: externalSelected,
  onSelectModel: externalOnSelect,
}) => {
  const [internalSelected, setInternalSelected] = useState<ModelMetadata>(CHARACTER_MODELS[0]);
  const [resetCount, setResetCount] = useState(0);
  const controlsRef = React.useRef<OrbitControlsImpl | null>(null);

  const currentModel = externalSelected || internalSelected;

  const handleSelect = (model: ModelMetadata) => {
    if (externalOnSelect) {
      externalOnSelect(model);
    } else {
      setInternalSelected(model);
    }
  };

  const handleResetCamera = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setResetCount((prev) => prev + 1);
  }, []);

  return (
    <section className="character-lab section-wrap" id="characters" aria-label="Character Lab">
      <div className="section-header">
        <div className="header-meta">
          <p className="eyebrow">
            <span className="live-dot" />
            [ CHARACTER LAB / 001 ]
          </p>
          <h2 className="section-title">
            Explore organic & <em>engineered forms.</em>
          </h2>
        </div>
        <p className="section-lead">
          Inspect three distinct sculptural and articulated characters. Switch models instantly,
          drag to orbit 360°, inspect structural tolerances, and reset camera views.
        </p>
      </div>

      <div className="character-lab-layout">
        <div className="viewer-pane">
          <div className="viewer-toolbar">
            <div className="model-tabs" role="tablist" aria-label="Character Selection">
              {CHARACTER_MODELS.map((model) => {
                const isActive = currentModel.id === model.id;
                return (
                  <button
                    key={model.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`model-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelect(model)}
                    style={
                      isActive
                        ? ({ '--tab-accent': model.accent } as React.CSSProperties)
                        : undefined
                    }
                  >
                    <span className="tab-number">{model.number}</span>
                    <span className="tab-name">{model.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="viewer-actions">
              <button
                className="action-btn"
                onClick={handleResetCamera}
                title="Reset Camera Framing"
                aria-label="Reset Camera Framing"
              >
                <RotateCcw size={14} />
                <span>Reset View</span>
              </button>
            </div>
          </div>

          <div className="interactive-stage">
            <div className="stage-hud-top">
              <div className="hud-badge">
                <span className="badge-dot" style={{ backgroundColor: currentModel.accent }} />
                <span>{currentModel.category}</span>
              </div>
              <div className="hud-badge secondary">
                <Box size={12} />
                <span>REAL GLB ASSET</span>
              </div>
            </div>

            <CanvasContainer
              className="character-canvas"
              camera={{
                position: currentModel.cameraPreset.position,
                fov: currentModel.cameraPreset.fov,
              }}
            >
              <CharacterScene
                model={currentModel}
                resetTrigger={resetCount}
                isPlaying={true}
                onControlsReady={(controls) => {
                  controlsRef.current = controls;
                }}
              />
            </CanvasContainer>

            <div className="stage-hud-bottom">
              <div className="hud-info">
                <h3 className="hud-model-name">{currentModel.name}</h3>
                <p className="hud-model-tagline">{currentModel.tagline}</p>
              </div>
              <div className="hud-controls-tip">
                <Compass size={14} />
                <span>Drag to Orbit · Scroll to Zoom</span>
              </div>
            </div>
          </div>
        </div>

        <div className="specs-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-header">
              <span className="eyebrow">[ TECHNICAL AUDIT ]</span>
              <h4 className="sidebar-title">Model Specifications</h4>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentModel.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="specs-list"
              >
                <div className="spec-row">
                  <span className="spec-label">
                    <Layers size={13} /> Triangles (Polygons)
                  </span>
                  <span className="spec-value mono">
                    {currentModel.triangles.toLocaleString()}
                  </span>
                </div>

                <div className="spec-row">
                  <span className="spec-label">
                    <Box size={13} /> Component Meshes
                  </span>
                  <span className="spec-value mono">
                    {currentModel.meshCount} {currentModel.meshCount === 1 ? 'Mesh' : 'Meshes'}
                  </span>
                </div>

                <div className="spec-row">
                  <span className="spec-label">
                    <Eye size={13} /> Surface Pipeline
                  </span>
                  <span className="spec-value">{currentModel.materialType}</span>
                </div>

                <div className="spec-row">
                  <span className="spec-label">
                    <Compass size={13} /> Bounding Box Extent
                  </span>
                  <span className="spec-value mono">{currentModel.dimensions}</span>
                </div>

                <div className="spec-row">
                  <span className="spec-label">Embedded Animation</span>
                  <span className="spec-value">
                    {currentModel.hasAnimation ? (
                      <span className="status-badge animated">
                        {currentModel.animationName} ({currentModel.animationDuration}s)
                      </span>
                    ) : (
                      <span className="status-badge static">Static Sculptural Form</span>
                    )}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="sidebar-annotation">
              <p>{currentModel.description}</p>
            </div>

            {currentModel.hasAnimation && (
              <a href="#motion" className="motion-redirect-link">
                <span>View {currentModel.name} in Motion Lab</span>
                <ArrowRight size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
