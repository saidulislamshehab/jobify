import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDb from './db/connect.js';
import router from './routes/routes.js';

dotenv.config();
connectDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));