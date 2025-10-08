import { Todo } from "@prisma/client";
import { create } from "zustand";

interface TodoState {
  todos: Todo[];
  initializeTodos: (todos: Todo[]) => void;
  // ✨ Ações para UI Otimista
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, status: Todo["status"]) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  initializeTodos: (todos) => set({ todos }),

  // Adiciona uma nova tarefa na lista localmente
  addTodo: (todo) => set((state) => ({ todos: [todo, ...state.todos] })),

  // Remove uma tarefa localmente
  removeTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),

  // Atualiza uma tarefa localmente
  updateTodo: (id, status) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? { ...t, status } : t)),
    })),
}));
