import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import ordersRouter from './routes/orders';
import { errorHandler } from './middleware/errorHandler';
import { prisma } from './config/database';

const app = express();

// Define allowed origins explicitly
const allowedOrigins = [
  'https://your-domain.com', // Replace with your frontend domain
  'https://medical-orders-frontend.vercel.app', // Include subdomains if needed
  'http://localhost:3000', // For local development
];

// Apply CORS FIRST
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (e.g., server-to-server requests) or if origin is in allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));

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