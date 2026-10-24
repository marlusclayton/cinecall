'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface Category {
  id: number | string;
  name: string;
}

export interface SpinWheelProps {
  categories?: any[];
  items?: any[];
  winningCategory?: any | null;
  isSpinning?: boolean;
  onSpinEnd?: () => void;
  onCategorySelected?: (category: any) => void | Promise<void>;
}

const COLORS = [
  '#E50914', '#141414', '#B81D24', '#221F1F', 
  '#F5C518', '#333333', '#E50914', '#564D4D'
];

export const SpinWheel: React.FC<SpinWheelProps> = ({
  categories,
  items,
  winningCategory,
  isSpinning = false,
  onSpinEnd,
  onCategorySelected
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);

  // Usa `categories` ou `items` (o que for passado via prop)
  const wheelItems = categories || items || [];

  // Desenha a roleta no Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || wheelItems.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numItems = wheelItems.length;
    const arc = (2 * Math.PI) / numItems;
    const radius = canvas.width / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    wheelItems.forEach((item, i) => {
      // Compensação de -Math.PI / 2 para alinhar a fatia 0 no topo (12h)
      const angle = i * arc - Math.PI / 2;

      // Fatia
      ctx.beginPath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius - 10, angle, angle + arc);
      ctx.lineTo(radius, radius);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Texto
      ctx.save();
      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 14px sans-serif';
      ctx.translate(radius, radius);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillText(
        item.name.length > 15 ? item.name.substring(0, 12) + '...' : item.name,
        radius - 30,
        5
      );
      ctx.restore();
    });
  }, [wheelItems]);

  // Animação de Giro e Alinhamento
  useEffect(() => {
    if (isSpinning && winningCategory) {
      const winnerIndex = wheelItems.findIndex(
        item => String(item.id) === String(winningCategory.id)
      );

      if (winnerIndex !== -1) {
        const numItems = wheelItems.length;
        const sliceAngle = 360 / numItems;

        // Centraliza a fatia sorteada embaixo do ponteiro (12h)
        const winnerCenter = (winnerIndex * sliceAngle) + (sliceAngle / 2);
        const degreesToDegrees = 360 - winnerCenter;

        // 5 voltas completas para o efeito visual
        const extraSpins = 360 * 5;
        
        const currentMod = rotation % 360;
        const targetRotation = rotation + (360 - currentMod) + extraSpins + degreesToDegrees;

        setRotation(targetRotation);
      }
    }
  }, [isSpinning, winningCategory, wheelItems]);

  const handleTransitionEnd = () => {
    if (onSpinEnd) {
      onSpinEnd();
    }
    if (winningCategory && onCategorySelected) {
      onCategorySelected(winningCategory);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-8">
      {/* Ponteiro no topo (12 horas) */}
      <div className="absolute top-0 z-10 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-yellow-500 drop-shadow-md" />

      {/* Roda da Roleta */}
      <div
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.90, 0.20, 1.00)' : 'none'
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="rounded-full shadow-2xl border-4 border-gray-800"
        />
      </div>
    </div>
  );
};

export default SpinWheel;