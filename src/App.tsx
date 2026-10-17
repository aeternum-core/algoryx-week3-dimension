import { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Html, OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Box, CirclePlay, RotateCcw, Sparkles, Waves, Menu, X } from 'lucide-react';
import * as THREE from 'three';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js';

type Asset = { id: string; name: string; category: string; file: string; number: string; description: string; accent: string; animation?: string };
const assets: Asset[] = [
  { id: 'mew', name: 'Mew', category: 'Character / 01', file: '/models/Mew.glb', number: '01', description: 'A curious form suspended between play and possibility.', accent: '#f1a7c5' },
  { id: 'robot', name: 'Robot', category: 'Character / 02', file: '/models/Robot.glb', number: '02', description: 'A mechanical companion brought to life through motion.', accent: '#e5a04b', animation: 'RobotBehaviorAnim' },
  { id: 'ironman', name: 'Iron Man', category: 'Character / 03', file: '/models/Iron Man.glb', number: '03', description: 'A study in engineered form, layered surfaces and silhouette.', accent: '#c94b3d' },
  { id: 'grid', name: 'Neural Grid', category: 'Motion study / 04', file: '/models/Interactive Waving Neural Grid.glb', number: '04', description: 'A moving field of connected points, waves and spatial rhythm.', accent: '#65bfc4', animation: 'NeuralGridWaveAnim' },
];

function Model({ asset, playing }: { asset: Asset; playing: boolean }) {
  const gltf = useGLTF(asset.file);
  const scene = useMemo(() => {
    const cloned = cloneSkeleton(gltf.scene);
    const bounds = new THREE.Box3().setFromObject(cloned);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    cloned.position.sub(center);
    cloned.scale.setScalar(2.6 / maxDimension);
    cloned.traverse((obj) => {
      if (obj instanceof THREE.Mesh) { obj.castShadow = true; obj.receiveShadow = true; }
    });
    return cloned;
  }, [gltf.scene]);
  const { actions, names } = useAnimations(gltf.animations, scene);
  useEffect(() => {
    const available = asset.animation && names.length ? (actions[asset.animation] ? asset.animation : names[0]) : undefined;
    if (!available || !actions[available]) return;
    if (playing) actions[available]!.reset().fadeIn(0.25).play();
    else actions[available]!.stop();
    return () => { actions[available]?.fadeOut(0.15); };
  }, [actions, names, asset.animation, playing]);
  return <primitive object={scene} />;
}

function Viewer({ asset, playing, resetKey, hero = false }: { asset: Asset; playing: boolean; resetKey: number; hero?: boolean }) {
  return <Canvas key={`${asset.id}-${resetKey}`} shadows dpr={[1, 1.6]} camera={{ position: [0, 0, hero ? 5.2 : 4.6], fov: 36 }} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={1.5} /><directionalLight position={[4, 6, 5]} intensity={2.2} castShadow /><pointLight position={[-4, 1, -2]} intensity={1.1} color={asset.accent} />
    <Suspense fallback={<Html center><span className="load-label">Loading model…</span></Html>}>
      <group scale={hero ? 1.3 : 1.05}><Model asset={asset} playing={playing} /></group>
      <Environment preset="studio" />
      <ContactShadows position={[0, -1.2, 0]} opacity={0.24} scale={5} blur={2.5} far={4} />
    </Suspense>
    <OrbitControls makeDefault enablePan={false} minDistance={2} maxDistance={8} autoRotate={hero && !playing} autoRotateSpeed={0.55} />
  </Canvas>;
}

function App() {
  const [selected, setSelected] = useState(assets[0]);
  const [playing, setPlaying] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = window.setTimeout(() => setLoaded(true), 300); return () => window.clearTimeout(t); }, []);
  const choose = (asset: Asset) => { setSelected(asset); setPlaying(true); setResetKey(v => v + 1); document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' }); };
  return <div className="site-shell">
    <header className="nav"><a className="brand" href="#top"><span className="brand-mark">D</span> DIMENSION<span className="brand-dot">.</span></a><nav className={menuOpen ? 'nav-links open' : 'nav-links'}><a onClick={() => setMenuOpen(false)} href="#explorer">Explore</a><a onClick={() => setMenuOpen(false)} href="#characters">Character lab</a><a onClick={() => setMenuOpen(false)} href="#motion">Motion lab</a><a onClick={() => setMenuOpen(false)} href="#about">About</a></nav><a className="nav-cta" href="#explorer">Enter playground <ArrowUpRight size={15}/></a><button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X/> : <Menu/>}</button></header>
    <main id="top">
      <section className="hero section-wrap"><div className="hero-copy"><motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow"><span className="live-dot"/> INTERACTIVE 3D PLAYGROUND <span className="eyebrow-line"/></motion.p><motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}>ENTER ANOTHER <span>DIMENSION.</span></motion.h1><motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .25 }}>Four models. Infinite perspectives. A playground for character, form and motion.</motion.p><motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35 }}><a className="button button-dark" href="#explorer">Explore the models <ArrowRight size={16}/></a><a className="text-link" href="#about">Discover the idea <ArrowDown size={15}/></a></motion.div><div className="hero-index"><span>01 / 04</span><span>ROTATE · EXPLORE · DISCOVER</span></div></div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }}><div className="visual-grid"/><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="visual-label label-top">OBJECT STUDY <b>№ 001</b></div><div className="hero-canvas"><Viewer asset={assets[0]} playing={playing} resetKey={0} hero/></div><div className="visual-label label-bottom"><span className="tiny-square"/> MEW / FORM IN SPACE</div><div className="vertical-note">DRAG TO ROTATE <span>↗</span></div></motion.div>
      </section>
      <section className="ticker" aria-label="Experience themes"><div>FORM <span>✳</span> MOTION <span>✳</span> CHARACTER <span>✳</span> PERSPECTIVE <span>✳</span> FORM <span>✳</span> MOTION <span>✳</span> CHARACTER <span>✳</span> PERSPECTIVE <span>✳</span></div></section>
      <section id="about" className="intro section-wrap"><div className="section-kicker">[ THE IDEA / 001 ]</div><div className="intro-content"><h2>Curiosity is a<br/><em>way of seeing.</em></h2><div className="intro-text"><p>DIMENSION is an interactive playground for exploring digital objects. Move beyond the image: get closer, change your perspective, and discover how each form behaves in space.</p><p>Four distinct assets become one hands-on study of character, geometry and motion.</p><a href="#characters" className="inline-arrow">Meet the collection <ArrowRight size={16}/></a></div></div></section>
      <section id="characters" className="collection section-wrap"><div className="section-heading"><div><p className="eyebrow">[ OBJECT COLLECTION / 004 ]</p><h2>Pick your <em>perspective.</em></h2></div><p className="heading-aside">Choose an object to bring it into the explorer.<br/>Drag to rotate. Scroll to move closer.</p></div><div className="asset-grid">{assets.map((asset, i) => <motion.button key={asset.id} className={`asset-card ${selected.id === asset.id ? 'active' : ''}`} onClick={() => choose(asset)} whileHover={{ y: -5 }} style={{'--asset-accent': asset.accent} as React.CSSProperties}><div className="card-top"><span>{asset.number} / 04</span><span className="card-arrow"><ArrowUpRight size={17}/></span></div><div className={`card-symbol symbol-${asset.id}`}>{asset.id === 'grid' ? <Waves size={38}/> : <Box size={38}/>}</div><div className="card-info"><div><span className="card-category">{asset.category}</span><h3>{asset.name}</h3></div><span className="card-select">{selected.id === asset.id ? 'SELECTED' : 'EXPLORE'}</span></div><p>{asset.description}</p></motion.button>)}</div></section>
      <section id="explorer" className="explorer-section"><div className="section-wrap"><div className="section-heading explorer-heading"><div><p className="eyebrow">[ LIVE VIEWER / {selected.number} ]</p><h2>The object <em>explorer.</em></h2></div><div className="viewer-tools"><button onClick={() => setPlaying(v => !v)}><CirclePlay size={16}/>{playing ? 'Pause motion' : 'Play motion'}</button><button onClick={() => setResetKey(v => v + 1)}><RotateCcw size={15}/> Reset view</button></div></div><div className="live-viewer"><div className="viewer-backdrop"/><div className="viewer-canvas"><Viewer asset={selected} playing={playing} resetKey={resetKey}/></div><div className="viewer-meta"><span>{selected.number} — {selected.category.toUpperCase()}</span><span>INTERACTIVE MODEL / GLB</span></div><div className="viewer-title"><span className="accent-dot" style={{background:selected.accent}}/><h3>{selected.name}</h3><p>{selected.description}</p></div><div className="viewer-selector">{assets.map(a => <button key={a.id} className={selected.id === a.id ? 'chosen' : ''} onClick={() => {setSelected(a);setPlaying(true);setResetKey(v=>v+1)}}>{a.number}<span>{a.name}</span></button>)}</div></div><p className="interaction-note"><span>↗</span> Drag to orbit <span>·</span> Scroll to zoom <span>·</span> Select an object to switch models</p></div></section>
      <section id="motion" className="motion-section section-wrap"><div className="motion-copy"><p className="eyebrow">[ MOTION STUDY / 002 ]</p><h2>Not just a shape.<br/><em>A moment in motion.</em></h2><p>Some objects are best understood through movement. Explore the animated robot and neural grid, where time becomes part of the design.</p><button className="button button-dark" onClick={() => choose(assets[3])}>Explore neural grid <ArrowRight size={16}/></button></div><div className="motion-cards"><button className="motion-card neural" onClick={() => choose(assets[3])}><div className="motion-card-top"><span>STUDY 04</span><Waves size={20}/></div><div className="neural-lines"/><div className="motion-card-bottom"><div><span>ANIMATED FORM</span><h3>Neural Grid</h3></div><ArrowUpRight/></div></button><button className="motion-card robot" onClick={() => choose(assets[1])}><div className="motion-card-top"><span>STUDY 02</span><Sparkles size={20}/></div><div className="robot-mark">R<span>.</span></div><div className="motion-card-bottom"><div><span>CHARACTER MOTION</span><h3>Robot Behavior</h3></div><ArrowUpRight/></div></button></div></section>
      <section className="closing section-wrap"><div className="closing-number">[ END / BEGIN AGAIN ]</div><h2>YOUR NEXT PERSPECTIVE<br/><em>STARTS HERE.</em></h2><a className="button button-orange" href="#explorer">Back to the playground <ArrowUpRight size={16}/></a><div className="closing-stamp">D<br/><span>3D</span></div></section>
    </main>
    <footer className="footer"><a className="brand" href="#top"><span className="brand-mark">D</span> DIMENSION<span className="brand-dot">.</span></a><p>An interactive 3D playground.<br/>Built with curiosity and code.</p><div className="footer-credit">3D ASSETS FROM <strong>ALGORYX COMMUNITY</strong><span>© 2026 DIMENSION / WEEK 03</span></div><a href="#top" className="back-top">BACK TO TOP ↑</a></footer>
    <AnimatePresence>{!loaded && <motion.div className="boot-screen" initial={{opacity:1}} exit={{opacity:0}}><span className="brand-mark">D</span><p>PREPARING YOUR DIMENSION…</p></motion.div>}</AnimatePresence>
  </div>;
}

export default App;
