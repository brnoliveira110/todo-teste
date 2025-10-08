import { PrismaClient } from "@prisma/client";

// Declara uma variável global para armazenar a instância do Prisma.
// Isso é necessário para que a instância persista entre os hot-reloads no desenvolvimento.
declare global {
  var prisma: PrismaClient | undefined;
}

// Cria a instância do Prisma. Se já existir uma instância global, ela é reutilizada.
// Caso contrário, uma nova instância é criada.
export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    // Opcional: para logar as queries executadas pelo Prisma no console.
    // Muito útil durante o desenvolvimento.
    log: ["query", "info", "warn", "error"],
  });

// Em ambiente de desenvolvimento, atribuímos a instância criada à variável global.
// Em produção, isso não é necessário, pois o código é inicializado apenas uma vez.
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
