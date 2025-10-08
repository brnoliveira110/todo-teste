"use client";

import { useRef, useEffect } from "react";
import { useAppStore } from "@/store";
import { Todo } from "@prisma/client";

interface StoreInitializerProps {
  todos: Todo[];
}

export function StoreInitializer({ todos }: StoreInitializerProps) {
  const initialized = useRef(false);

  useEffect(() => {
    // Inicializa a store apenas uma vez com os dados do servidor
    if (!initialized.current) {
      useAppStore.getState().initializeTodos(todos);
      initialized.current = true;
    }
  }, [todos]);

  return null; // Este componente não renderiza nada
}
