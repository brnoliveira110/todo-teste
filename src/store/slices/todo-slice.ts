import { StateCreator } from "zustand";
import { Todo } from "@prisma/client"; // Importe o tipo gerado pelo Prisma

export interface TodoState {
  todos: Todo[];
  initializeTodos: (todos: Todo[]) => void;
  // Aqui você pode adicionar ações para otimismo (add, update, remove)
}

export const createTodoSlice: StateCreator<TodoState> = (set) => ({
  todos: [],
  initializeTodos: (todos) => set({ todos }),
});
