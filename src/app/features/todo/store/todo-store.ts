import { Todo } from "@prisma/client";
import { create } from "zustand";

interface TodoState {
  todos: Todo[];
  initializeTodos: (todos: Todo[]) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  initializeTodos: (todos) => set({ todos }),
}));
