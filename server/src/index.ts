import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRoute from './routes/userRoute.js';
import taskRoute from './routes/taskRoute.js'


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


// middlewares
app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/task', taskRoute);


// connect to database
connectDB();



app.listen(PORT, (): void => {
    console.log(`Server is running at http://localhost:${PORT}`);
});