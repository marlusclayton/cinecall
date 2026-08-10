'use client';

import React, { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface NominationFormProps {
  cycleId: number;
  onSubmitted: () => void;
}

interface TmdbResult {
  tmdbId: number;
  title: string;
  overview: string;
  fullPosterUrl: string;
  releaseYear: string | null;
}

const PLACEHOLDER_POSTER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='150' viewBox='0 0 100 150'><rect width='100' height='150' fill='%231e293b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-size='24'>🎬</text></svg>";

export default function NominationForm({ cycleId, onSubmitted }: NominationFormProps) {
  const [title, setTitle] = useState('');
  const [indicatedBy, setIndicatedBy] = useState('');
  const [loading, setLoading] = useState(false);

  const [showDisambiguation, setShowDisambiguation] = useState(false);
  const [searchResults, setSearchResults] = useState<TmdbResult[]>([]);
  const [noMatchFound, setNoMatchFound] = useState(false);

  const createNomination = async (tmdbId: number | null, customTitle: string | null) => {
    setLoading(true);
    try {
      const body = tmdbId
        ? { cycleId, indicatedBy, tmdbId }
        : { cycleId, indicatedBy, customTitle: customTitle ?? title };

      const res = await fetch(`${API_URL}/api/nominations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setTitle('');
        setIndicatedBy('');
        setShowDisambiguation(false);
        setSearchResults([]);
        setNoMatchFound(false);
        onSubmitted();
      }
    } catch (err) {
      console.error('Failed to nominate movie:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !indicatedBy.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/nominations/search-tmdb?query=${encodeURIComponent(title)}`);
      const results: TmdbResult[] = res.ok ? await res.json() : [];

      if (results.length === 1) {
        await createNomination(results[0].tmdbId, null);
      } else if (results.length === 0) {
        setNoMatchFound(true);
        setSearchResults([]);
        setShowDisambiguation(true);
        setLoading(false);
      } else {
        setNoMatchFound(false);
        setSearchResults(results);
        setShowDisambiguation(true);
        setLoading(false);
      }
    } catch (err) {
      console.error('TMDB search error:', err);
      setNoMatchFound(true);
      setSearchResults([]);
      setShowDisambiguation(true);
      setLoading(false);
    }
  };

  const closeDisambiguation = () => {
    setShowDisambiguation(false);
    setSearchResults([]);
    setNoMatchFound(false);
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
              <span>Buscando no TMDB...</span>
            </>
          ) : (
            <span>+ Indicar Filme</span>
          )}
        </button>
      </form>

      {showDisambiguation && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121826] border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              {noMatchFound ? '🤔 Nenhuma correspondência encontrada' : '🎬 Vários filmes encontrados'}
            </h3>

            <p className="text-xs text-slate-400">
              {noMatchFound
                ? `Não encontramos "${title}" no TMDB. Você pode adicionar mesmo assim (sem pôster/sinopse automáticos).`
                : 'Selecione a versão correta, ou adicione sem correspondência TMDB:'}
            </p>

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {searchResults.map((result) => (
                  <div
                    key={result.tmdbId}
                    onClick={() => createNomination(result.tmdbId, null)}
                    className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer border bg-slate-900 border-slate-800 hover:border-amber-400/50 text-slate-300 transition"
                  >
                    <img
                      src={result.fullPosterUrl || PLACEHOLDER_POSTER}
                      alt={result.title}
                      className="w-10 h-14 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs truncate text-white">
                        {result.title} {result.releaseYear ? `(${result.releaseYear})` : ''}
                      </h5>
                      <p className="text-[10px] text-slate-400 line-clamp-2">{result.overview}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={closeDisambiguation}
                disabled={loading}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-xl transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => createNomination(null, title)}
                disabled={loading}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold font-mono rounded-xl transition"
              >
                {loading ? 'Salvando...' : 'Adicionar sem TMDB'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}