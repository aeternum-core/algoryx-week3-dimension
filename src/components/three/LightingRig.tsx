import type { LabLightMode } from '../../types';

interface LightingRigProps {
  mode?: LabLightMode;
}

export const LightingRig = ({ mode = 'studio' }: LightingRigProps) => {
  const isSolar = mode === 'solar';
  const isPrecision = mode === 'precision';

  return (
    <>
      {/* Soft Ambient Sky Fill for Light Architectural Environment */}
      <ambientLight intensity={isSolar ? 0.6 : 0.85} color="#faf9f5" />

      {/* Main Studio Key Light (Sun / Ceiling Softbox) */}
      <directionalLight
        position={isSolar ? [6, 8, 4] : [4, 7, 5]}
        intensity={isSolar ? 2.8 : 2.0}
        color="#ffffff"
        castShadow={false}
      />

      {/* Secondary Diffuse Fill Light from Stone Floor */}
      <directionalLight
        position={[-5, -2, -2]}
        intensity={0.65}
        color="#e8e5dc"
      />

      {/* Spatial Accent Rim - Electric Orange Grazing Touch */}
      <spotLight
        position={[-5, 4, -4]}
        intensity={isPrecision ? 4.5 : 2.4}
        color="#ff5500"
        angle={0.7}
        penumbra={0.8}
        distance={20}
      />

      {/* Graphite Specular Fill from Right Profile */}
      <pointLight
        position={[4, -3, 3]}
        intensity={1.2}
        color="#707682"
        distance={15}
      />

      {/* Central Axis Precision Light */}
      <pointLight
        position={[0, 0, 3.5]}
        intensity={0.7}
        color="#ffffff"
        distance={10}
      />
    </>
  );
};
