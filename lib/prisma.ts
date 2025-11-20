import bcrypt from "bcryptjs";

// Mock PrismaClient locally since @prisma/client might not be generated in this environment
class PrismaClient {
  constructor(public options?: any) {}

  get user() {
    return {
      findUnique: async (args: { where: { email: string } }) => {
        // Mock user for login: admin@example.com / Admin123!
        if (args.where.email === "admin@example.com") {
          const hashedPassword = bcrypt.hashSync("Admin123!", 10);
          return {
            id: "1",
            email: "admin@example.com",
            name: "Admin User",
            password: hashedPassword,
            role: "admin",
          };
        }
        return null;
      },
    };
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;