"use client";

import { useAppStore } from "@/store";
import { useMemo } from "react";
import { TodoItem } from "./todo-item";

export function TodoList() {
  // Obtém o estado completo e os filtros da store
  const status = useAppStore((state) => state.status);
  const query = useAppStore((state) => state.query);
  const date = useAppStore((state) => state.date);
  const todos = useAppStore((state) => state.todos);

  // Memoiza a lista filtrada para evitar re-cálculos desnecessários
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const statusMatch = status === "all" || todo.status === status;
      const queryMatch = todo.text.toLowerCase().includes(query.toLowerCase());

      const dateMatch = (() => {
        if (!date) return true;
        const todoDate = new Date(todo.createdAt);
        const filterDate = new Date(date);
        return (
          todoDate.getFullYear() === filterDate.getFullYear() &&
          todoDate.getMonth() === filterDate.getMonth() &&
          todoDate.getDate() === filterDate.getDate()
        );
      })();

      return statusMatch && queryMatch && dateMatch;
    });
  }, [todos, status, query, date]);

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center p-8 border-dashed border-2 rounded-lg mt-6">
        <h3 className="text-xl font-semibold">Nenhuma tarefa encontrada.</h3>
        <p className="text-muted-foreground">
          Tente ajustar os filtros ou adicione uma nova tarefa!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
