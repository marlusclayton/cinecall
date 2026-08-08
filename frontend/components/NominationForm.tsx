'use client';

import React, { useState } from 'react';

interface NominationFormProps {
  cycleId: number;
  onSubmitted: () => void;
}

export default function NominationForm({ cycleId, onSubmitted }: NominationFormProps) {
  const [title, setTitle] = useState('');
  const [indicatedBy, setIndicatedBy] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !indicatedBy.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/nominations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cycleId,
          title,
          indicatedBy,
        }),
      });

      if (res.ok) {
        setTitle('');
        setIndicatedBy('');
        onSubmitted();
      }
    } catch (err) {
      console.error('Failed to nominate movie:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-sm">🍿</span>
          <h3 className="text-sm font-bold text-white tracking-tight">Nova Indicação</h3>
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          TMDB Auto-Sync
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-2 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-mono text-[11px]">
              Nome do Filme
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🎬</span>
              <input
                type="text"
                placeholder="Ex: Matrix, Interstellar..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-slate-900/90 border border-slate-800 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 rounded-xl pl-9 pr-3 py-2 text-white placeholder-slate-600 transition-all font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-mono text-[11px]">
              Indicado por
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">👤</span>
              <input
                type="text"
                placeholder="Seu nome ou apelido"
                value={indicatedBy}
                onChange={(e) => setIndicatedBy(e.target.value)}
                required
                className="w-full bg-slate-900/90 border border-slate-800 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 rounded-xl pl-9 pr-3 py-2 text-white placeholder-slate-600 transition-all font-sans"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !title.trim() || !indicatedBy.trim()}
          className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-amber-500/10 transform active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Cadastrando...</span>
            </>
          ) : (
            <>
              <span>+ Indicar Filme</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
