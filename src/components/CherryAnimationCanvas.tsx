import React, { useEffect, useRef, useState } from 'react';
import { soundFx } from '../utils/sound';

interface CherryParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  opacity: number;
  type: 'cherry' | 'petal' | 'sparkle';
  color: string;
}

interface CherryAnimationCanvasProps {
  isAnimationActive: boolean;
  onToggleAnimation: () => void;
}

export const CherryAnimationCanvas: React.FC<CherryAnimationCanvasProps> = ({
  isAnimationActive,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<CherryParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const [clickBursts, setClickBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize gentle background cherry & petal particles
    const particleCount = 28;
    const colors = ['#e11d48', '#f43f5e', '#be123c', '#9f1239', '#fda4af'];
    const types: ('cherry' | 'petal' | 'sparkle')[] = ['cherry', 'petal', 'petal', 'petal', 'sparkle'];

    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 6,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.4) * 0.6,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.45 + 0.15,
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isAnimationActive) {
        particlesRef.current.forEach((p) => {
          p.y += p.speedY;
          p.x += Math.sin(p.angle) * 0.5 + p.speedX;
          p.angle += p.angularSpeed;

          // Wrap around edges
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.opacity;

          if (p.type === 'cherry') {
            // Draw cute mini double cherry
            ctx.fillStyle = p.color;
            // Left cherry
            ctx.beginPath();
            ctx.arc(-4, 2, p.size * 0.4, 0, Math.PI * 2);
            ctx.fill();

            // Right cherry
            ctx.beginPath();
            ctx.arc(4, 3, p.size * 0.38, 0, Math.PI * 2);
            ctx.fill();

            // Gloss highlights
            ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
            ctx.beginPath();
            ctx.arc(-5.5, 0.5, p.size * 0.12, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(2.5, 1.5, p.size * 0.11, 0, Math.PI * 2);
            ctx.fill();

            // Green stems joined together
            ctx.strokeStyle = '#4ade80';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(-4, -1);
            ctx.quadraticCurveTo(0, -p.size * 0.6, 2, -p.size * 0.8);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(4, 0);
            ctx.quadraticCurveTo(2, -p.size * 0.5, 2, -p.size * 0.8);
            ctx.stroke();

            // Tiny green leaf
            ctx.fillStyle = '#22c55e';
            ctx.beginPath();
            ctx.ellipse(3, -p.size * 0.75, 3.5, 1.8, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.type === 'petal') {
            // Soft cherry blossom petal
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 0.6, p.size * 0.35, 0, 0, Math.PI * 2);
            ctx.fill();
            // Subtle petal notch
            ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.beginPath();
            ctx.arc(p.size * 0.3, 0, p.size * 0.15, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Ruby sparkle diamond
            ctx.fillStyle = '#fb7185';
            ctx.beginPath();
            ctx.moveTo(0, -p.size * 0.4);
            ctx.lineTo(p.size * 0.4, 0);
            ctx.lineTo(0, p.size * 0.4);
            ctx.lineTo(-p.size * 0.4, 0);
            ctx.closePath();
            ctx.fill();
          }

          ctx.restore();
        });
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isAnimationActive]);

  // Click handler to trigger celebratory cherry burst
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    soundFx.playCherryPop(1.2);
    const rect = e.currentTarget.getBoundingClientRect();
    const burstX = e.clientX - rect.left;
    const burstY = e.clientY - rect.top;

    // Spawn 8 burst particles
    const newParticles: CherryParticle[] = Array.from({ length: 8 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      return {
        x: burstX,
        y: burstY,
        size: Math.random() * 14 + 8,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.1,
        opacity: 0.9,
        type: 'cherry',
        color: '#e11d48',
      };
    });

    particlesRef.current.push(...newParticles);

    // Keep particles array tidy
    if (particlesRef.current.length > 60) {
      particlesRef.current.splice(0, particlesRef.current.length - 60);
    }

    const burstId = Date.now();
    setClickBursts((prev) => [...prev, { id: burstId, x: burstX, y: burstY }]);
    setTimeout(() => {
      setClickBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 700);
  };

  return (
    <div
      onClick={handleCanvasClick}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none"
      title="Click anywhere for cherry bursts"
    >
      <canvas ref={canvasRef} className="w-full h-full block opacity-75" />
      {clickBursts.map((b) => (
        <div
          key={b.id}
          style={{ left: b.x, top: b.y }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-ping text-rose-500 font-bold text-xs"
        >
          🍒
        </div>
      ))}
    </div>
  );
};
