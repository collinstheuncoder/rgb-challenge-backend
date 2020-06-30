import express from 'express';

import { authController } from '../controllers';
import { validation } from '../middleware';

const authRouter = express.Router();

authRouter
  .route('/signup')
  .post(
    [validation.signupValidationRules(), validation.validate],
    authController.signup
  );
authRouter
  .route('/login')
  .post(
    [validation.loginValidationRules(), validation.validate],
    authController.login
  );

export default authRouter;
