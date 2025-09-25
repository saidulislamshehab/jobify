import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDb from './db/connect.js';
import router from './routes/routes.js';
import clientRouter from './routes/clientRoutes.js';

dotenv.config();
// Require JWT secret in non-development environments
if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET not set in environment variables.');
  if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    throw new Error('JWT_SECRET is required in production');
  }
  // In development, still allow run but discourage
  process.env.JWT_SECRET = 'dev-only-insecure-secret-change-me';
}
connectDb();

const app = express();
// Tighten CORS: allow localhost client by default; customize via CORS_ORIGIN env
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json({ limit: '50mb' })); // Increased limit for image uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Increased limit for image uploads

app.use('/api/jobseekers', router);
app.use('/api/projects', clientRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'File too large. Please upload an image smaller than 10MB.'
    });
  }
  
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));