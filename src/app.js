import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import { authRouter, scoresRouter } from './routes';

// DB Config
import './db';

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Routes Config
app.use('/auth', authRouter);
app.use('/scores', scoresRouter);

export default app;
