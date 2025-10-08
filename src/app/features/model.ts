import { z } from "zod";
import type { Todo } from "@prisma/client";

// Re-exportar o tipo do Prisma para uso no frontend
export type { Todo };
export type TodoStatus = Todo["status"];

// Schema de validação para criação/edição de tarefas
export const TodoSchema = z.object({
  id: z.string().cuid().optional(),
  text: z
    .string()
    .min(3, { message: "A tarefa precisa ter no mínimo 3 caracteres." }),
  status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional(),
});

export type TodoPayload = z.infer<typeof TodoSchema>;
