import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();



const app = express();

// import routes
import usersRouter from './routes/Users.routes.js';

// settings
app.set('PORT', process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// routes
app.use('/api/auth', usersRouter);


export default app;