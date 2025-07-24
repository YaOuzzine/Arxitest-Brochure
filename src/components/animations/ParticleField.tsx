'use client';

import { useEffect, useRef } from 'react';
import { getRandomFloat, getRandomInt } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  symbol: string;
  color: string;
}

interface ParticleFieldProps {
  particleCount?: number;
  className?: string;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ 
  particleCount = 50, 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const symbols = ['{ }', '< >', '[ ]', '( )', '===', '++', '--', '&&', '||', '!='];
    const colors = ['#0066ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444'];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: getRandomFloat(0, canvas.width),
          y: getRandomFloat(0, canvas.height),
          vx: getRandomFloat(-0.5, 0.5),
          vy: getRandomFloat(-0.5, 0.5),
          size: getRandomFloat(12, 20),
          opacity: getRandomFloat(0.1, 0.6),
          symbol: symbols[getRandomInt(0, symbols.length - 1)],
          color: colors[getRandomInt(0, colors.length - 1)]
        });
      }
    };

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.opacity += getRandomFloat(-0.01, 0.01);
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.font = `${particle.size}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(particle.symbol, particle.x, particle.y);
        ctx.restore();
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity: 0.3 }}
    />
  );
};

export default ParticleField;