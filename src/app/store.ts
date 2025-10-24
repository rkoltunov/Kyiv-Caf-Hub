import { create } from "zustand";
import type { FiltersState } from "../types";

type Store = {
  filters: FiltersState;
  setFilter: <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => void;
  reset: () => void;

  // Авторизация (localStorage)
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
};

export const useStore = create<Store>((set) => ({
  filters: {},
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),
  reset: () => set({ filters: {} }),

  // Авторизация
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    set({ token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));