/* eslint-disable func-names */

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import validator from 'validator';

import Score from './score';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      validate: (value) =>
        validator.isLength(value, {
          min: 3,
          max: 24,
        }),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: (value) => validator.isEmail(value),
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt/hash password prior to saving user
UserSchema.pre('save', async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  user.password = hashedPassword;

  next();
});

UserSchema.post('deleteOne', { document: true, query: false }, async function (
  next
) {
  const user = this;

  // Delete all game scores by (this) user
  await Score.deleteMany({ scoredBy: user._id });

  next();
});

// Compare passwords on login
UserSchema.methods.comparePasswords = async function (submittedPassword) {
  const user = this;

  try {
    return await bcrypt.compare(submittedPassword, user.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', UserSchema);

export default User;
