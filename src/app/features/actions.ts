"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { TodoPayload, TodoSchema, TodoStatus } from "./model";

// Ação para criar uma nova tarefa
export async function createTodoAction(data: TodoPayload) {
  const validation = TodoSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors };
  }
  try {
    const { text } = validation.data;
    await prisma.todo.create({
      data: { text },
    });
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { error: "Ocorreu um erro ao criar a tarefa." };
  }
}

// Ação para atualizar o status
export async function updateTodoStatusAction({
  id,
  status,
}: {
  id: string;
  status: TodoStatus;
}) {
  await prisma.todo.update({ where: { id }, data: { status } });
  revalidatePath("/");
}

// Ação para deletar
export async function deleteTodoAction({ id }: { id: string }) {
  await prisma.todo.delete({ where: { id } });
  revalidatePath("/");
}

// Função para buscar os dados no servidor
export async function getTodos() {
  return await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });
}
