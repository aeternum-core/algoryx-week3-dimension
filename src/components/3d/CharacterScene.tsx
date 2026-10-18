import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { useGLTF, useAnimations, Environment, ContactShadows, OrbitControls, Html } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js';
import type { ModelMetadata } from '../../types/index.ts';
import { LoadingFallback } from '../LoadingFallback.tsx';

interface CharacterModelProps {
  model: ModelMetadata;
  isPlaying?: boolean;
}

function CharacterModel({ model, isPlaying = true }: CharacterModelProps) {
  const gltf = useGLTF(model.file);
  const modelGroupRef = useRef<THREE.Group>(null);

  const scene = useMemo(() => {
    const cloned = cloneSkeleton(gltf.scene);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;

    cloned.position.sub(center);
    const targetScale = model.viewerScale ? model.viewerScale : 2.0 / maxDim;
    cloned.scale.setScalar(targetScale);

    cloned.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    return cloned;
  }, [gltf.scene, model.viewerScale]);

  const { actions, names } = useAnimations(gltf.animations, scene);

  useEffect(() => {
    if (!model.hasAnimation || names.length === 0) return;

    const animName = model.animationName && actions[model.animationName]
      ? model.animationName
      : names[0];

    const action = actions[animName];
    if (!action) return;

    if (isPlaying) {
      action.reset().fadeIn(0.2).play();
    } else {
      action.paused = true;
    }

    return () => {
      action.stop();
    };
  }, [actions, names, model.hasAnimation, model.animationName, isPlaying]);

  return (
    <group ref={modelGroupRef}>
      <primitive object={scene} />
    </group>
  );
}

// Preload character models for instant switching
useGLTF.preload('/models/Mew.glb');
useGLTF.preload('/models/Robot.glb');
useGLTF.preload('/models/Iron%20Man.glb');

interface CharacterSceneProps {
  model: ModelMetadata;
  resetTrigger: number;
  isPlaying?: boolean;
  onControlsReady?: (controls: OrbitControlsImpl) => void;
}

export const CharacterScene: React.FC<CharacterSceneProps> = ({
  model,
  resetTrigger,
  isPlaying = true,
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

  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 7, 5]} intensity={2.4} castShadow shadow-bias={-0.0001} />
      <directionalLight position={[-4, 3, -3]} intensity={0.9} color="#ffffff" />
      <pointLight position={[-4, 2, -2]} intensity={1.2} color={model.accent} />
      <pointLight position={[3, -2, 2]} intensity={0.7} color={model.secondaryAccent || '#ffffff'} />

      <Suspense
        fallback={
          <Html center>
            <LoadingFallback label={`Loading ${model.name}.glb`} sublabel="Configuring geometry" />
          </Html>
        }
      >
        <CharacterModel key={model.id} model={model} isPlaying={isPlaying} />
        <Environment preset="studio" />
        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.32}
          scale={5.5}
          blur={2.4}
          far={4.0}
        />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={false}
        minDistance={model.cameraPreset.minDistance}
        maxDistance={model.cameraPreset.maxDistance}
        dampingFactor={0.07}
        rotateSpeed={0.85}
      />
    </>
  );
};
