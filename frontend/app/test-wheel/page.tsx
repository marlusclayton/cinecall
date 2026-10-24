'use client';

import React, { useState } from 'react';
import { SpinWheel } from '@/components/SpinWheel';
//import { SpinWheelBug } from '@/components/SpinWheelBug';

// Categorias simuladas (mock) para teste visual
const MOCK_CATEGORIES = [
  { id: '1', name: 'Ação e Aventura' },
  { id: '2', name: 'Comédia Romântica' },
  { id: '3', name: 'Ficção Científica' },
  { id: '4', name: 'Terror e Suspense' },
  { id: '5', name: 'Documentário' },
  { id: '6', name: 'Animação' },
  { id: '7', name: 'Drama' },
  { id: '8', name: 'Policial' }
];

export default function TestWheelPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof MOCK_CATEGORIES[0] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  // Função para simular o sorteio localmente
  const handleStartSpin = (targetCategory: typeof MOCK_CATEGORIES[0]) => {
    if (isSpinning) return;
    setResultMessage(null);
    setSelectedCategory(targetCategory);
    setIsSpinning(true);
  };

  const handleSpinEnd = () => {
    setIsSpinning(false);
    setResultMessage(`A roleta parou em: "${selectedCategory?.name}"`);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-2">🧪 Ambiente de Teste da Roleta</h1>
      <p className="text-gray-400 mb-6">
        Testando alinhamento visual sem conectar ao backend/banco de dados.
      </p>

      {/* Componente da Roleta */}
      <SpinWheel
        items={MOCK_CATEGORIES}
        winningCategory={selectedCategory}
        isSpinning={isSpinning}
        onSpinEnd={handleSpinEnd}
      />

      {/* Resultado após a animação */}
      {resultMessage && (
        <div className="mt-4 p-4 bg-green-900/50 border border-green-500 rounded-lg text-lg font-bold text-green-300">
          {resultMessage}
        </div>
      )}

      {/* Painel de Controle de Testes */}
      <div className="mt-8 bg-gray-800 p-6 rounded-xl border border-gray-700 max-w-lg w-full">
        <h2 className="text-lg font-semibold mb-3 text-center">
          Forçar Resultado para Testar Alinhamento:
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              disabled={isSpinning}
              onClick={() => handleStartSpin(cat)}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-2 px-3 rounded text-sm transition"
            >
              Girar até: {cat.name}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}