import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment, OrbitControls, Html } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js';
import type { ModelMetadata } from '../../types/index.ts';
import { LoadingFallback } from '../LoadingFallback.tsx';

interface MotionModelProps {
  model: ModelMetadata;
  isPlaying: boolean;
  speed: number;
  resetTrigger: number;
  onProgress?: (time: number, duration: number) => void;
}

function MotionModel({
  model,
  isPlaying,
  speed,
  resetTrigger,
  onProgress,
}: MotionModelProps) {
  const gltf = useGLTF(model.file);
  const modelGroupRef = useRef<THREE.Group>(null);

  const scene = useMemo(() => {
    const cloned = cloneSkeleton(gltf.scene);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());

    // Center model at origin
    cloned.position.sub(center);

    // Apply model-specific tailored scale
    if (model.id === 'grid') {
      cloned.scale.setScalar(0.18);
    } else {
      cloned.scale.setScalar(model.viewerScale || 1.3);
    }

    cloned.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    return cloned;
  }, [gltf.scene, model.id, model.viewerScale]);

  const { actions, names } = useAnimations(gltf.animations, scene);
  const activeActionName = model.animationName && actions[model.animationName]
    ? model.animationName
    : names[0];

  useEffect(() => {
    if (!activeActionName || !actions[activeActionName]) return;
    const action = actions[activeActionName]!;

    action.reset().fadeIn(0.2).play();
    action.timeScale = speed;
    action.paused = !isPlaying;

    return () => {
      action.stop();
    };
  }, [actions, activeActionName, resetTrigger]);

  useEffect(() => {
    if (!activeActionName || !actions[activeActionName]) return;
    const action = actions[activeActionName]!;
    action.paused = !isPlaying;
    action.timeScale = speed;
  }, [isPlaying, speed, actions, activeActionName]);

  useFrame(() => {
    if (!activeActionName || !actions[activeActionName] || !onProgress) return;
    const action = actions[activeActionName]!;
    const duration = action.getClip().duration;
    const currentTime = action.time % duration;
    onProgress(currentTime, duration);
  });

  return (
    <group ref={modelGroupRef}>
      <primitive object={scene} />
    </group>
  );
}

if (typeof window !== 'undefined') {
  const deferPreload = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 2500));
  deferPreload(() => {
    useGLTF.preload('/models/Robot.glb');
    useGLTF.preload('/models/Interactive%20Waving%20Neural%20Grid.glb');
  });
}

interface MotionSceneProps {
  model: ModelMetadata;
  isPlaying: boolean;
  speed: number;
  resetTrigger: number;
  onProgress?: (time: number, duration: number) => void;
  onControlsReady?: (controls: OrbitControlsImpl) => void;
}

export const MotionScene: React.FC<MotionSceneProps> = ({
  model,
  isPlaying,
  speed,
  resetTrigger,
  onProgress,
  onControlsReady,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      if (onControlsReady) {
        onControlsReady(controlsRef.current);
      }
    }
  }, [model.id, resetTrigger, onControlsReady]);

  const isGrid = model.id === 'grid';

  return (
    <>
      <ambientLight intensity={isGrid ? 1.6 : 1.3} />
      <directionalLight
        position={isGrid ? [0, 15, 10] : [4, 6, 5]}
        intensity={isGrid ? 2.8 : 2.2}
        castShadow
        shadow-bias={-0.0001}
      />
      <pointLight
        position={isGrid ? [0, 8, 0] : [-4, 2, -2]}
        intensity={isGrid ? 2.5 : 1.2}
        color={isGrid ? '#0891b2' : '#ea580c'}
      />
      <pointLight
        position={isGrid ? [10, -2, 10] : [3, -2, 2]}
        intensity={isGrid ? 1.2 : 0.6}
        color={isGrid ? '#06b6d4' : '#fbbf24'}
      />

      <Suspense
        fallback={
          <Html center>
            <LoadingFallback
              label={`Loading ${model.name}.glb`}
              sublabel={isGrid ? 'Initializing 540 kinematic nodes' : 'Rigging mechanical articulators'}
            />
          </Html>
        }
      >
        <MotionModel
          key={model.id}
          model={model}
          isPlaying={isPlaying}
          speed={speed}
          resetTrigger={resetTrigger}
          onProgress={onProgress}
        />
        <Environment preset={isGrid ? 'city' : 'studio'} />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={true}
        minDistance={isGrid ? 5.0 : 2.0}
        maxDistance={isGrid ? 35.0 : 7.0}
        dampingFactor={0.07}
        rotateSpeed={0.8}
      />
    </>
  );
};
