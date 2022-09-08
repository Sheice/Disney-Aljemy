import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

dotenv.config();



const app = express();

// import routes
import usersRouter from './routes/Users.routes.js';
import characterRouter from './routes/Characters.routes.js';
import moviesRouter from './routes/Movies.routes.js';

// settings
app.set('PORT', process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

// routes
app.use('/api/auth', usersRouter);
app.use('/api/characters',characterRouter);
app.use('/api/movies', moviesRouter);


export default app;