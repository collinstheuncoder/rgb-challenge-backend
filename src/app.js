import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
// import path from 'path';

import { authRouter, scoresRouter } from './routes';

// DB Config
import './db';

const app = express();

// Middlewares
// app.use(express.static(path.join(__dirname, '../../client/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes Config
app.use('/auth', authRouter);
app.use('/scores', scoresRouter);

// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('../../client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../client', 'build', 'index.html'));
//   });
// }

export default app;
