import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Box, Waves, Sparkles, Shield, Cpu } from 'lucide-react';
import { MODELS } from '../data/models.ts';
import type { ModelMetadata } from '../types/index.ts';

interface AssetGalleryProps {
  onSelectCharacter: (model: ModelMetadata) => void;
}

export const AssetGallery: React.FC<AssetGalleryProps> = ({ onSelectCharacter }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'mew':
        return <Sparkles size={28} />;
      case 'robot':
        return <Cpu size={28} />;
      case 'ironman':
        return <Shield size={28} />;
      case 'grid':
        return <Waves size={28} />;
      default:
        return <Box size={28} />;
    }
  };

  const handleCardClick = (model: ModelMetadata) => {
    if (model.id === 'grid') {
      const el = document.getElementById('motion');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onSelectCharacter(model);
      const el = document.getElementById('characters');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="gallery-section section-wrap" id="collection" aria-label="Asset Collection">
      <div className="section-header">
        <div className="header-meta">
          <p className="eyebrow">
            <span className="live-dot" />
            [ OFFICIAL ASSET COLLECTION / 004 ]
          </p>
          <h2 className="section-title">
            The Algoryx Community <em>quartet.</em>
          </h2>
        </div>
        <p className="section-lead">
          All four official GLB assets integrated into a unified interactive architecture.
          Directly select any asset below to stage it immediately in its optimal 3D lab environment.
        </p>
      </div>

      <div className="asset-cards-grid">
        {MODELS.map((model) => (
          <motion.div
            key={model.id}
            className="gallery-card"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            style={{ '--card-accent': model.accent } as React.CSSProperties}
          >
            <div className="card-top-bar">
              <span className="card-number">{model.number} / 04</span>
              <span className="card-category">{model.category}</span>
            </div>

            <div className="card-icon-area">
              <div className="card-icon-circle">{getIcon(model.id)}</div>
            </div>

            <div className="card-content">
              <h3 className="card-title">{model.name}</h3>
              <p className="card-tagline">{model.tagline}</p>

              <div className="card-specs-bar">
                <div className="card-spec">
                  <span className="spec-name">POLYGONS</span>
                  <span className="spec-val mono">{(model.triangles / 1000).toFixed(0)}k</span>
                </div>
                <div className="card-spec">
                  <span className="spec-name">MESHES</span>
                  <span className="spec-val mono">{model.meshCount}</span>
                </div>
                <div className="card-spec">
                  <span className="spec-name">ANIMATION</span>
                  <span className="spec-val">
                    {model.hasAnimation ? 'Active' : 'Static'}
                  </span>
                </div>
              </div>

              <button
                className="card-action-btn"
                onClick={() => handleCardClick(model)}
              >
                <span>{model.id === 'grid' ? 'Stage in Motion Lab' : 'Stage in Character Lab'}</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
