import { StateCreator } from "zustand";

export interface FilterState {
  status: string;
  query: string;
  date: Date | null;
  setFilter: (filter: Partial<FilterState>) => void;
}

export const createFilterSlice: StateCreator<FilterState> = (set) => ({
  status: "all",
  query: "",
  date: null,
  setFilter: (filter) => set((state) => ({ ...state, ...filter })),
});
