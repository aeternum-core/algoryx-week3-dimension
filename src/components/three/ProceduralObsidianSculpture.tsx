import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { LabMaterialMode, LabMotionMode } from '../../types';

interface ProceduralObsidianSculptureProps {
  materialMode?: LabMaterialMode;
  motionMode?: LabMotionMode;
  wireframe?: boolean;
  exploded?: boolean;
  rotationSpeed?: number;
  autoRotate?: boolean;
  interactivePointer?: boolean;
}

export const ProceduralObsidianSculpture: React.FC<ProceduralObsidianSculptureProps> = ({
  materialMode = 'graphite',
  motionMode = 'inertia',
  wireframe = false,
  exploded = false,
  rotationSpeed = 1,
  autoRotate = true,
  interactivePointer = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const shardsGroupRef = useRef<THREE.Group>(null);

  // Materials tailored for light architectural space
  const { primaryMaterial, innerMaterial, ringMaterial, shardMaterial } = useMemo(() => {
    if (wireframe) {
      const cadWireMat = new THREE.MeshStandardMaterial({
        color: '#ff4800',
        wireframe: true,
        roughness: 0.3,
        metalness: 0.7,
      });
      const darkWireMat = new THREE.MeshStandardMaterial({
        color: '#1a1b1f',
        wireframe: true,
        roughness: 0.2,
      });
      return {
        primaryMaterial: cadWireMat,
        innerMaterial: darkWireMat,
        ringMaterial: darkWireMat,
        shardMaterial: cadWireMat,
      };
    }

    if (materialMode === 'ceramic') {
      const ceramicMat = new THREE.MeshPhysicalMaterial({
        color: '#f0ede6',
        roughness: 0.32,
        metalness: 0.08,
        clearcoat: 0.5,
        clearcoatRoughness: 0.15,
        reflectivity: 0.8,
      });
      const darkInner = new THREE.MeshStandardMaterial({
        color: '#1c1d22',
        roughness: 0.2,
        wireframe: true,
      });
      const graphiteRings = new THREE.MeshStandardMaterial({
        color: '#26282e',
        metalness: 0.85,
        roughness: 0.25,
      });
      return {
        primaryMaterial: ceramicMat,
        innerMaterial: darkInner,
        ringMaterial: graphiteRings,
        shardMaterial: ceramicMat,
      };
    }

    if (materialMode === 'titanium') {
      const titaniumMat = new THREE.MeshPhysicalMaterial({
        color: '#9ba0ab',
        metalness: 0.94,
        roughness: 0.18,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
      });
      const orangeAccent = new THREE.MeshStandardMaterial({
        color: '#ff4800',
        metalness: 0.5,
        roughness: 0.2,
        wireframe: true,
      });
      const ringMat = new THREE.MeshStandardMaterial({
        color: '#474b54',
        metalness: 0.9,
        roughness: 0.2,
      });
      return {
        primaryMaterial: titaniumMat,
        innerMaterial: orangeAccent,
        ringMaterial: ringMat,
        shardMaterial: titaniumMat,
      };
    }

    if (materialMode === 'vermilion') {
      const vermilionMat = new THREE.MeshPhysicalMaterial({
        color: '#ff4800',
        metalness: 0.65,
        roughness: 0.22,
        clearcoat: 0.95,
        clearcoatRoughness: 0.08,
        emissive: '#802400',
        emissiveIntensity: 0.12,
      });
      const darkInner = new THREE.MeshStandardMaterial({
        color: '#111215',
        metalness: 0.8,
        roughness: 0.3,
        wireframe: true,
      });
      const darkRings = new THREE.MeshStandardMaterial({
        color: '#2b2d33',
        metalness: 0.9,
        roughness: 0.2,
      });
      return {
        primaryMaterial: vermilionMat,
        innerMaterial: darkInner,
        ringMaterial: darkRings,
        shardMaterial: vermilionMat,
      };
    }

    // Default: 'graphite' (Deep milled graphite with crisp specular highlights)
    const graphiteMat = new THREE.MeshPhysicalMaterial({
      color: '#1c1d22',
      roughness: 0.22,
      metalness: 0.86,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      ior: 2.4,
    });

    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: '#ff4800',
      emissive: '#d63a00',
      emissiveIntensity: 0.3,
      wireframe: true,
    });

    const ringMat = new THREE.MeshStandardMaterial({
      color: '#383b42',
      metalness: 0.9,
      roughness: 0.22,
    });

    const shardMat = new THREE.MeshPhysicalMaterial({
      color: '#18191e',
      roughness: 0.2,
      metalness: 0.85,
    });

    return {
      primaryMaterial: graphiteMat,
      innerMaterial: innerCoreMat,
      ringMaterial: ringMat,
      shardMaterial: shardMat,
    };
  }, [materialMode, wireframe]);

  // Frame animation loop with motion modes
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const isStatic = motionMode === 'static';
    const isKinetic = motionMode === 'kinetic';

    const effectiveSpeed = isStatic ? 0 : autoRotate ? rotationSpeed : 0.04;

    if (groupRef.current) {
      if (!isStatic) {
        if (isKinetic) {
          // Harmonic kinetic oscillation
          groupRef.current.rotation.y = Math.sin(time * 0.4 * rotationSpeed) * 0.8;
          groupRef.current.rotation.x = Math.cos(time * 0.3 * rotationSpeed) * 0.2;
        } else {
          // Continuous axial inertia
          groupRef.current.rotation.y += delta * 0.25 * effectiveSpeed;
        }
      }

      // Pointer responsiveness with gentle lerp
      if (interactivePointer && !isStatic) {
        const targetX = state.pointer.y * 0.25;
        const targetZ = -state.pointer.x * 0.2;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZ, 0.05);
      }

      // Subtle breath/floating
      groupRef.current.position.y = Math.sin(time * 0.7) * 0.06;
    }

    // Counter-rotating inner nucleus
    if (innerRef.current && !isStatic) {
      innerRef.current.rotation.x -= delta * 0.35 * effectiveSpeed;
      innerRef.current.rotation.y -= delta * 0.25 * effectiveSpeed;
    }

    // Independent gyroscopic rings motion
    if (ring1Ref.current && !isStatic) {
      ring1Ref.current.rotation.x += delta * 0.12 * effectiveSpeed;
      ring1Ref.current.rotation.z += delta * 0.08 * effectiveSpeed;
      const targetScale = exploded ? 1.45 : 1.0;
      ring1Ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.06);
    }

    if (ring2Ref.current && !isStatic) {
      ring2Ref.current.rotation.y -= delta * 0.16 * effectiveSpeed;
      ring2Ref.current.rotation.x += delta * 0.10 * effectiveSpeed;
      const targetScale = exploded ? 1.6 : 1.0;
      ring2Ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.06);
    }

    // Orbiting satellite shards
    if (shardsGroupRef.current && !isStatic) {
      shardsGroupRef.current.rotation.y += delta * 0.25 * effectiveSpeed;
      const shardRadius = exploded ? 1.55 : 1.0;
      shardsGroupRef.current.scale.lerp(new THREE.Vector3(shardRadius, shardRadius, shardRadius), 0.05);
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Central Core: Complex Parametric Mobius / Torus Knot */}
      <mesh
        ref={coreRef}
        material={primaryMaterial}
        castShadow
        receiveShadow
      >
        <torusKnotGeometry args={[1.05, 0.36, 128, 36, 2, 3]} />
      </mesh>

      {/* Internal Crystalline Nucleus */}
      <mesh
        ref={innerRef}
        material={innerMaterial}
      >
        <icosahedronGeometry args={[0.55, 1]} />
      </mesh>

      {/* Gyroscopic Ring 1 */}
      <mesh
        ref={ring1Ref}
        rotation={[Math.PI / 3, 0, 0]}
        material={ringMaterial}
      >
        <torusGeometry args={[1.72, 0.012, 16, 96]} />
      </mesh>

      {/* Gyroscopic Ring 2 */}
      <mesh
        ref={ring2Ref}
        rotation={[-Math.PI / 4, Math.PI / 6, 0]}
        material={ringMaterial}
      >
        <torusGeometry args={[1.98, 0.010, 16, 96]} />
      </mesh>

      {/* Orbiting Satellite Shards */}
      <group ref={shardsGroupRef}>
        {[0, 1, 2, 3].map((index) => {
          const angle = (index * Math.PI) / 2;
          const radius = 2.15;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = index % 2 === 0 ? 0.35 : -0.35;

          return (
            <mesh
              key={index}
              position={[x, y, z]}
              rotation={[index, index * 0.5, 0]}
              material={shardMaterial}
            >
              <octahedronGeometry args={[0.12, 0]} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};
