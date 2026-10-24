'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Category {
  id: string;
  name: string;
}

interface SpinWheelProps {
  items: Category[];
  winningCategory: Category | null;
  isSpinning: boolean;
  onSpinEnd: () => void;
}

const COLORS = [
  '#E50914', '#141414', '#B81D24', '#221F1F', 
  '#F5C518', '#333333', '#E50914', '#564D4D'
];

export const SpinWheelBug: React.FC<SpinWheelProps> = ({
  items,
  winningCategory,
  isSpinning,
  onSpinEnd
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);

  // Desenho com a lógica antiga (começa em 0 radianos / 3 horas no Canvas)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || items.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numItems = items.length;
    const arc = (2 * Math.PI) / numItems;
    const radius = canvas.width / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    items.forEach((item, i) => {
      // Bug visual 1: Sem a compensação de -Math.PI / 2
      const angle = i * arc;

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
      ctx.fillText(item.name.length > 15 ? item.name.substring(0, 12) + '...' : item.name, radius - 30, 5);
      ctx.restore();
    });
  }, [items]);

  // Animação com a fórmula antiga (sem compensar o offset do ponteiro e sem centralizar a fatia)
  useEffect(() => {
    if (isSpinning && winningCategory) {
      const winnerIndex = items.findIndex(item => item.id === winningCategory.id);
      if (winnerIndex !== -1) {
        const numItems = items.length;
        const sliceAngle = 360 / numItems;

        // Bug visual 2: Não considera o centro da fatia nem o ponteiro no topo
        const targetAngle = 360 * 5 + (360 - (winnerIndex * sliceAngle));

        const currentMod = rotation % 360;
        const finalRotation = rotation + (360 - currentMod) + targetAngle;

        setRotation(finalRotation);
      }
    }
  }, [isSpinning, winningCategory, items]);

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
        onTransitionEnd={onSpinEnd}
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