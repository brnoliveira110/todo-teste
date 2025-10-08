import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FilterState {
  status: string;
  query: string;
  date: Date | null;
  setFilter: (filter: Partial<Omit<FilterState, "setFilter">>) => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      status: "all",
      query: "",
      date: null,
      setFilter: (filter) => set((state) => ({ ...state, ...filter })),
    }),
    {
      name: "todo-filter-storage", // Nome simples para o localStorage
    }
  )
);
