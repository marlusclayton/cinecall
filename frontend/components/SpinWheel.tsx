'use client';

import { useState, useRef, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
}

interface SpinWheelProps {
  categories: Category[];
  onCategorySelected: (category: Category) => void;
}

const VIBRANT_COLORS = [
  '#6366f1', '#06b6d4', '#10b981', '#f59e0b',
  '#ec4899', '#8b5cf6', '#f43f5e', '#14b8a6',
  '#3b82f6', '#a855f7', '#84cc16', '#fb923c',
];

export default function SpinWheel({ categories, onCategorySelected }: SpinWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<Category | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentRotationRef = useRef(0);

  const drawWheel = (rotationAngle = 0) => {
    const canvas = canvasRef.current;
    if (!canvas || categories.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numSlices = categories.length;
    const sliceAngle = (2 * Math.PI) / numSlices;
    const width = canvas.width;
    const height = canvas.height;
    const center = width / 2;
    const radius = center - 18;

    ctx.clearRect(0, 0, width, height);

    categories.forEach((cat, index) => {
      const startAngle = rotationAngle + index * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = VIBRANT_COLORS[index % VIBRANT_COLORS.length];
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#090d16';
      ctx.stroke();

      // Render Text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';

      // Enhanced font size for crisp reading
      const fontSize = numSlices > 35 ? 12 : numSlices > 20 ? 13 : 15;
      ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`;
      
      const maxTextWidth = radius - 42;
      ctx.fillText(cat.name, radius - 18, 4, maxTextWidth);
      ctx.restore();
    });

    // Outer border ring
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#1e293b';
    ctx.stroke();

    // Gold Accent Ring
    ctx.beginPath();
    ctx.arc(center, center, radius + 3, 0, 2 * Math.PI);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#f59e0b';
    ctx.stroke();

    // Center peg
    ctx.beginPath();
    ctx.arc(center, center, 32, 0, 2 * Math.PI);
    ctx.fillStyle = '#090d16';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#f59e0b';
    ctx.stroke();
  };

  useEffect(() => {
    drawWheel(currentRotationRef.current);
  }, [categories]);

  const spin = () => {
    if (spinning || categories.length === 0) return;

    setSpinning(true);
    setWinner(null);

    const numSlices = categories.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    const selectedIndex = Math.floor(Math.random() * numSlices);
    const selectedCat = categories[selectedIndex];

    const extraSpins = 6 + Math.floor(Math.random() * 4);
    const targetSliceCenterAngle = selectedIndex * sliceAngle + sliceAngle / 2;
    const targetRotation = extraSpins * 2 * Math.PI + (2 * Math.PI - targetSliceCenterAngle);

    const startRotation = currentRotationRef.current % (2 * Math.PI);
    const totalRotationToAnimate = targetRotation - startRotation;

    const duration = 5000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentAngle = startRotation + totalRotationToAnimate * easeOut;

      currentRotationRef.current = currentAngle;
      drawWheel(currentAngle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        setWinner(selectedCat);
        setTimeout(() => {
          onCategorySelected(selectedCat);
        }, 1200);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-2">
      <div className="relative flex items-center justify-center">
        {/* Sleek Golden Indicator Pointer */}
        <div 
          className="absolute -top-3.5 z-20 w-0 h-0 
            border-l-[14px] border-l-transparent 
            border-r-[14px] border-r-transparent 
            border-t-[26px] border-t-amber-400 filter drop-shadow-lg" 
        />

        {/* Restored Large Wheel Canvas (480px - 520px) */}
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          className="w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] lg:w-[500px] lg:h-[500px] max-w-full drop-shadow-2xl transition-all"
        />
      </div>

      <button
        onClick={spin}
        disabled={spinning || categories.length === 0}
        className="px-8 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs tracking-wider uppercase rounded-xl shadow-lg transform active:scale-95 transition disabled:opacity-50"
      >
        {spinning ? 'Sorteando...' : '🎡 Girar Roleta'}
      </button>

      {winner && (
        <div className="animate-fade-in text-xs font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-5 py-2 rounded-xl">
          Categoria selecionada: {winner.name}
        </div>
      )}
    </div>
  );
}
