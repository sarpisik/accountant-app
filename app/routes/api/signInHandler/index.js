const { body, sanitizeBody } = require('express-validator'),
  { checkPasswordsMatch } = require('../../../util'),
  userValidator = require('./userValidator');
module.exports = [
  // Validate fields.
  body('email')
    .isEmail()
    .isLength({ min: 4, max: 100 })
    .withMessage('Email address must be between 4-100 characters long.')
    .normalizeEmail()
    .withMessage('Email must be specified'),
  body('password')
    .isLength({ min: 5, max: 100 })
    .withMessage('Password must be at least 5 chars long')
    .custom(checkPasswordsMatch),
  // Sanitize fields.
  sanitizeBody('email').escape(),
  sanitizeBody('password').escape(),
  userValidator
];
