"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TodoPayload, TodoSchema } from "@/lib/todo-validator";
import { createTodoAction } from "../../actions";
import { useRouter } from "next/navigation";
import { useTodoStore } from "../store/todo-store";

export function TodoForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { addTodo } = useTodoStore.getState();

  const form = useForm<TodoPayload>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      text: "",
    },
  });

  function onSubmit(data: TodoPayload) {
    // Não precisa mais do useTransition para envolver a lógica otimista,
    // pois a UI atualiza instantaneamente.
    // Usaremos o isPending apenas para o estado do botão.

    // ✨ 2. Crie um "todo fantasma" para a UI otimista
    const optimisticTodo = {
      id: crypto.randomUUID(), // ID temporário
      text: data.text,
      status: "PENDING" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // ✨ 3. Adicione o todo à store imediatamente
    addTodo(optimisticTodo);
    form.reset();

    startTransition(() => {
      // ✨ 4. Chame a Server Action
      createTodoAction(data)
        .then((result) => {
          if (result?.error) {
            toast.error("Erro!", {
              description: "Não foi possível criar a tarefa.",
            });
            // Opcional: reverter o estado se a ação falhar
            // removeTodo(optimisticTodo.id);
          } else {
            toast.success("Sucesso!", {
              description: "Sua nova tarefa foi adicionada.",
            });
          }
        })
        .finally(() => {
          // ✨ 5. Sincronize com o servidor para obter o ID real
          router.refresh();
        });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-end gap-4"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Nova Tarefa</FormLabel>
              <FormControl>
                <Input placeholder="O que precisa ser feito?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adicionando...
            </>
          ) : (
            "Adicionar Tarefa"
          )}
        </Button>
      </form>
    </Form>
  );
}
