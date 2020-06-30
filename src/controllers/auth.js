import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '../models';
import { appSecret } from '../config';

// Generate auth token
function authToken(user) {
  return jwt.sign(
    {
      sub: user._id,
      iat: new Date().getTime(),
    },
    appSecret
  );
}

export default {
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check for email availability
      const foundUser = await User.findOne({ email });

      if (foundUser) {
        return res.status(409).send(`${email} is already in use`);
      }

      const newUser = await User.create({
        username,
        email,
        password,
      });

      const newUserCopy = { ...newUser.toObject() };

      delete newUserCopy.password;
      delete newUserCopy.__v;

      // Assign token to succesfully registered user
      const token = authToken(newUserCopy);

      return res.status(200).send({ user: newUserCopy, token });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username) {
        throw new Error('Please provide username');
      }

      const isEmail = username.includes('@');

      const whereParams = isEmail ? { email: username } : { username };

      const foundUser = await User.findOne(whereParams);

      if (!foundUser) {
        throw new Error(`There was no user corresponding to ${username} found`);
      }

      // Compare passwords
      const doPasswordsMatch = await bcrypt.compare(
        password,
        foundUser.password
      );

      if (!doPasswordsMatch) {
        throw new Error('The password you have entered is incorrect');
      }

      const userCopy = { ...foundUser.toObject() };

      delete userCopy.password;
      delete userCopy.__v;

      // Assign token to succesfully logged in user
      const token = authToken(userCopy);

      return res.status(200).json({ token, user: userCopy });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
};
