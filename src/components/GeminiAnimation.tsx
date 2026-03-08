import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/useLanguage';

export default function GeminiAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // State machine for animation
    let stage = 0; 
    
    // Texts to display
    const texts = [
      "", // Sparkle shape
      "HamudAI"
    ];

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      friction: number;
      ease: number;

      constructor(x: number, y: number, color: string) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2 + 1;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
        this.friction = Math.random() * 0.04 + 0.85;
        this.ease = Math.random() * 0.1 + 0.05;
      }

      update() {
        const dx = this.baseX - this.x;
        const dy = this.baseY - this.y;
        
        this.vx += dx * this.ease;
        this.vy += dy * this.ease;
        
        this.vx *= this.friction;
        this.vy *= this.friction;
        
        this.x += this.vx;
        this.y += this.vy;
        
        // Add subtle floating motion
        this.x += Math.sin(Date.now() * 0.001 + this.baseY) * 0.5;
        this.y += Math.cos(Date.now() * 0.001 + this.baseX) * 0.5;
      }

      draw() {
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const getPixelData = (text: string, isSparkle: boolean) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const octx = offscreen.getContext('2d');
      if (!octx) return [];

      if (isSparkle) {
        // Draw 8-pointed asterisk logo
        octx.translate(width/2, height/2);
        octx.lineCap = 'round';
        octx.lineWidth = 24; // Thick lines
        octx.strokeStyle = 'white';
        
        const radius = 120;
        
        octx.beginPath();
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          octx.moveTo(0, 0);
          octx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }
        octx.stroke();
        
      } else {
        octx.fillStyle = 'white';
        octx.textAlign = 'center';
        octx.textBaseline = 'middle';
        
        // Responsive font size
        const fontSize = width < 768 ? 60 : 120;
        octx.font = `bold ${fontSize}px Inter, sans-serif`;
        octx.fillText(text, width / 2, height / 2);
      }

      const data = octx.getImageData(0, 0, width, height).data;
      const points = [];
      
      // Sample pixels
      const stepSize = width < 768 ? 8 : 6; // Density
      for (let y = 0; y < height; y += stepSize) {
        for (let x = 0; x < width; x += stepSize) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];
          if (alpha > 128) {
            // Grayscale color variation
            const shade = Math.floor(Math.random() * 100 + 155); // 155 to 255 (light grays to white)
            const color = `rgba(${shade}, ${shade}, ${shade}, 0.9)`;
            points.push({ x, y, color });
          }
        }
      }
      return points;
    };

    const morphTo = (stageIndex: number) => {
      const points = getPixelData(texts[stageIndex], stageIndex === 0);
      
      if (particles.length === 0) {
        particles = points.map(p => new Particle(p.x, p.y, p.color));
      } else {
        // Update targets
        while (particles.length < points.length) {
          const randomP = particles[Math.floor(Math.random() * particles.length)];
          particles.push(new Particle(randomP.x, randomP.y, 'white'));
        }
        
        // Shuffle points to make the transition look chaotic and cool
        const shuffledPoints = [...points].sort(() => Math.random() - 0.5);
        
        particles.forEach((p, i) => {
          if (i < shuffledPoints.length) {
            const target = shuffledPoints[i];
            p.baseX = target.x;
            p.baseY = target.y;
            p.color = target.color;
          } else {
            // Hide excess particles by sending them offscreen
            p.baseX = Math.random() > 0.5 ? -100 : width + 100;
            p.baseY = Math.random() * height;
          }
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      width = canvas.width;
      height = canvas.height;
      morphTo(stage);
    };

    window.addEventListener('resize', resize);
    resize();

    // Sequence timing
    const timers: NodeJS.Timeout[] = [];
    
    timers.push(setTimeout(() => {
      stage = 1;
      morphTo(stage);
    }, 2500));

    const animate = () => {
      // Clear with slight opacity for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      timers.forEach(clearTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [t]);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      {/* Fallback gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-white/5 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"></div>
    </div>
  );
}
