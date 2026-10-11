export type StudyTab = 'FORM' | 'MATERIAL' | 'MOTION';

export type LabMaterialMode = 'graphite' | 'ceramic' | 'titanium' | 'vermilion';

export type LabLightMode = 'studio' | 'solar' | 'precision';

export type LabMotionMode = 'inertia' | 'kinetic' | 'static';

export interface SculptureControls {
  materialMode: LabMaterialMode;
  lightMode: LabLightMode;
  motionMode: LabMotionMode;
  wireframe: boolean;
  exploded: boolean;
  rotationSpeed: number;
}

export interface SculptureStats {
  objectId: string;
  geometryName: string;
  polyCount: number;
  subdivisions: number;
  materialDensity: string;
  refractiveIndex: number;
  specularSheen: string;
  assetSource: string;
  status: 'Procedural Lab Core' | 'External Model Mounted';
}

export interface NavItem {
  id: string;
  label: string;
  code: string;
  href: string;
}

export interface DimensionFeature {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  parameters: { key: string; val: string }[];
  tag: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  label: string;
  description: string;
  code: string;
}
