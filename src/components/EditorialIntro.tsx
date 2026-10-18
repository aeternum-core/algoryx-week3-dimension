import React from 'react';
import { ArrowRight, MoveUpRight } from 'lucide-react';

export const EditorialIntro: React.FC = () => {
  return (
    <section className="editorial-intro section-wrap" id="about" aria-label="Editorial Introduction">
      <div className="editorial-grid">
        <div className="editorial-left">
          <div className="eyebrow">[ EDITORIAL / PHILOSOPHY ]</div>
          <h2 className="editorial-headline">
            Curiosity is a <br />
            <em>way of seeing.</em>
          </h2>
          <div className="editorial-meta-box">
            <span className="meta-number">04</span>
            <span className="meta-text">OFFICIAL COMMUNITY ASSETS CURATED AS ONE COHESIVE SYSTEM</span>
          </div>
        </div>

        <div className="editorial-right">
          <p className="editorial-lead">
            DIMENSION is an interactive playground for exploring digital objects. Move beyond
            static frames: move closer, orbit the silhouettes, and discover how form, materials,
            and kinematics behave under physical laws in 3D Euclidean space.
          </p>
          <p className="editorial-body">
            Four distinct models—each with its own structural challenge, from Mew&apos;s seamless 520k
            organic mesh and Iron Man&apos;s layered armor panels, to the Robot&apos;s multi-jointed
            articulation and the Neural Grid&apos;s 540-block wave choreography—come together as a
            unified masterclass in digital craft.
          </p>
          <div className="editorial-actions">
            <a href="#characters" className="inline-action-link">
              <span>Enter Character Lab</span>
              <MoveUpRight size={15} />
            </a>
            <a href="#motion" className="inline-action-link secondary">
              <span>Launch Motion Lab</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
