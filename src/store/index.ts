import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createFilterSlice, FilterState } from "./slices/filter-slice";
import { indexedDBStorage } from "./indexeddb-storage";
import { createTodoSlice, TodoState } from "./slices/todo-slice";

type StoreState = FilterState & TodoState;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createFilterSlice(...a),
      ...createTodoSlice(...a),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => ({
        // Define qual storage usar para cada parte do estado
        getItem: async (name) => {
          const str = await indexedDBStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          // Persiste apenas os 'todos' no IndexedDB
          return JSON.stringify({
            state: { todos: state.todos },
            version: 0,
          });
        },
        setItem: async (name, newValue) => {
          const { state, version } = JSON.parse(newValue);
          // Salva filtros no localStorage e todos no IndexedDB
          localStorage.setItem(
            "filter-storage",
            JSON.stringify({
              status: state.status,
              query: state.query,
              date: state.date,
            })
          );
          await indexedDBStorage.setItem(
            name,
            JSON.stringify({ state: { todos: state.todos }, version })
          );
        },
        removeItem: (name) => {
          localStorage.removeItem("filter-storage");
          return indexedDBStorage.removeItem(name);
        },
      })),
      // Opcional: para hidratação do lado do cliente
      skipHydration: true,
    }
  )
);
