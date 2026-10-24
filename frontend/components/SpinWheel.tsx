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

export const SpinWheel: React.FC<SpinWheelProps> = ({
  items,
  winningCategory,
  isSpinning,
  onSpinEnd
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);

  // Desenha a roleta no Canvas
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
      // Ajustamos o ângulo inicial para compensar o topo (-PI / 2)
      // Assim a primeira fatia (índice 0) fica perfeitamente centrada no topo a 12h
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
      ctx.fillText(item.name.length > 15 ? item.name.substring(0, 12) + '...' : item.name, radius - 30, 5);
      ctx.restore();
    });
  }, [items]);

  // Animação de Giro e Alinhamento
  useEffect(() => {
    if (isSpinning && winningCategory) {
      const winnerIndex = items.findIndex(item => item.id === winningCategory.id);
      if (winnerIndex !== -1) {
        const numItems = items.length;
        const sliceAngle = 360 / numItems;

        // Como alinhamos o ponto 0 no topo no canvas:
        // O centro do item `i` está na Posição (i * sliceAngle + sliceAngle / 2)
        const winnerCenter = (winnerIndex * sliceAngle) + (sliceAngle / 2);

        // Para trazer o item sorteado ao topo, giramos no sentido horário
        const degreesToDegrees = 360 - winnerCenter;

        // Adiciona 5 voltas completas para o efeito visual
        const extraSpins = 360 * 5;
        
        // Mantém o progresso acumulado da rotação anterior
        const currentMod = rotation % 360;
        const targetRotation = rotation + (360 - currentMod) + extraSpins + degreesToDegrees;

        setRotation(targetRotation);
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