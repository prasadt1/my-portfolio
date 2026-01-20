// src/components/SignatureMeshBackground.tsx
// Phase 4.1: Subtle signature visual differentiator

import React, { useEffect, useRef, useState } from 'react';

interface SignatureMeshBackgroundProps {
  className?: string;
  opacity?: number;
}

const SignatureMeshBackground: React.FC<SignatureMeshBackgroundProps> = ({
  className = '',
  opacity = 0.05,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const animationFrameRef = useRef<number>();
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse move handler for subtle parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      
      const rect = canvas.getBoundingClientRect();
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Draw mesh pattern
    const drawMesh = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = 60;
      const nodeRadius = 1.5;
      const lineWidth = 0.5;
      
      // Set opacity
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = 'currentColor';
      ctx.fillStyle = 'currentColor';
      ctx.lineWidth = lineWidth;

      // Calculate parallax offset (very subtle)
      const parallaxX = prefersReducedMotion 
        ? 0 
        : (mousePositionRef.current.x - canvas.width / 2) * 0.0001;
      const parallaxY = prefersReducedMotion 
        ? 0 
        : (mousePositionRef.current.y - canvas.height / 2) * 0.0001;

      // Draw grid nodes and connections
      const nodes: Array<{ x: number; y: number }> = [];
      
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
          const offsetX = x + parallaxX;
          const offsetY = y + parallaxY;
          
          // Only draw if within canvas bounds
          if (offsetX >= -gridSize && offsetX <= canvas.width + gridSize &&
              offsetY >= -gridSize && offsetY <= canvas.height + gridSize) {
            nodes.push({ x: offsetX, y: offsetY });
            
            // Draw node
            ctx.beginPath();
            ctx.arc(offsetX, offsetY, nodeRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw connections (only to nearby nodes to reduce visual noise)
      const maxConnectionDistance = gridSize * 1.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only connect nearby nodes
          if (distance < maxConnectionDistance && distance > 0) {
            // Fade out connections based on distance
            const alpha = 1 - (distance / maxConnectionDistance);
            ctx.globalAlpha = opacity * alpha * 0.3;
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Reset alpha
      ctx.globalAlpha = 1;

      // Only animate if motion is not reduced
      if (!prefersReducedMotion) {
        animationFrameRef.current = requestAnimationFrame(drawMesh);
      }
    };

    // Initial draw
    drawMesh();

    // If reduced motion, only redraw on resize
    if (prefersReducedMotion) {
      const handleResize = () => {
        resizeCanvas();
        drawMesh();
      };
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [opacity, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        mixBlendMode: 'normal',
      }}
      aria-hidden="true"
    />
  );
};

export default SignatureMeshBackground;
