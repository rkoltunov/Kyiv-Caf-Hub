import { create } from "zustand";
import type { FiltersState } from "../types";

type Store = {
  filters: FiltersState;
  setFilter: <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => void;
  reset: () => void;

  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;

  // 🟣 Новое — флаг режима админки
  isAdminMode: boolean;
  setAdminMode: (value: boolean) => void;

  walkingTimes: Record<string, string>;
  setWalkingTime: (cafeId: string, time: string) => void;
};

export const useStore = create<Store>((set) => ({
  filters: {},
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),
  reset: () => set({ filters: {} }),

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

  // 🟣 Новое
  isAdminMode: false,
  setAdminMode: (value) => set({ isAdminMode: value }),

  walkingTimes: {},
  setWalkingTime: (cafeId, time) =>
    set((s) => ({ walkingTimes: { ...s.walkingTimes, [cafeId]: time } })),
}));
