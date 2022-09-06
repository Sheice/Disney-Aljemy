import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app = express();

// import routes

// settings
app.set('PORT', process.env.PORT || 4000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('dev'));

// routes


export default app;