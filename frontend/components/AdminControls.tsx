'use client';

import { useState, useEffect } from 'react';
import CategoryManager from './CategoryManager';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface AdminControlsProps {
  onRefresh: () => void;
}

export default function AdminControls({ onRefresh }: AdminControlsProps) {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  const loadCategories = () => {
    fetch(`${API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setSelectedCategory(data[0].id);
      })
      .catch((err) => console.error('Failed to load categories', err));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleStartCycle = async () => {
    setLoading(true);
    await fetch(`${API_URL}/api/cycles/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoryId: Number(selectedCategory) }),
    });
    setLoading(false);
    onRefresh();
  };

  const handleRandomStart = async () => {
    setLoading(true);
    await fetch(`${API_URL}/api/cycles/random-start`, { method: 'POST' });
    setLoading(false);
    onRefresh();
  };

  const handleResetPool = async () => {
    if (!confirm('Deseja liberar TODAS as categorias já utilizadas de volta para a roleta?')) return;
    setLoading(true);
    await fetch(`${API_URL}/api/categories/reset-pool`, { method: 'POST' });
    setLoading(false);
    loadCategories();
    onRefresh();
  };

  const handleSendSummary = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/api/cycles/send-summary`, { method: 'POST' });
    if (res.ok) alert('Resumo completo enviado para o WhatsApp!');
    else alert('Falha ao enviar o resumo.');
    setLoading(false);
    onRefresh();
  };

  const handleSendList = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/api/cycles/send-list`, { method: 'POST' });
    if (res.ok) alert('Lista simples (filme - indicador) enviada para o WhatsApp!');
    else alert('Falha ao enviar a lista simples.');
    setLoading(false);
    onRefresh();
  };

  const handleSendPoll = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/api/cycles/send-poll`, { method: 'POST' });
    if (res.ok) {
      alert('Enquete múltipla enviada para o WhatsApp!');
    } else {
      const body = await res.json().catch(() => null);
      alert(`Falha ao enviar a enquete.${body?.message ? `\n\n${body.message}` : ''}`);
    }
    setLoading(false);
    onRefresh();
  };

  const handleSendTiebreaker = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/api/cycles/send-tiebreaker-poll`, { method: 'POST' });
    if (res.ok) {
      alert('Enquete de desempate (escolha única) enviada para o WhatsApp!');
    } else {
      const body = await res.json().catch(() => null);
      alert(`Falha ao enviar a enquete de desempate.${body?.message ? `\n\n${body.message}` : ''}`);
    }
    setLoading(false);
    onRefresh();
  };

  const handleComplete = async () => {
    setLoading(true);
    await fetch(`${API_URL}/api/cycles/complete`, { method: 'POST' });
    setLoading(false);
    onRefresh();
  };

  return (
    <div className="bg-[#121826] border border-slate-800/80 rounded-3xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">
          Painel de Gerenciamento
        </h3>
        <span className="text-xs font-mono text-slate-500">
          {categories.length} categorias na roleta
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Group 1: Cycle Actions */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Iniciar Ciclo</span>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400/50 flex-1 min-w-0"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleStartCycle}
              disabled={loading}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-xl transition flex-shrink-0"
            >
              Iniciar
            </button>
          </div>
          <button
            onClick={handleRandomStart}
            disabled={loading}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium py-1.5 rounded-xl transition"
          >
            🎲 Sorteio Aleatório
          </button>
        </div>

        {/* Group 2: WhatsApp Actions */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">WhatsApp Integration</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleSendSummary}
              disabled={loading}
              className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-400/20 text-xs font-medium py-1.5 rounded-xl transition"
            >
              📄 Resumo
            </button>
            <button
              onClick={handleSendList}
              disabled={loading}
              className="bg-slate-800 hover:bg-slate-700 text-sky-400 border border-sky-400/20 text-xs font-medium py-1.5 rounded-xl transition"
            >
              📋 Lista Simples
            </button>
            <button
              onClick={handleSendPoll}
              disabled={loading}
              className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-medium py-1.5 rounded-xl transition"
            >
              📊 Enquete (Múltipla)
            </button>
            <button
              onClick={handleSendTiebreaker}
              disabled={loading}
              className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 text-xs font-medium py-1.5 rounded-xl transition"
            >
              ⚖️ Desempate (1 Opção)
            </button>
          </div>
        </div>

        {/* Group 3: Maintenance */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Manutenção</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleResetPool}
              disabled={loading}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium py-2 rounded-xl transition"
            >
              🔄 Liberar Pool
            </button>
            <button
              onClick={handleComplete}
              disabled={loading}
              className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-medium py-2 rounded-xl transition"
            >
              🛑 Nova Roleta
            </button>
            <button
              onClick={() => setShowCategoryManager(true)}
              disabled={loading}
              className="col-span-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/20 text-xs font-medium py-2 rounded-xl transition"
            >
              🗂️ Gerenciar Categorias
            </button>
          </div>
        </div>
      </div>

      {showCategoryManager && (
        <CategoryManager
          onClose={() => setShowCategoryManager(false)}
          onChange={loadCategories}
        />
      )}
    </div>
  );
}
