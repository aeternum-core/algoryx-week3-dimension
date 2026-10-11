import type { DimensionFeature, NavItem, ProcessStage, SculptureStats, StudyTab } from '../types';

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'manifesto', label: 'Manifesto', code: '01', href: '#manifesto' },
  { id: 'explorer', label: 'Object Explorer', code: '02', href: '#explorer' },
  { id: 'dimensions', label: 'Dimensions', code: '03', href: '#dimensions' },
  { id: 'process', label: 'Process', code: '04', href: '#process' },
];

export const HERO_CONTENT = {
  eyebrow: 'OBSIDIAN / SPATIAL STUDY 001',
  headlineLine1: 'DESIGN',
  headlineLine2: 'IN ANOTHER',
  headlineLine3: 'DIMENSION.',
  supportingCopy: 'An interactive study of geometry, material and movement.',
  primaryCta: 'EXPLORE THE OBJECT',
  secondaryLabel: 'INTERACTIVE 3D STUDY — 001',
  annotations: [
    { label: 'OBJECT', value: '001' },
    { label: 'ROTATION', value: 'ENABLED' },
    { label: 'MATERIAL', value: 'GRAPHITE' },
    { label: 'VIEW', value: 'INTERACTIVE' },
  ],
};

export const MANIFESTO_CONTENT = {
  sectionIndex: '01',
  sectionLabel: 'SPATIAL THESIS',
  headline: 'SHAPE IS A DECISION.',
  supportingCopy:
    'Every curve, surface and proportion changes the way an object is experienced.',
  extendedCopy:
    'In digital space, form is often treated as decorative skin. In the Spatial Laboratory, we approach geometry with the rigor of physical fabrication: calculating tension, mass, surface reflectance, and inertial resistance to create an object that demands deliberate attention.',
  stats: [
    { metric: '0.045 s⁻¹', label: 'Damping Friction' },
    { metric: 'G2', label: 'Tangent Continuity' },
    { metric: '360°', label: 'Orbital Freedom' },
  ],
};

export const STUDY_TAB_CONTENT: Record<
  StudyTab,
  {
    title: string;
    subtitle: string;
    summary: string;
    specs: { label: string; value: string }[];
    hint: string;
  }
> = {
  FORM: {
    title: 'Topological Silhouette',
    subtitle: 'Parametric Curvature & Non-Euclidean Framing',
    summary:
      'The central core is derived from a twisting parametric Mobius-Torus knot, bound by dual orthogonal orbital gyroscopic rings. Every edge maintains continuous tangent curvature across dynamic lighting angles.',
    specs: [
      { label: 'Topology', value: 'Mobius-Torus Knot' },
      { label: 'Curvature Class', value: 'G2 Continuous' },
      { label: 'Orbital Envelope', value: 'Dual Nested Gyro' },
      { label: 'Subdivisions', value: '128 × 36 Facets' },
    ],
    hint: 'Toggle Exploded Geometry to inspect internal crystalline geometry.',
  },
  MATERIAL: {
    title: 'Mineral & Metallic Substrates',
    subtitle: 'Physical PBR Microfacet Calculations',
    summary:
      'Milled graphite mineral substrate with fine anisotropic grain. Switch between raw high-density graphite, engineered bone ceramic, aerospace brushed titanium, or anodized vermilion.',
    specs: [
      { label: 'Substrate', value: 'High-Density Graphite' },
      { label: 'Clearcoat Layer', value: '1.0 Index / 0.08 Roughness' },
      { label: 'Reflectance IOR', value: '2.42 Microfacet' },
      { label: 'Specular Angle', value: 'Grazing High-Contrast' },
    ],
    hint: 'Select material chips below to dynamically update the 3D surface finish.',
  },
  MOTION: {
    title: 'Axial Kinematics',
    subtitle: 'Momentum Dissipation & Drag Coupling',
    summary:
      'Interaction is grounded in physical mass. Dragging imparts rotational velocity that decays smoothly through calibrated angular damping, while pointer coordinates drive subtle gyroscopic tilt without hijacking page scroll.',
    specs: [
      { label: 'Damping Factor', value: '0.045 s⁻¹ Glide' },
      { label: 'Lerp Coupling', value: '0.05 Gyroscopic' },
      { label: 'Frame Target', value: '60 / 120 FPS Locked' },
      { label: 'Scroll Hijack', value: 'Completely Isolated' },
    ],
    hint: 'Adjust angular velocity or switch motion behavior to test spatial response.',
  },
};

export const DIMENSIONS_DATA: DimensionFeature[] = [
  {
    index: '01',
    title: 'FORM',
    subtitle: 'Silhouette, Topological Tension & Proportion',
    description:
      'A sculpture must hold presence in every orientation. The form twists through 3D coordinates so no single vantage point reveals the entire geometry at once—inviting continuous tactile rotation.',
    parameters: [
      { key: 'Geometry', val: 'Parametric Knot M-01' },
      { key: 'Symmetry', val: 'Axially Offset' },
      { key: 'Bounding Box', val: '2.4 × 2.4 × 2.4 m' },
    ],
    tag: 'Topological Investigation',
  },
  {
    index: '02',
    title: 'MATERIAL',
    subtitle: 'Physical Texture, Micro-Roughness & Reflection',
    description:
      'Light does not merely illuminate; it interrogates the surface. Deep mineral absorption produces razor-sharp grazing highlights against matte stone backgrounds, expressing weight and digital density.',
    parameters: [
      { key: 'PBR Model', val: 'Cook-Torrance Microfacet' },
      { key: 'Absorption', val: 'Deep Graphite (94.2%)' },
      { key: 'Specular', val: 'Anodized Vermilion Sheen' },
    ],
    tag: 'Material Exploration',
  },
  {
    index: '03',
    title: 'MOTION',
    subtitle: 'Kinematics, Axial Momentum & Spatial Perception',
    description:
      'Movement creates spatial understanding. By giving the digital object mass and inertial resistance, the user develops a sensory model of its 3D volume that static imagery can never replicate.',
    parameters: [
      { key: 'Kinematic Lerp', val: 'Dual-Axis Gyroscopic' },
      { key: 'Momentum Decay', val: '0.045 s⁻¹ Exponential' },
      { key: 'Touch Axis', val: 'Pan-Y Pass-through' },
    ],
    tag: 'Inertial Behavior',
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'OBSERVE',
    label: 'Spatial Inquiry',
    description:
      'Define coordinate envelopes and study physical stone and mineral references to uncover natural geometric tension and silhouette weight.',
    code: 'STG_01 // INQUIRY',
  },
  {
    step: '02',
    title: 'SHAPE',
    label: 'Parametric Modeling',
    description:
      'Compose procedural spline algorithms in Three.js, tuning continuous curvature, inner nucleus placement, and gyroscopic orbital rings.',
    code: 'STG_02 // COMPOSITION',
  },
  {
    step: '03',
    title: 'INTERACT',
    label: 'Kinematic Calibration',
    description:
      'Couple touch and cursor coordinates with calibrated inertial damping, ensuring the 3D object responds fluidly without impeding normal document scroll.',
    code: 'STG_03 // KINEMATICS',
  },
  {
    step: '04',
    title: 'REFINE',
    label: 'Material Calibration',
    description:
      'Balance Cook-Torrance shaders, directional sunlight, and contact shadows against light stone backgrounds for clear editorial readability.',
    code: 'STG_04 // SYNTHESIS',
  },
];

export const INITIAL_SCULPTURE_STATS: SculptureStats = {
  objectId: 'OBS-001',
  geometryName: 'Parametric Dual-Torus M3',
  polyCount: 48920,
  subdivisions: 128,
  materialDensity: '2.84 g/cm³ (Graphite Comp)',
  refractiveIndex: 2.417,
  specularSheen: 'Microfacet Cook-Torrance',
  assetSource: 'Procedural Spatial Laboratory Core',
  status: 'Procedural Lab Core',
};
