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

interface SeamlessBackgroundProps {
  className?: string;
}

const SeamlessBackground: React.FC<SeamlessBackgroundProps> = ({ className = '' }) => {
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
      canvas.height = window.innerHeight; // Viewport height for better performance
    };

    const createParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(120, Math.floor((canvas.width * canvas.height) / 10000)); // More particles, responsive count
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: getRandomFloat(0, canvas.width),
          y: getRandomFloat(0, canvas.height),
          vx: getRandomFloat(-0.5, 0.5),
          vy: getRandomFloat(-0.5, 0.5),
          size: getRandomFloat(12, 20),
          opacity: getRandomFloat(0.3, 0.7),
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
        particle.opacity = Math.max(0.2, Math.min(0.8, particle.opacity));
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

    const handleScroll = () => {
      // Subtle parallax effect without moving the canvas
      const scrollY = window.pageYOffset;
      const parallaxOffset = scrollY * 0.1;
      
      // Apply parallax to floating elements
      const floatingElements = document.querySelectorAll('.floating-animation');
      floatingElements.forEach((element, index) => {
        const rate = 0.02 + (index * 0.01);
        const yPos = -(scrollY * rate);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`} style={{ zIndex: -2 }}>
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" />
      
      {/* Floating elements matching hero section */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl floating-animation" />
      <div 
        className="absolute top-40 right-32 w-24 h-24 bg-secondary/10 rounded-full blur-lg floating-animation"
        style={{ animationDelay: '1s' }}
      />
      <div 
        className="absolute bottom-32 left-1/4 w-20 h-20 bg-accent/10 rounded-full blur-lg floating-animation"
        style={{ animationDelay: '2s' }}
      />
      
      {/* Particle field canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />
    </div>
  );
};

export default SeamlessBackground;