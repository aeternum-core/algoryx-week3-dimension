import React from 'react';

interface LoadingFallbackProps {
  label?: string;
  sublabel?: string;
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  label = 'Loading 3D asset…',
  sublabel = 'Decompressing geometry & textures',
}) => {
  return (
    <div className="model-loader-overlay" role="status" aria-live="polite">
      <div className="model-loader-spinner">
        <div className="spinner-track" />
        <div className="spinner-blade" />
      </div>
      <div className="model-loader-text">
        <span className="loader-title">{label}</span>
        <span className="loader-subtitle">{sublabel}</span>
      </div>
    </div>
  );
};
