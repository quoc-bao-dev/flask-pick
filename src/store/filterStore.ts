import { create } from "zustand";

interface FilterStore {
  filters: string[];
  setFilters: (filters: string[]) => void;
}

export const filterStore =  create<FilterStore>((set) => ({
  filters: [],
  setFilters: (filters) => set({ filters }),
}));