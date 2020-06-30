/* eslint-disable func-names */

import mongoose from 'mongoose';

const { Schema } = mongoose;

const ScoreSchema = new Schema(
  {
    scoreValue: {
      type: Number,
      required: true,
    },
    scoredBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    gameDifficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'expert'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Score = mongoose.model('Score', ScoreSchema);

export default Score;
