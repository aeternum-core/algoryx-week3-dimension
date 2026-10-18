import React, { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, OrbitControls, Html } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { LoadingFallback } from '../LoadingFallback.tsx';

export interface ScrollStoryProxy {
  progress: number;
  rotY: number;
  rotX: number;
  posX: number;
  posY: number;
  scale: number;
  isInteractive: boolean;
}

interface MewScrollSceneProps {
  storyProxy: React.MutableRefObject<ScrollStoryProxy>;
  isInteractive: boolean;
  onControlsReady?: (controls: OrbitControlsImpl) => void;
}

function MewScrollModel({
  storyProxy,
  isInteractive,
}: {
  storyProxy: React.MutableRefObject<ScrollStoryProxy>;
  isInteractive: boolean;
}) {
  const gltf = useGLTF('/models/Mew.glb');
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Group>(null);

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
    if (!groupRef.current || !meshRef.current) return;
    const { rotY, rotX, posX, posY, scale } = storyProxy.current;

    if (!isInteractive) {
      // Smooth damped interpolation towards scroll story state
      groupRef.current.position.x = THREE.MathUtils.damp(
        groupRef.current.position.x,
        posX,
        4.5,
        delta
      );
      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        posY + Math.sin(state.clock.elapsedTime * 1.5) * 0.04,
        4.5,
        delta
      );

      // Mouse parallax tilt blended with scrubbed rotation
      const mouseInfluenceX = state.pointer.x * 0.25;
      const mouseInfluenceY = -state.pointer.y * 0.15;

      meshRef.current.rotation.y = THREE.MathUtils.damp(
        meshRef.current.rotation.y,
        rotY + mouseInfluenceX,
        4.5,
        delta
      );
      meshRef.current.rotation.x = THREE.MathUtils.damp(
        meshRef.current.rotation.x,
        rotX + mouseInfluenceY,
        4.5,
        delta
      );

      groupRef.current.scale.setScalar(
        THREE.MathUtils.damp(groupRef.current.scale.x, scale, 4.5, delta)
      );
    } else {
      // In interactive mode, let orbit controls take over orientation
      groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, 0, 4.0, delta);
      groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, 0, 4.0, delta);
      groupRef.current.scale.setScalar(
        THREE.MathUtils.damp(groupRef.current.scale.x, 2.2, 4.0, delta)
      );
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={meshRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/Mew.glb');

export const MewScrollScene: React.FC<MewScrollSceneProps> = ({
  storyProxy,
  isInteractive,
  onControlsReady,
}) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 7, 5]} intensity={2.4} castShadow shadow-bias={-0.0001} />
      <pointLight position={[-4, 2, -2]} intensity={1.4} color="#ff5500" />
      <pointLight position={[3, -2, 2]} intensity={0.7} color="#f59e0b" />

      <Suspense
        fallback={
          <Html center>
            <LoadingFallback label="Loading Mew.glb" sublabel="Synchronizing scroll timeline" />
          </Html>
        }
      >
        <MewScrollModel storyProxy={storyProxy} isInteractive={isInteractive} />
        <Environment preset="studio" />
        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.32}
          scale={5.0}
          blur={2.4}
          far={3.8}
        />
      </Suspense>

      <OrbitControls
        ref={(el) => {
          if (el) {
            controlsRef.current = el;
            if (onControlsReady) onControlsReady(el);
          }
        }}
        makeDefault
        enabled={isInteractive}
        enablePan={false}
        enableZoom={isInteractive}
        minDistance={1.8}
        maxDistance={5.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
        dampingFactor={0.07}
        rotateSpeed={0.8}
      />
    </>
  );
};
