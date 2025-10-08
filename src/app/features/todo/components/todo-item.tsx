"use client";

import type { Todo } from "@prisma/client";
import { useTransition } from "react";

import { Loader2, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteTodoAction, updateTodoStatusAction } from "../actions/actions";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isStatusPending, startStatusTransition] = useTransition();
  //   const { toast } = useToast();

  const handleStatusChange = (status: "PENDING" | "IN_PROGRESS" | "DONE") => {
    startStatusTransition(async () => {
      await updateTodoStatusAction({ id: todo.id, status });
      //   toast({ title: 'Status atualizado com sucesso!' });
    });
  };

  const handleDelete = () => {
    startDeleteTransition(async () => {
      await deleteTodoAction({ id: todo.id });
      //   toast({ title: 'Tarefa removida!', variant: 'destructive' });
    });
  };

  const getStatusVariant = () => {
    switch (todo.status) {
      case "DONE":
        return "default";
      case "IN_PROGRESS":
        return "secondary";
      case "PENDING":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between gap-4">
        <div className="flex-grow">
          <p className="font-medium">{todo.text}</p>
          <p className="text-sm text-muted-foreground">
            Criado em: {new Date(todo.createdAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={getStatusVariant()}>
            {todo.status.replace("_", " ")}
          </Badge>

          {isStatusPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Select value={todo.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Mudar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
                <SelectItem value="DONE">Concluído</SelectItem>
              </SelectContent>
            </Select>
          )}

          <Button
            size="icon"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeletePending}
          >
            {isDeletePending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
