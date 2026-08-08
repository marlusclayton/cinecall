'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import SpinWheel from '@/components/SpinWheel';
import NominationForm from '@/components/NominationForm';
import AdminControls from '@/components/AdminControls';

interface Category {
  id: number;
  name: string;
}

interface Nomination {
  id: number;
  title: string;
  indicatedBy: string;
  overview: string;
  posterPath: string;
}

interface Cycle {
  id: number;
  status: string;
  category: Category | null;
  nominations: Nomination[];
}

interface TmdbSearchResult {
  tmdbId: number;
  title: string;
  releaseYear: string;
  overview: string;
  posterUrl: string;
}

const PLACEHOLDER_POSTER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='150' viewBox='0 0 100 150'><rect width='100' height='150' fill='%231e293b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-size='24'>🎬</text></svg>";

// AdminControls.tsx and NominationForm.tsx both fall back to localhost:5000
// when NEXT_PUBLIC_API_URL isn't baked into the build. This page was missing
// that fallback, so when the env var wasn't set at build time, every fetch
// below hit "undefined/api/..." and silently failed - leaving `categories`
// empty and the SpinWheel with nothing to draw.
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Dashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCycle, setActiveCycle] = useState<Cycle | null>(null);
  const [loading, setLoading] = useState(true);

  // Edit Modal & Disambiguation State
  const [editingNom, setEditingNom] = useState<Nomination | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editIndicatedBy, setEditIndicatedBy] = useState('');
  const [editOverview, setEditOverview] = useState('');
  const [selectedTmdbId, setSelectedTmdbId] = useState<number | null>(null);
  const [selectedPosterUrl, setSelectedPosterUrl] = useState<string | null>(null);

  const [searchResults, setSearchResults] = useState<TmdbSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const [catRes, cycleRes] = await Promise.all([
        fetch(`${API_URL}/api/categories`),
        fetch(`${API_URL}/api/cycles/active`),
      ]);

      if (catRes.ok) setCategories(await catRes.json());
      if (cycleRes.status === 200) setActiveCycle(await cycleRes.json());
      else if (cycleRes.status === 204) setActiveCycle(null);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCategorySelected = async (category: Category) => {
    try {
      const res = await fetch(`${API_URL}/api/cycles/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId: category.id }),
      });

      if (res.ok) fetchDashboardData();
    } catch (err) {
      console.error('Failed to start cycle:', err);
    }
  };

  const handleDeleteNomination = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover esta indicação?')) return;

    try {
      const res = await fetch(`${API_URL}/api/cycles/nominations/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchDashboardData();
    } catch (err) {
      console.error('Failed to delete nomination:', err);
    }
  };

  const handleOpenEdit = (nom: Nomination) => {
    setEditingNom(nom);
    setEditTitle(nom.title);
    setEditIndicatedBy(nom.indicatedBy);
    setEditOverview(nom.overview || '');
    setSelectedTmdbId(null);
    setSelectedPosterUrl(null);
    setSearchResults([]);
  };

  const handleSearchTmdb = async () => {
    if (!editTitle.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(`${API_URL}/api/cycles/tmdb-search?query=${encodeURIComponent(editTitle)}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data);
      }
    } catch (err) {
      console.error('TMDB Search error:', err);
    } finally {
      setSearching(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingNom) return;
    setUpdating(true);

    try {
      const res = await fetch(`${API_URL}/api/cycles/nominations/${editingNom.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          indicatedBy: editIndicatedBy,
          overview: editOverview,
          tmdbId: selectedTmdbId,
          posterUrl: selectedPosterUrl
        }),
      });

      if (res.ok) {
        setEditingNom(null);
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Failed to update nomination:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 text-xs font-mono uppercase tracking-widest">Carregando CineCall...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-amber-400/20 selection:text-amber-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-4">

        {/* Minimal Header */}
        <header className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎬</span>
            <div className="flex items-baseline gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white font-mono">CineCall</h1>
              <span className="text-slate-500 text-xs hidden sm:inline">• Plataforma de Filmes</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-mono text-slate-300">
            <span className={`w-2 h-2 rounded-full ${activeCycle?.category ? 'bg-amber-400 animate-pulse' : 'bg-slate-600'}`}></span>
            {activeCycle?.category ? 'Ciclo Ativo' : 'Sorteio Pendente'}
          </div>
        </header>

        {/* Compact Admin Panel */}
        <AdminControls onRefresh={fetchDashboardData} />

        {/* Compact Hero Category Banner */}
        {activeCycle?.category ? (
          <section className="relative overflow-hidden bg-[#121826] border border-amber-400/20 rounded-2xl px-5 py-3.5 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-mono uppercase tracking-wider flex-shrink-0">
                  Tema Ativo
                </span>
                <h2 className="text-xl font-extrabold text-white truncate tracking-tight">
                  {activeCycle.category.name}
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400 flex-shrink-0">
                {activeCycle.nominations?.length || 0} Filme(s) Indicado(s)
              </span>
            </div>
          </section>
        ) : (
          <section className="bg-[#121826] border border-slate-800/80 rounded-3xl p-4 shadow-2xl overflow-hidden flex flex-col justify-center items-center">
            <div className="w-full flex flex-col items-center">
              <SpinWheel categories={categories} onCategorySelected={handleCategorySelected} />
            </div>
          </section>
        )}

        {/* Workspace: 1 Col Form | 2 Cols Expanded Movie List */}
        {activeCycle?.category && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start pb-6">
            
            {/* Left: Nomination Form */}
            <div className="md:col-span-1 bg-[#121826] border border-slate-800/80 p-4 rounded-2xl shadow-xl">
              <NominationForm cycleId={activeCycle.id} onSubmitted={fetchDashboardData} />
            </div>

            {/* Right: Maximized Movie List */}
            <div className="md:col-span-2 bg-[#121826] border border-slate-800/80 p-4 rounded-2xl shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-sm">🍿</span>
                  <h3 className="text-sm font-bold text-white tracking-tight">Filmes Indicados</h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {activeCycle.nominations?.length || 0} cadastrados
                </span>
              </div>

              {!activeCycle.nominations || activeCycle.nominations.length === 0 ? (
                <div className="text-center py-10 space-y-1">
                  <p className="text-slate-500 text-xs">Nenhum filme indicado até o momento.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1.5 custom-scrollbar">
                  {activeCycle.nominations.map((nom) => (
                    <div 
                      key={nom.id} 
                      className="flex gap-3.5 p-3 bg-slate-900/60 border border-slate-800 rounded-2xl relative group hover:border-slate-700 transition"
                    >
                      {/* Classic Compact Poster (w-14 h-20) */}
                      <img 
                        src={nom.posterPath || PLACEHOLDER_POSTER} 
                        alt={nom.title} 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = PLACEHOLDER_POSTER;
                        }}
                        className="w-14 h-20 object-cover rounded-xl shadow flex-shrink-0 bg-slate-950 border border-slate-800" 
                      />

                      {/* Content Area with Maximum Space for Synopsis */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-white text-sm truncate">{nom.title}</h4>
                            <span className="text-[11px] text-amber-400/90 font-mono flex-shrink-0">
                              Por: {nom.indicatedBy}
                            </span>
                          </div>
                          {/* Expanded 3-Line Readability Synopsis */}
                          <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                            {nom.overview || 'Sinopse sincronizada do TMDB.'}
                          </p>
                        </div>
                        
                        {/* Action Triggers */}
                        <div className="flex gap-3 pt-1 justify-end border-t border-slate-800/40">
                          <button
                            onClick={() => handleOpenEdit(nom)}
                            className="text-[11px] font-mono text-slate-400 hover:text-amber-400 transition"
                          >
                            ✏️ Editar
                          </button>
                          <button
                            onClick={() => handleDeleteNomination(nom.id)}
                            className="text-[11px] font-mono text-slate-400 hover:text-rose-400 transition"
                          >
                            🗑️ Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </section>
        )}

        {/* Edit & Disambiguation Modal */}
        {editingNom && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#121826] border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
                ✏️ Editar Indicação & Selecionar Filme
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Nome do Filme</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                    <button
                      onClick={handleSearchTmdb}
                      disabled={searching}
                      className="px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl whitespace-nowrap transition"
                    >
                      {searching ? 'Buscando...' : '🔍 Buscar Opções'}
                    </button>
                  </div>
                </div>

                {/* TMDB Matches Picker */}
                {searchResults.length > 0 && (
                  <div className="bg-slate-950 border border-indigo-500/30 p-3 rounded-2xl space-y-2">
                    <span className="text-indigo-400 font-mono text-[11px] uppercase tracking-wider block">
                      Selecione a versão correta do filme:
                    </span>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {searchResults.map((item) => (
                        <div
                          key={item.tmdbId}
                          onClick={() => {
                            setSelectedTmdbId(item.tmdbId);
                            setEditTitle(item.releaseYear ? `${item.title} (${item.releaseYear})` : item.title);
                            setEditOverview(item.overview);
                            if (item.posterUrl) setSelectedPosterUrl(item.posterUrl);
                          }}
                          className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer border transition ${
                            selectedTmdbId === item.tmdbId 
                              ? 'bg-amber-400/10 border-amber-400 text-white' 
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          <img 
                            src={item.posterUrl || PLACEHOLDER_POSTER} 
                            alt={item.title} 
                            className="w-10 h-14 object-cover rounded-lg flex-shrink-0" 
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-xs truncate">
                              {item.title} {item.releaseYear ? `(${item.releaseYear})` : ''}
                            </h5>
                            <p className="text-[10px] text-slate-400 line-clamp-1">{item.overview}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Indicado por</label>
                  <input
                    type="text"
                    value={editIndicatedBy}
                    onChange={(e) => setEditIndicatedBy(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Sinopse</label>
                  <textarea
                    rows={3}
                    value={editOverview}
                    onChange={(e) => setEditOverview(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setEditingNom(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-xl transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={updating}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold font-mono rounded-xl transition"
                >
                  {updating ? 'Salvando...' : 'Salvar Alteração'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
