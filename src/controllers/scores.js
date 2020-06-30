import { Score } from '../models';

export default {
  addScore: async (req, res) => {
    try {
      const newScore = await Score.create({
        ...req.body,
        scoredBy: req.user._id,
      });

      return res.status(200).send({ newScore });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

  scores: async (req, res) => {
    const { gameDifficulty, scoredBy } = req.query;

    let whereParams;

    if (!gameDifficulty && !scoredBy) {
      whereParams = {};
    }

    if (gameDifficulty) {
      whereParams = { gameDifficulty };
    }

    if (scoredBy) {
      whereParams = { scoredBy };
    }

    const limitValue = gameDifficulty || scoredBy ? 10 : undefined;

    try {
      const foundScores = await Score.find(whereParams)
        .sort('-scoreValue')
        .limit(limitValue)
        .populate({
          path: 'scoredBy',
          select: 'username _id',
        });

      return res.status(200).send({ scores: foundScores });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
};
