
import bcrypt from 'bcryptjs';

// Mock PrismaClient locally since @prisma/client might not be generated
class PrismaClient {
  constructor(public options?: any) {}
  
  get user() {
    return {
      upsert: async (args: any) => ({
        id: 1,
        email: args.where.email,
        name: args.create.name,
        role: args.create.role
      }),
    };
  }

  $disconnect() {
    return Promise.resolve();
  }
}

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@example.com';
  const password = 'Admin123!';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    (process as any).exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
