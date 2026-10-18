import React, { useRef, useState, useEffect, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { ErrorBoundary } from '../ErrorBoundary.tsx';

interface CanvasContainerProps {
  children: ReactNode;
  className?: string;
  camera?: {
    position: [number, number, number];
    fov: number;
  };
  style?: React.CSSProperties;
  frameloop?: 'always' | 'demand';
}

export const CanvasContainer: React.FC<CanvasContainerProps> = ({
  children,
  className = '',
  camera = { position: [0, 0, 4], fov: 36 },
  style,
  frameloop: explicitFrameloop,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '150px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeFrameloop = explicitFrameloop || (isInView ? 'always' : 'demand');

  return (
    <div ref={containerRef} className={`canvas-shell ${className}`} style={style}>
      <ErrorBoundary>
        <Canvas
          shadows
          dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.75) : 1]}
          camera={camera}
          frameloop={activeFrameloop}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          {children}
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};
