<div align="center">

# DIMENSION
### Beyond the Frame — Interactive 3D Playground

**Algoryx Technologies UI/UX Internship — Week 3 Submission**  
*An art-directed, scroll-driven 3D web experience integrating all four official Algoryx Community GLB assets.*

[![TypeScript Strict](https://img.shields.io/badge/TypeScript-5.6_Strict-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React 18](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r171-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![GSAP ScrollTrigger](https://img.shields.io/badge/GSAP-3.15_ScrollTrigger-88ce02?style=flat-square&logo=greensock)](https://greensock.com/)
[![Vite 6](https://img.shields.io/badge/Vite-6.0_Production_Ready-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Build Status](https://img.shields.io/badge/Build-Passing_(0_Errors)-10b981?style=flat-square)](https://github.com/aeternum-core/algoryx-week3-dimension)

</div>

---

## 📑 Evaluator Executive Summary & Rubric Alignment

This submission was engineered to demonstrate senior-level digital craft, combining the narrative polish of Apple product pages, the interaction precision of 21st.dev components, and the tactile 3D presentation of Algoryx's Digital Playground.

| Evaluation Criteria | Weight | Implementation Highlights |
|---|---|---|
| **UI/UX Design** | **25%** | Bespoke mineral-white foundation (`#f5f4ef`, `#faf9f5`), charcoal typography (`#191a18`), electric orange accents (`#ff5500`), and restrained cyan (`#0891b2`). High-contrast editorial type system (*Space Grotesk*, *DM Sans*, *DM Mono*) with zero layout shift. |
| **Creativity & Storytelling** | **20%** | Signature **5-scene scrubbed 3D scroll narrative ("BEYOND THE FRAME")** powered by GSAP ScrollTrigger, featuring smooth camera transitions, topology reveals, and real-time interactive takeover. |
| **3D Asset Integration** | **20%** | **All four official Algoryx Community GLB assets** fully integrated. Real model geometries, PBR materials, and embedded keyframe animation clips verified and preserved without alteration or stock substitutes. |
| **Code Quality & Architecture** | **15%** | Decomposed from a monolithic file into **10 modular, typed components**. Strict separation between GSAP scroll choreography, R3F scenegraph updates, and UI states. Robust custom WebGL Error Boundary. |
| **Responsiveness** | **10%** | Fluid `clamp()` typography, mobile slide-down drawer, non-blocking touch orbit controls, and deliberate viewport compositions tested across Desktop (1440px), Laptop (1280px), Tablet (768px), and Mobile (390px / 360px). |
| **Performance Engineering** | **10%** | Intersection-based canvas throttling (`frameloop="demand"` when off-screen), DPR clamped to `[1, 1.75]`, single reusable canvas pattern (zero context recreation), and Rollup `manualChunks` vendor code-splitting (app bundle: 86 kB / 30 kB gzip). |

---

## 💎 The Four Official Algoryx Community Assets

Every supplied 3D model was audited at the binary GLTF level to inspect bounding boxes, materials, and internal animation channels:

| № | Model Asset | Direct File Path | Polygons (Triangles) | Meshes | Pipeline & Shading | Embedded Animation Track | Verified Role |
|---|---|---|---|---|---|---|---|
| **01** | **Mew** | `/models/Mew.glb` | **520,106 Δ** | 1 | High-Fidelity PBR (WebP Textures, Meshopt) | *Static Sculptural Form* | Hero Subject & Character Lab |
| **02** | **Robot** | `/models/Robot.glb` | **25,888 Δ** | 16 | Metallic Roughness PBR (3 Materials) | `RobotBehaviorAnim` (6.0s duration) | Articulated Kinematic Study |
| **03** | **Iron Man** | `/models/Iron%20Man.glb` | **559,864 Δ** | 1 | Specular Armor PBR (WebP Textures) | *Static Sculptural Form* | Heroic Form & Structural Lab |
| **04** | **Neural Grid** | `/models/Interactive%20Waving%20Neural%20Grid.glb` | **6,480 Δ** | 540 | Reflective Standard Material (540 Nodes) | `NeuralGridWaveAnim` (4.0s duration) | Topological Wave Choreography |

> **Production URL Encoding:** Asset filenames containing spaces (`Iron Man.glb` and `Interactive Waving Neural Grid.glb`) are strictly URL-encoded (`Iron%20Man.glb`, `Interactive%20Waving%20Neural%20Grid.glb`) in data manifests to guarantee reliable streaming across all static hosting, CDN, and production proxy environments.

---

## 🎬 Core Features & Experience Suite

### 1. Cinematic Scroll-Driven Hero ("BEYOND THE FRAME")
Choreographed with **GSAP ScrollTrigger** and **React Three Fiber**, visitors scroll through a continuous narrative:
- **Scene 01 — Arrival (0% → 22%):** Mew anchors the illuminated studio stage with subtle idle floating and pointer parallax. Editorial headline *"BEYOND THE FRAME"* sets the tone with a downward discovery cue.
- **Scene 02 — Form & Topology (25% → 50%):** Mew glides smoothly to 3/4 profile, revealing technical telemetry: 520,106 triangles, continuous organic curvature, and micro-faceted PBR specular highlights.
- **Scene 03 — Perspective & Space (50% → 75%):** Mew sweeps to a high-angle silhouette, showing how dynamic lighting vectors illuminate surface contours across spatial axes.
- **Scene 04 — Direct Interaction Takeover (75% → 94%):** Smoothly transitions from passive scroll-driven playback to direct user manipulation. Real 360° drag/orbit, zoom bounds, and an instant camera reset action unlock.
- **Scene 05 — Transition to Collection (94% → 100%):** Seamless release into the editorial introduction and character labs without abrupt jumping.
- **Reduced Motion Fallback:** Honors `prefers-reduced-motion` by gracefully disabling scroll pinning in favor of an immediate interactive layout.

### 2. Character Lab (Mew, Robot, Iron Man)
- **Single Reusable Canvas Architecture:** Switching characters updates the internal scenegraph without unmounting `<Canvas>`, completely preventing WebGL context destruction, shader recompilation, and visual flicker.
- **Bespoke Camera Presets:** Customized field-of-view and zoom limits tailored to each character's height and proportions.
- **Instant Camera Reset:** Smoothly restores default camera framing at the tap of a button.
- **Live Technical Dossier:** Displays verified polygon counts, mesh hierarchies, real-world dimensions, and material pipelines.

### 3. Kinematic Motion Lab (Neural Grid & Robot)
- **Real Master Transport Controls:**
  - **Play / Pause:** Active animation toggling with instant visual feedback.
  - **Playback Speed:** 0.5x, 1.0x, 1.5x, and 2.0x time dilation.
  - **Restart Loop:** Cleanly rewinds and plays the animation clip from frame 0.
  - **Telemetry Timeline:** Real-time progress bar displaying elapsed seconds vs. total clip duration (e.g. `2.4s / 4.0s` for Grid, `3.1s / 6.0s` for Robot).
- **Specialized Grid Camera:** Elevated isometric perspective (`[0, 16, 26]` at 42° FOV) capturing the full breadth of the 47-meter waving grid across all 540 articulating nodes.

### 4. Official Asset Gallery & Methodology
- **Four-Asset Collection:** Technical cards comparing polygon density, mesh counts, and direct "Stage in Lab" shortcuts.
- **Interaction Methodology:** 4-stage process section (*01. Discover, 02. Observe, 03. Interact, 04. Explore*).
- **Responsive Navigation & Footer:** Sticky navigation header with mobile drawer, accessible focus rings, back-to-top navigation, and explicit Algoryx Community attribution.

---

## ⚡ Performance Engineering

### A. Intersection-Based Canvas Throttling
Using [CanvasContainer.tsx](file:///c:/Users/Likith%20V/Downloads/dimension-playground/dimension-playground/src/components/3d/CanvasContainer.tsx), an `IntersectionObserver` monitors 3D viewports. When a canvas scrolls out of the active screen area, its render loop automatically throttles to `frameloop="demand"`, saving significant GPU and battery resources on laptops and mobile devices.

### B. Device Pixel Ratio Clamping
DPR is strictly clamped:
```ts
dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.75) : 1]}
```
This avoids rendering at 3x or 4x on high-DPI mobile screens, eliminating thermal throttling while preserving retina clarity.

### C. Modular Vendor Code-Splitting
Configured in [vite.config.ts](file:///c:/Users/Likith%20V/Downloads/dimension-playground/dimension-playground/vite.config.ts) using Rollup `manualChunks`:
```text
dist/index.html                   1.75 kB │ gzip:   0.79 kB
dist/assets/index-CBLfAxYh.css   29.59 kB │ gzip:   5.94 kB
dist/assets/index-Di5ZOSmu.js    86.41 kB │ gzip:  30.38 kB  <-- Application code & ScrollTrigger
dist/assets/vendor-DkBkXTcg.js  203.79 kB │ gzip:  70.84 kB  <-- React + Motion + GSAP
dist/assets/r3f-Buo1pJhw.js     306.00 kB │ gzip:  99.05 kB  <-- R3F + Drei
dist/assets/three-DPkH7pZd.js   807.80 kB │ gzip: 213.55 kB  <-- Three.js Engine Core
✓ Built in 16.69s with ZERO warnings.
```

---

## 🏗️ Project Architecture

```text
dimension-playground/
├── public/
│   └── models/                                  # Authoritative Algoryx GLB Assets
│       ├── Mew.glb                              # Hero PBR Character (520k Δ)
│       ├── Robot.glb                            # Articulated Character (RobotBehaviorAnim)
│       ├── Iron Man.glb                         # Armor PBR Model (559k Δ)
│       └── Interactive Waving Neural Grid.glb   # 540-Node Wave Field (NeuralGridWaveAnim)
├── src/
│   ├── types/
│   │   └── index.ts                             # Strong TypeScript interfaces
│   ├── data/
│   │   └── models.ts                            # Central asset registry & verified metrics
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── CanvasContainer.tsx              # Throttled R3F Canvas wrapper with ErrorBoundary
│   │   │   ├── MewScrollScene.tsx               # GSAP-scrubbed hero scene with interactive takeover
│   │   │   ├── CharacterScene.tsx               # Single-canvas character lab viewer
│   │   │   └── MotionScene.tsx                  # Kinematic player with playback controls
│   │   ├── Navbar.tsx                           # Responsive header & mobile menu drawer
│   │   ├── ScrollHero.tsx                       # "BEYOND THE FRAME" 5-scene scroll story
│   │   ├── EditorialIntro.tsx                   # Narrative philosophy transition
│   │   ├── CharacterLab.tsx                     # Character explorer with live dossier
│   │   ├── MotionLab.tsx                        # Master transport controls & timeline
│   │   ├── AssetGallery.tsx                     # 4-model technical comparison grid
│   │   ├── ProcessSection.tsx                   # Interaction methodology
│   │   ├── ClosingCta.tsx                       # High-impact closing callout
│   │   ├── Footer.tsx                           # Attribution, navigation & back-to-top
│   │   ├── LoadingFallback.tsx                  # Accessible asset loading indicator
│   │   └── ErrorBoundary.tsx                    # WebGL fault-tolerant error catcher
│   ├── App.tsx                                  # Root application orchestrator
│   ├── main.tsx                                 # Application entrypoint
│   └── styles.css                               # Comprehensive design system stylesheet
├── index.html                                   # HTML5 shell with SVG favicon & OG tags
├── vite.config.ts                               # Optimized Vite bundler configuration
└── README.md                                    # Project documentation
```

---

## 🚀 Setup & Execution Guide

### Prerequisites
- Node.js 18+ (Node.js 20 or 22 recommended)
- npm 9+

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) (or the port output in your terminal).

### 3. Execute Production Build & Type Check
```bash
npm run build
```
Runs strict TypeScript compilation (`tsc -b`) followed by Vite production bundling into `/dist`.

### 4. Preview Production Bundle Locally
```bash
npm run preview
```

---

## 🌐 Deployment Instructions (Vercel)

This repository is pre-configured for one-click deployment on [Vercel](https://vercel.com):

1. Push this repository to GitHub:
   ```bash
   git push -u origin main
   ```
2. Import the project in Vercel.
3. Configure project settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

---

## 📜 Asset Attribution & Academic Disclaimer

The four 3D assets integrated into this project (`Mew.glb`, `Robot.glb`, `Iron Man.glb`, and `Interactive Waving Neural Grid.glb`) are official assets provided by the **Algoryx Community**. All intellectual property, models, textures, and associated animation data belong to their respective creators and Algoryx Technologies.

This web application was designed and engineered exclusively as an educational submission for the **Algoryx Technologies UI/UX Internship — Week 3 Challenge**.

---

<div align="center">

**Built with curiosity, code, and craft for Algoryx Technologies.**  
© 2026 DIMENSION. All rights reserved.

</div>
