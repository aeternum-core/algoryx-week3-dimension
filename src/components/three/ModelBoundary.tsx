import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { ProceduralObsidianSculpture } from './ProceduralObsidianSculpture';
import type { LabMaterialMode, LabMotionMode } from '../../types';

interface ModelBoundaryProps {
  modelUrl?: string | null;
  materialMode?: LabMaterialMode;
  motionMode?: LabMotionMode;
  wireframe?: boolean;
  exploded?: boolean;
  rotationSpeed?: number;
  autoRotate?: boolean;
  interactivePointer?: boolean;
}

// Inner component for rendering external GLB models when supplied
const ExternalGLBModel: React.FC<{ url: string }> = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
};

// React Error Boundary for 3D GLTF parsing errors
class ModelErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('[OBSIDIAN Spatial Lab] Failed to load external 3D asset, smoothly falling back to procedural core:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * ModelBoundary: Dedicated asset-loading boundary.
 * If an official 3D GLB model URL is configured, it safely mounts the asset.
 * If no asset is provided, or during network loading/parsing failure,
 * it seamlessly mounts the original procedural obsidian sculpture.
 */
export const ModelBoundary: React.FC<ModelBoundaryProps> = ({
  modelUrl,
  materialMode = 'graphite',
  motionMode = 'inertia',
  wireframe = false,
  exploded = false,
  rotationSpeed = 1,
  autoRotate = true,
  interactivePointer = true,
}) => {
  const proceduralFallback = (
    <ProceduralObsidianSculpture
      materialMode={materialMode}
      motionMode={motionMode}
      wireframe={wireframe}
      exploded={exploded}
      rotationSpeed={rotationSpeed}
      autoRotate={autoRotate}
      interactivePointer={interactivePointer}
    />
  );

  if (!modelUrl) {
    return proceduralFallback;
  }

  return (
    <ModelErrorBoundary fallback={proceduralFallback}>
      <Suspense fallback={proceduralFallback}>
        <ExternalGLBModel url={modelUrl} />
      </Suspense>
    </ModelErrorBoundary>
  );
};
