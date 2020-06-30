import { body, check, validationResult } from 'express-validator';

export const signupValidationRules = () => {
  return [
    check('username')
      .isLength({ min: 4, max: 128 })
      .isAlpha()
      .withMessage('Username must be between 4 and 128 characters long'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid email'),
    check('password')
      .isLength({ min: 6 })
      .trim()
      .withMessage('Password must be at least 6 characters long'),
  ];
};

export const loginValidationRules = () => {
  return [body('username'), body('password').trim()];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
