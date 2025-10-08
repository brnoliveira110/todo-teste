"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTodoAction } from "../actions/todo-actions";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

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

export function TodoForm() {
  const [isPending, startTransition] = useTransition();
  //   const { toast } = useToast();

  const form = useForm<TodoPayload>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      text: "",
    },
  });

  function onSubmit(data: TodoPayload) {
    startTransition(async () => {
      const result = await createTodoAction(data);

      if (result?.error) {
        // Mostra um toast de erro
        // toast({
        //   title: "Erro!",
        //   description: "Não foi possível criar a tarefa.",
        //   variant: "destructive",
        // });
        return;
      }

      // Limpa o formulário e mostra um toast de sucesso
      form.reset();
      //   toast({
      //     title: "Sucesso!",
      //     description: "Sua nova tarefa foi adicionada.",
      //   });
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
