import { StoreInitializer } from "./_components/store-initializer";
import { TodoFilters } from "./_components/todo-filters";
import { TodoForm } from "./_components/todo-form";
import { TodoList } from "./_components/todo-list";
import { getTodos } from "./actions/todo-actions";

export default async function HomePage() {
  // 1. Fetch de dados no servidor
  const initialTodos = await getTodos();

  return (
    <main className="container mx-auto p-4">
      {/* 2. Componente para inicializar a store no cliente */}
      <StoreInitializer todos={initialTodos} />

      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <div className="space-y-6">
        <TodoForm />
        <TodoFilters />
        {/* 3. A lista será renderizada no cliente usando os dados da store */}
        <TodoList />
      </div>
    </main>
  );
}
