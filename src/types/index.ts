export type ModelId = 'mew' | 'robot' | 'ironman' | 'grid';

export interface CameraPreset {
  position: [number, number, number];
  target?: [number, number, number];
  fov: number;
  minDistance: number;
  maxDistance: number;
}

export interface ModelMetadata {
  id: ModelId;
  name: string;
  category: string;
  number: string;
  file: string;
  accent: string;
  secondaryAccent?: string;
  tagline: string;
  description: string;
  triangles: number;
  meshCount: number;
  materialType: string;
  dimensions: string;
  animationName?: string;
  animationDuration?: number;
  hasAnimation: boolean;
  cameraPreset: CameraPreset;
  heroScale?: number;
  viewerScale?: number;
}

export interface AnimationControls {
  isPlaying: boolean;
  speed: number;
  progress: number;
  duration: number;
}
