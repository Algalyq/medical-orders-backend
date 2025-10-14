
import { PrismaClient } from '@prisma/client';

declare const global: {
  prisma?: PrismaClient;
};

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;