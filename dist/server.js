"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const orders_1 = __importDefault(require("./routes/orders"));
const errorHandler_1 = require("./middleware/errorHandler");
const database_1 = require("./config/database");
const app = (0, express_1.default)();
// Apply CORS FIRST
const corsOptions = {
    origin: '*', // Exact origin of your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Add 'Authorization' if using auth tokens
    credentials: true // Set to false if not using credentials (recommended if unsure)
};
app.use((0, cors_1.default)(corsOptions)); // This should add the headers
// Logging middleware AFTER CORS, BEFORE routes
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
});
app.use(express_1.default.json());
// Routes AFTER middleware
app.use('/api/orders', orders_1.default);
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});
// Error handling LAST
app.use(errorHandler_1.errorHandler);
const PORT = 5000;
const startServer = async () => {
    try {
        await database_1.prisma.$connect();
        console.log('✓ Database connected');
        app.listen(PORT, () => {
            console.log(`✓ Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
process.on('SIGINT', async () => {
    await database_1.prisma.$disconnect();
    process.exit(0);
});
