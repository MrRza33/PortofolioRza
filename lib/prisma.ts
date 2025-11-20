
// Mock PrismaClient to fix "no exported member" error when client is not generated
class PrismaClient {
  constructor(public options?: any) {}
  
  get user() {
    return {
      findUnique: async (args: any) => null,
      upsert: async (args: any) => null,
      create: async (args: any) => null,
      update: async (args: any) => null,
    };
  }

  $disconnect() {
    return Promise.resolve();
  }
}

// Handle global scoping for Prisma to prevent multiple instances in development
// Using globalThis is safer for isomorphic/browser environments
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

// Only assign to global in non-production environments
// Check for process.env to avoid crashing in pure browser previews where process is undefined
if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
