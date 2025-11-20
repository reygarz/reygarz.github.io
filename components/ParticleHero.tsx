import React, { useEffect, useRef } from 'react';
import { AppTheme } from '../types';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  density: number;
}

const ParticleHero: React.FC<{ theme: AppTheme, highPerformance: boolean }> = ({ theme, highPerformance }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highPerformance) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouseX = -9999;
    let mouseY = -9999;

    const initParticles = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Guard against 0 dimensions which causes IndexSizeError in getImageData
      if (width === 0 || height === 0) return;

      particles = [];
      
      // Offscreen canvas for silhouette
      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d');
      
      if (offCtx) {
        offCtx.fillStyle = 'white';
        // Tech Giant Style Typography
        offCtx.font = `900 ${Math.min(width/3, 300)}px "Inter", sans-serif`; 
        offCtx.textAlign = 'center';
        offCtx.textBaseline = 'middle';
        offCtx.fillText('JK', width / 2, height / 2);
      }

      try {
        const imgData = offCtx?.getImageData(0, 0, width, height);
        if (!imgData) return;

        const data = imgData.data;
        const step = width < 600 ? 6 : 8; // Optimization for mobile

        for (let y = 0; y < height; y += step) {
            for (let x = 0; x < width; x += step) {
            const index = (y * width + x) * 4;
            if (data[index + 3] > 128) {
                // Only spawn if alpha > 128
                // Random displacement for organic feel
                if (Math.random() > 0.8) {
                    particles.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        originX: x,
                        originY: y,
                        vx: 0,
                        vy: 0,
                        size: Math.random() * 1.5 + 0.5,
                        density: Math.random() * 30 + 1
                    });
                }
            }
            }
        }
      } catch (e) {
          console.warn('Failed to init particles:', e);
          return;
      }

      // Limit particles
      if (particles.length > 1000) particles = particles.slice(0, 1000);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Determine colors
      let particleColor = '255, 255, 255';
      let lineColor = '255, 255, 255';
      
      if (theme === AppTheme.LIQUID_NEON) {
          particleColor = '34, 211, 238'; // Cyan
          lineColor = '34, 211, 238';
      } else if (theme === AppTheme.VISION_GLASS) {
          particleColor = '0, 0, 0';
          lineColor = '0, 0, 0';
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interaction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = 150;
        let force = (maxDistance - distance) / maxDistance;
        if (force < 0) force = 0;

        const directionX = forceDirectionX * force * p.density;
        const directionY = forceDirectionY * force * p.density;

        if (distance < maxDistance) {
          p.x -= directionX;
          p.y -= directionY;
        } else {
            // Return to origin
            if (p.x !== p.originX) {
                const dx = p.x - p.originX;
                p.x -= dx / 20;
            }
            if (p.y !== p.originY) {
                const dy = p.y - p.originY;
                p.y -= dy / 20;
            }
        }

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, 0.6)`;
        ctx.fill();

        // Constellations (Connections)
        for (let j = i; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 20) { // Connection threshold
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${lineColor}, ${0.2 - dist/100})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        
        // Prevent zero-size canvas logic
        if (w === 0 || h === 0) return;

        canvas.width = w;
        canvas.height = h;
        initParticles();
    };

    const onMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    }
    
    const onMouseLeave = () => {
        mouseX = -9999;
        mouseY = -9999;
    }

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    
    // Initial size check
    if (container.clientWidth > 0 && container.clientHeight > 0) {
        handleResize();
    } else {
        // Defer slightly if container is not yet ready
        setTimeout(handleResize, 100);
    }
    
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, highPerformance]);

  if (highPerformance) {
      return (
          <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-[15rem] font-black opacity-5 select-none ${theme === AppTheme.VISION_GLASS ? 'text-black' : 'text-white'}`}>JK</span>
          </div>
      );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-auto">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default ParticleHero;