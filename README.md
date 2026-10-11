# OBSIDIAN — SPATIAL DESIGN LABORATORY
### Algoryx UI/UX Design Internship — Week 3: Interactive 3D Web Experience

> **An experimental interactive spatial design laboratory exploring geometry, mineral materials, motion, and spatial interaction.**

---

## 1. Project Concept & Visual Redesign

**OBSIDIAN** has been completely redesigned away from generic dark futuristic art-studio tropes into an experimental **interactive spatial design laboratory**: a digital environment where geometry, materials, kinematics, and spatial interaction are examined with architectural and industrial design rigor.

### Spatial Lab Visual Identity
- **Predominantly Light Interface:** Warm mineral stone and pale bone canvas (`#f6f5f1`, `#faf9f6`, `#eeece5`).
- **Typography:** High-contrast charcoal headings (`#111215`), contemporary sans-serif body copy, and monospaced technical metadata (`Space Grotesk`).
- **Interaction Accents:** Electric orange / vermilion (`#ff4800`) purposefully applied to focus states, active tabs, and primary controls.
- **Secondary Tones:** Muted olive green (`#4e6150`) for technical validation badges and graphite (`#1c1d22`, `#2b2d33`) for structural geometry.
- **Graphic Language:** Fine architectural measurement lines, corner crosshairs (`+`), coordinate tracking labels, and clean hairline borders.

---

## 2. Page Architecture

### Section 01 — Hero / Spatial Introduction
- **Eyebrow:** `OBSIDIAN / SPATIAL STUDY 001`
- **Headline:**
  ```
  DESIGN
  IN ANOTHER
  DIMENSION.
  ```
- **Supporting Copy:** *"An interactive study of geometry, material and movement."*
- **Primary CTA:** `EXPLORE THE OBJECT` (smoothly triggers scroll to Object Explorer).
- **Secondary Label:** `INTERACTIVE 3D STUDY — 001`.
- **Centerpiece 3D Canvas:** Real-time parametric sculpture with graphite materials, directional studio sunlight, corner crosshairs, and live coordinate annotations (`OBJECT / 001`, `ROTATION / ENABLED`, `MATERIAL / GRAPHITE`, `VIEW / INTERACTIVE`).
- **Scroll Usability:** Wheel zoom disabled on Hero to preserve natural page scrolling.

### Section 02 — Design Manifesto
- **Headline:** `SHAPE IS A DECISION.`
- **Supporting Message:** *"Every curve, surface and proportion changes the way an object is experienced."*
- **Composition:** Asymmetric editorial columns featuring a spatial fabrication thesis, measured friction stats, and technical design axioms (*Axiom 01: Mass & Momentum*, *Axiom 02: Specular Clarity*).

### Section 03 — Object Explorer (Primary 3D Workspace)
- **Visual Dominance:** Large 360° interactive 3D viewport with drag orbit, touch gestures, and clamped zoom bounds.
- **Interactive Information & Control Panel:**
  - **`FORM` Tab:** Details continuous topological curvature ($G^2$ continuity) and dual gyroscopic rings; provides **Exploded View** and **CAD Wireframe** toggles.
  - **`MATERIAL` Tab:** Details Cook-Torrance PBR microfacets; provides live substrate switchers (**Graphite**, **Bone Ceramic**, **Brushed Titanium**, **Anodized Vermilion**).
  - **`MOTION` Tab:** Details inertial damping and momentum dissipation; provides kinematic modes (**Axial Inertia**, **Harmonic Kinetic**, **Static Coordinate Lock**) and variable velocity slider ($0.2\times$ to $2.5\times$).
- **Toolbar Actions:** `HERO` (Return to Hero), `RESET` (Reset Orientation), and `FULLSCREEN` viewport toggle.

### Section 04 — Three Dimensions
- **01 / FORM:** Wide architectural layout detailing tangent continuity and non-Euclidean parametric topology.
- **02 / MATERIAL:** Asymmetric swatch comparison examining mineral absorption (94.2%) and grazing angle specular response.
- **03 / MOTION:** Kinematic damping diagram illustrating the $0.045\,\text{s}^{-1}$ momentum dissipation curve and zero-scroll-lock touch isolation.

### Section 05 — Process / Spatial Thinking
- **Four-Stage Sequence:** `OBSERVE` → `SHAPE` → `INTERACT` → `REFINE`.
- Connected editorial timeline showcasing the progression from raw spatial inquiry to production WebGL synthesis.

### Section 06 — Final Experience
- **Headline:** `THERE IS MORE TO EXPLORE.`
- Functional call to action returning the visitor to the Object Explorer or top of page.

### Section 07 — Footer
- OBSIDIAN identity and `FORM IN ANOTHER DIMENSION` descriptor.
- Verified section index, engineering baseline summary, and Algoryx UI/UX Design Internship attribution.

---

## 3. Technology Stack

- **Framework:** React 19 + TypeScript (Strict typing enabled)
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) with custom CSS theme tokens
- **3D Graphics:** Three.js + `@react-three/fiber` (R3F) + `@react-three/drei`
- **Animation:** Framer Motion
- **Icons:** Lucide React

---

## 4. 3D Scene Architecture & Asset Transparency

### Current Asset Status
> **Honest Asset Disclosure:** In accordance with the assignment guidelines, an official 3D model from the Algoryx Community has not yet been received. The experience currently renders an **original procedural Three.js sculpture** (`ProceduralObsidianSculpture.tsx`) featuring a parametric Mobius-Torus knot, gyroscopic orbital rings, and dynamic PBR materials. It is **not** claimed to be an official Algoryx asset.

### Replaceable Asset Boundary
The 3D loading architecture is completely decoupled from the UI and lighting in [ModelBoundary.tsx](file:///c:/Users/Likith%20V%20Gowda/Desktop/Algoryx-Internship/WEEK-03-/obsidian/src/components/three/ModelBoundary.tsx):
1. Place the official `.glb` or `.gltf` asset in `public/models/algoryx-asset.glb`.
2. Supply `modelUrl="/models/algoryx-asset.glb"` to `<SceneCanvas />`.
3. `ModelBoundary.tsx` mounts the model with automatic error boundary fallbacks and zero page layout refactoring required.

---

## 5. How to Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Server runs on [http://localhost:5173/](http://localhost:5173/).

3. **Verify production build:**
   ```bash
   npm run build
   ```
   *Verified: compiled with 0 errors (`tsc -b && vite build`).*

---

## 6. Project Attribution & Repository

- **Creator:** Likith V Gowda
- **Program:** Algoryx UI/UX Design Internship — Week 3
- **Repository:** [https://github.com/aeternum-core/algoryx-week3-obsidian](https://github.com/aeternum-core/algoryx-week3-obsidian)
- **Status:** Complete, responsive, verified production build.
