import { useCallback, useEffect, useState } from 'react';

const KEY = 'quantumpaedia.library.v1';
const LISTENERS = new Set();

const EMPTY = {
  saved: [],
  collections: [],
  notes: [],
  history: [],
  projects: [],
  searches: [],
  settings: { readingMode: 'standard', accent: 'cyan', fontScale: 1, reducedMotion: false },
};

function read() {
  if (typeof window === 'undefined') return { ...EMPTY };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw);
    return { ...EMPTY, ...parsed, settings: { ...EMPTY.settings, ...(parsed.settings || {}) } };
  } catch {
    return { ...EMPTY };
  }
}

function commit(next) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — session-only */
  }
  LISTENERS.forEach((fn) => fn(next));
}

export function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export const library = {
  get: read,

  toggleSave(item) {
    const state = read();
    const exists = state.saved.some((s) => s.id === item.id);
    const saved = exists ? state.saved.filter((s) => s.id !== item.id) : [{ ...item, savedAt: new Date().toISOString() }, ...state.saved];
    commit({ ...state, saved });
    return !exists;
  },

  isSaved(id) {
    return read().saved.some((s) => s.id === id);
  },

  removeSaved(id) {
    const state = read();
    commit({
      ...state,
      saved: state.saved.filter((s) => s.id !== id),
      collections: state.collections.map((c) => ({ ...c, itemIds: c.itemIds.filter((i) => i !== id) })),
    });
  },

  createCollection(name, description = '') {
    const state = read();
    const collection = { id: uid('col'), name, description, itemIds: [], createdAt: new Date().toISOString() };
    commit({ ...state, collections: [collection, ...state.collections] });
    return collection;
  },

  updateCollection(id, patch) {
    const state = read();
    commit({ ...state, collections: state.collections.map((c) => (c.id === id ? { ...c, ...patch } : c)) });
  },

  deleteCollection(id) {
    const state = read();
    commit({ ...state, collections: state.collections.filter((c) => c.id !== id) });
  },

  toggleInCollection(collectionId, itemId) {
    const state = read();
    commit({
      ...state,
      collections: state.collections.map((c) =>
        c.id === collectionId
          ? { ...c, itemIds: c.itemIds.includes(itemId) ? c.itemIds.filter((i) => i !== itemId) : [...c.itemIds, itemId] }
          : c
      ),
    });
  },

  addNote(note) {
    const state = read();
    const record = { id: uid('note'), createdAt: new Date().toISOString(), ...note };
    commit({ ...state, notes: [record, ...state.notes] });
    return record;
  },

  updateNote(id, patch) {
    const state = read();
    commit({ ...state, notes: state.notes.map((n) => (n.id === id ? { ...n, ...patch } : n)) });
  },

  deleteNote(id) {
    const state = read();
    commit({ ...state, notes: state.notes.filter((n) => n.id !== id) });
  },

  recordView(entry) {
    const state = read();
    const history = [ { ...entry, at: new Date().toISOString() }, ...state.history.filter((h) => h.id !== entry.id) ].slice(0, 40);
    commit({ ...state, history });
  },

  clearHistory() {
    const state = read();
    commit({ ...state, history: [] });
  },

  addSearch(term) {
    const clean = term.trim();
    if (!clean) return;
    const state = read();
    const searches = [clean, ...state.searches.filter((s) => s.toLowerCase() !== clean.toLowerCase())].slice(0, 8);
    commit({ ...state, searches });
  },

  clearSearches() {
    const state = read();
    commit({ ...state, searches: [] });
  },

  createProject(project) {
    const state = read();
    const record = {
      id: uid('proj'),
      status: 'planning',
      paperIds: [],
      createdAt: new Date().toISOString(),
      ...project,
    };
    commit({ ...state, projects: [record, ...state.projects] });
    return record;
  },

  updateProject(id, patch) {
    const state = read();
    commit({ ...state, projects: state.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)) });
  },

  deleteProject(id) {
    const state = read();
    commit({ ...state, projects: state.projects.filter((p) => p.id !== id) });
  },

  togglePaperInProject(projectId, paperId) {
    const state = read();
    commit({
      ...state,
      projects: state.projects.map((p) =>
        p.id === projectId
          ? { ...p, paperIds: p.paperIds.includes(paperId) ? p.paperIds.filter((x) => x !== paperId) : [...p.paperIds, paperId] }
          : p
      ),
    });
  },

  setSettings(patch) {
    const state = read();
    commit({ ...state, settings: { ...state.settings, ...patch } });
  },

  resetAll() {
    commit({ ...EMPTY, settings: read().settings });
  },
};

export function useLibrary() {
  const [state, setState] = useState(read);

  useEffect(() => {
    const listener = (next) => setState(next);
    LISTENERS.add(listener);
    const onStorage = () => setState(read());
    window.addEventListener('storage', onStorage);
    return () => {
      LISTENERS.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const refresh = useCallback(() => setState(read()), []);

  return { ...state, refresh, library };
}

export function useSaved(id) {
  const [saved, setSaved] = useState(() => library.isSaved(id));
  useEffect(() => {
    const listener = () => setSaved(library.isSaved(id));
    LISTENERS.add(listener);
    return () => LISTENERS.delete(listener);
  }, [id]);
  return [saved, () => setSaved(library.toggleSave(id ? { id } : { id: '' }))];
}