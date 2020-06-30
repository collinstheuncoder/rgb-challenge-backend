import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import { authRouter, scoresRouter } from './routes';

// DB Config
import './db';

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://rgb-challenge-1988.netlify.app',
];

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);

      if (!allowedOrigins.includes(origin)) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';

        return cb(new Error(msg), false);
      }
      return cb(null, true);
    },
  })
);

// Routes Config
app.use('/auth', authRouter);
app.use('/scores', scoresRouter);

export default app;
