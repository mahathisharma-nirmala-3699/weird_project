import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
import authRoutes from './Routes/authRoutes.js';
import  dashBoard from './Routes/dashboard.js';

const PORT =  5000;

// Define options for CORS
const corsOptions = {
  origin: '*', 
  allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/users', authRoutes);

// Define route handler for dashboard
app.use('/', dashBoard);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
