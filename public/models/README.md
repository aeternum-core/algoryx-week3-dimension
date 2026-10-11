# 3D Asset Slot: Algoryx Community Asset

This directory is the dedicated drop-in boundary for official Algoryx 3D models (`.glb` / `.gltf`).

## How to mount your model:
1. Copy your `.glb` model into this directory (e.g. `public/models/algoryx-asset.glb`).
2. Open `src/components/three/SceneCanvas.tsx` or pass the `modelUrl` prop to `SceneCanvas`:
   ```tsx
   <SceneCanvas modelUrl="/models/algoryx-asset.glb" />
   ```
3. The isolated `ModelBoundary.tsx` component automatically mounts the GLB asset using React Three Fiber / Drei `useGLTF`, retaining all existing lighting, materials, and orbit controls.
4. If no model is provided, or during network loading/parsing failure, it seamlessly falls back to the procedural Obsidian sculpture.
