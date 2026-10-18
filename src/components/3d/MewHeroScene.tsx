import React, { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, OrbitControls, Html } from '@react-three/drei';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { LoadingFallback } from '../LoadingFallback.tsx';

function MewModel() {
  const gltf = useGLTF('/models/Mew.glb');
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  const scene = useMemo(() => {
    const cloned = cloneSkeleton(gltf.scene);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;

    cloned.position.sub(center);
    cloned.scale.setScalar(2.2 / maxDim);

    cloned.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    return cloned;
  }, [gltf.scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Subtle gentle float
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.06;

    // Fluid pointer responsiveness (smooth dampening)
    if (modelRef.current) {
      const targetRotY = state.pointer.x * 0.35;
      const targetRotX = -state.pointer.y * 0.2;
      modelRef.current.rotation.y = THREE.MathUtils.damp(
        modelRef.current.rotation.y,
        targetRotY,
        3.5,
        delta
      );
      modelRef.current.rotation.x = THREE.MathUtils.damp(
        modelRef.current.rotation.x,
        targetRotX,
        3.5,
        delta
      );
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={modelRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/Mew.glb');

export const MewHeroScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={1.3} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} castShadow shadow-bias={-0.0001} />
      <pointLight position={[-4, 1.5, -2]} intensity={1.4} color="#f05524" />
      <pointLight position={[3, -2, 2]} intensity={0.6} color="#fbbf24" />

      <Suspense
        fallback={
          <Html center>
            <LoadingFallback label="Loading Mew.glb" sublabel="PBR Hero Mesh (520k polygons)" />
          </Html>
        }
      >
        <MewModel />
        <Environment preset="studio" />
        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.3}
          scale={4.8}
          blur={2.4}
          far={3.8}
        />
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
        rotateSpeed={0.8}
      />
    </>
  );
};
