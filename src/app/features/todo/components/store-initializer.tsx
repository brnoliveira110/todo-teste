"use client";

import { useRef, useEffect } from "react";
import { useTodoStore } from "../store/todo-store"; // ✨ Hook atualizado
import { Todo } from "@prisma/client";

interface TodoInitializerProps {
  todos: Todo[];
}

export function TodoInitializer({ todos }: TodoInitializerProps) {
  const initialized = useRef(false);

  useEffect(() => {
    // Inicializa a store apenas uma vez com os dados do servidor
    if (!initialized.current) {
      useTodoStore.getState().initializeTodos(todos);
      initialized.current = true;
    }
  }, [todos]);

  return null;
}
