import express from 'express';

import { scoresController } from '../controllers';
import { requireAuthentication } from '../middleware';

const scoresRouter = express.Router();

scoresRouter.route('/').get(scoresController.scores);
scoresRouter
  .route('/new')
  .post(requireAuthentication, scoresController.addScore);

export default scoresRouter;
