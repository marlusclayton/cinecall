'use client';

import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type Category = {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
};

export default function CategoryManager({
  onClose,
  onChange,
}: {
  onClose: () => void;
  onChange: () => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const loadCategories = () => {
    setLoading(true);
    fetch(`${API_URL}/api/categories/all`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Failed to load categories', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const notifyChange = () => {
    loadCategories();
    onChange();
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setLoading(true);
    const res = await fetch(`${API_URL}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim(), description: newDescription.trim() || null }),
    });
    if (res.ok) {
      setNewName('');
      setNewDescription('');
      notifyChange();
    } else {
      const body = await res.json().catch(() => null);
      alert(body?.message || 'Falha ao criar categoria.');
      setLoading(false);
    }
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDescription(cat.description || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditDescription('');
  };

  const handleSaveEdit = async (id: number) => {
    if (!editName.trim()) return;
    setLoading(true);
    const res = await fetch(`${API_URL}/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName.trim(), description: editDescription.trim() || null }),
    });
    if (res.ok) {
      cancelEdit();
      notifyChange();
    } else {
      const body = await res.json().catch(() => null);
      alert(body?.message || 'Falha ao atualizar categoria.');
      setLoading(false);
    }
  };

  const handleToggle = async (id: number) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/api/categories/${id}/toggle-active`, { method: 'PATCH' });
    if (res.ok) {
      notifyChange();
    } else {
      alert('Falha ao alterar status da categoria.');
      setLoading(false);
    }
  };

  const handleDelete = async (cat: Category) => {
    if (!confirm(`Excluir a categoria "${cat.name}" permanentemente?`)) return;
    setLoading(true);
    const res = await fetch(`${API_URL}/api/categories/${cat.id}`, { method: 'DELETE' });
    if (res.ok) {
      notifyChange();
    } else {
      const body = await res.json().catch(() => null);
      alert(body?.message || 'Falha ao excluir categoria.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#121826] border border-slate-800/80 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-800/80 px-5 py-4">
          <h3 className="text-sm font-mono uppercase tracking-widest text-slate-300">
            Gerenciar Categorias
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 text-lg leading-none px-2"
          >
            ✕
          </button>
        </div>

        {/* Add new category */}
        <div className="px-5 py-4 border-b border-slate-800/80 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
            Nova Categoria
          </span>
          <div className="flex gap-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nome"
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400/50 flex-1"
            />
            <input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Descrição (opcional)"
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400/50 flex-1"
            />
            <button
              onClick={handleCreate}
              disabled={loading || !newName.trim()}
              className="bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-xl transition flex-shrink-0"
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 px-5 py-3 space-y-2">
          {categories.length === 0 && !loading && (
            <p className="text-xs text-slate-500 text-center py-6">Nenhuma categoria cadastrada.</p>
          )}
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 flex items-start gap-3"
            >
              {editingId === cat.id ? (
                <div className="flex-1 space-y-2">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white w-full focus:outline-none focus:border-amber-400/50"
                  />
                  <input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Descrição (opcional)"
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white w-full focus:outline-none focus:border-amber-400/50"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(cat.id)}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-bold px-2.5 py-1 rounded-lg transition"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium px-2.5 py-1 rounded-lg transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-100 truncate">{cat.name}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                          cat.isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}
                      >
                        {cat.isActive ? 'Ativa' : 'Inativa'}
                      </span>
                    </div>
                    {cat.description && (
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{cat.description}</p>
                    )}
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleToggle(cat.id)}
                      disabled={loading}
                      title={cat.isActive ? 'Desativar' : 'Ativar'}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium px-2.5 py-1 rounded-lg transition"
                    >
                      {cat.isActive ? '⏸️' : '▶️'}
                    </button>
                    <button
                      onClick={() => startEdit(cat)}
                      disabled={loading}
                      title="Editar"
                      className="bg-slate-800 hover:bg-slate-700 text-sky-400 text-[11px] font-medium px-2.5 py-1 rounded-lg transition"
                    >
                      ✏️
                    </button>
                    {/* <button
                      onClick={() => handleDelete(cat)}
                      disabled={loading}
                      title="Excluir"
                      className="bg-slate-800 hover:bg-slate-700 text-rose-400 text-[11px] font-medium px-2.5 py-1 rounded-lg transition"
                    >
                      🗑️
                    </button> */}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
