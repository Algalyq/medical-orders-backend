import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import ordersRouter from './routes/orders';
import { errorHandler } from './middleware/errorHandler';
import { prisma } from './config/database';

const app = express();

// Apply CORS FIRST
const corsOptions = {
  origin: true,  // Exact origin of your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],  // Add 'Authorization' if using auth tokens
  credentials: true  // Set to false if not using credentials (recommended if unsure)
};
app.use(cors(corsOptions));  // This should add the headers


// Logging middleware AFTER CORS, BEFORE routes
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

app.use(express.json());

// Routes AFTER middleware
app.use('/api/orders', ordersRouter);

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

// Error handling LAST
app.use(errorHandler);

const PORT = 5000;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('✓ Database connected');

    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});