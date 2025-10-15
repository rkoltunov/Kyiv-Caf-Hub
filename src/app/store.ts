import { create } from 'zustand';
import type { FiltersState } from '../types';

type Store = {
  filters: FiltersState;
  setFilter: <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => void;
  reset: () => void;
};

export const useStore = create<Store>((set) => ({
  filters: {},
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),
  reset: () => set({ filters: {} }),
}));