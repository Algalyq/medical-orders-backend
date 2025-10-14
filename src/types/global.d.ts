// Global type definitions
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT?: string;
    DATABASE_URL: string;
  }
}

declare const process: NodeJS.Process;

// Add global Prisma client type
declare global {
  var prisma: import('@prisma/client').PrismaClient | undefined;
}
