import React from 'react';
import { Eye, Compass, Move3d, PlayCircle } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Discover',
    icon: <Eye size={22} />,
    lead: 'Immediate spatial presence and contour recognition.',
    detail:
      'Begin with initial silhouette identification. High-resolution PBR geometry is loaded on-demand, preserving original textures without destructive remeshing or approximation.',
  },
  {
    num: '02',
    title: 'Observe',
    icon: <Compass size={22} />,
    lead: 'Multi-angle studio lighting and surface topology inspection.',
    detail:
      'Inspect ambient occlusion, roughness-metalness maps, and specular highlights under balanced studio illumination tailored specifically to each asset’s material complexity.',
  },
  {
    num: '03',
    title: 'Interact',
    icon: <Move3d size={22} />,
    lead: 'Frictionless 360-degree orbit and camera zoom tolerances.',
    detail:
      'Manipulate camera trajectories with pointer and touch controls. Clamped distance bounds prevent clipping, maintaining ideal framing on desktop and mobile viewports alike.',
  },
  {
    num: '04',
    title: 'Explore',
    icon: <PlayCircle size={22} />,
    lead: 'Kinetic time manipulation and animation track analysis.',
    detail:
      'Control multi-channel keyframe sequences. Toggle playback, throttle execution rates, and analyze rhythmic wave motion across hundreds of articulated degrees of freedom.',
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="process-section section-wrap" id="process" aria-label="Process and Methodology">
      <div className="section-header">
        <div className="header-meta">
          <p className="eyebrow">
            <span className="live-dot" />
            [ INTERACTION METHODOLOGY / 003 ]
          </p>
          <h2 className="section-title">
            Curiosity is a <em>way of seeing.</em>
          </h2>
        </div>
        <p className="section-lead">
          DIMENSION is structured around four deliberate interaction stages designed to transform
          passive 3D viewing into an exploratory, tactile playground.
        </p>
      </div>

      <div className="process-grid">
        {STEPS.map((step) => (
          <div key={step.num} className="process-card">
            <div className="process-card-top">
              <span className="process-num">{step.num}</span>
              <span className="process-icon">{step.icon}</span>
            </div>
            <h3 className="process-title">{step.title}</h3>
            <p className="process-lead">{step.lead}</p>
            <p className="process-detail">{step.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
