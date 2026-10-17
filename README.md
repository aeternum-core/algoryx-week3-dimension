# DIMENSION — Interactive 3D Playground

A responsive, interactive 3D web experience exploring character, form, and motion. Created as a Week 3 UI/UX internship task, using four supplied Algoryx Community GLB assets.

## Included models

- `Mew.glb` — hero and character explorer
- `Robot.glb` — character explorer and animation study
- `Iron Man.glb` — character explorer
- `Interactive Waving Neural Grid.glb` — motion study and explorer

The project attempts to play the embedded `RobotBehaviorAnim` and `NeuralGridWaveAnim` animations when available. Exact model appearance, scale, and animation compatibility should be verified in the target browser.

## Tech stack

React, TypeScript, Vite, Three.js, React Three Fiber, React Three Drei, Framer Motion, Lucide React.

## Run locally

Requires Node.js 20 or later recommended.

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
public/models/   Supplied GLB assets
src/App.tsx      Page layout and interactive viewers
src/styles.css   Responsive design system
```

## Asset attribution

The 3D assets were supplied by the user from the Algoryx Community. Please follow the asset provider's license and attribution requirements. This project does not imply official sponsorship or endorsement by Algoryx.

## Deployment

Deploy this folder as a new Vite project on Vercel. Build command: `npm run build`. Output directory: `dist`.
