import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string().cuid().optional(),
  text: z.string().min(3, "A tarefa precisa ter no mínimo 3 caracteres."),
  status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional(),
});

export type TodoPayload = z.infer<typeof TodoSchema>;
