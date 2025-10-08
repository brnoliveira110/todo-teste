import { getTodos } from "./features/actions";
import { TodoInitializer } from "./features/todo/components/store-initializer";
import { TodoFilters } from "./features/todo/components/todo-filters";
import { TodoForm } from "./features/todo/components/todo-form";
import { TodoList } from "./features/todo/components/todo-list";

export default async function HomePage() {
  // 1. Controller (Server) busca dados do Model
  const initialTodos = await getTodos();

  return (
    <main className="container mx-auto p-4">
      {/* Componente para hidratar a store do cliente */}
      <TodoInitializer todos={initialTodos} />

      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">To-Do List</h1>
        <div className="space-y-6">
          {/* Views */}
          <TodoForm />
          <TodoFilters />
          <TodoList />
        </div>
      </div>
    </main>
  );
}
