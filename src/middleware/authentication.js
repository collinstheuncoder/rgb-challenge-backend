import jwt from 'jsonwebtoken';

import { User } from '../models';
import { appSecret } from '../config';

// eslint-disable-next-line
async function requireAuthentication(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send('You must be logged in to proceed with action');
  }

  const token = authHeader.slice(7, authHeader.length).trimLeft();
  const { sub } = jwt.decode(token, appSecret);
  const foundUser = await User.findById(sub);

  if (!foundUser) {
    return res.status(401).send('User not found');
  }

  req.user = foundUser;

  next();
}

export default requireAuthentication;
