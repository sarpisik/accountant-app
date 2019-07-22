const { body, sanitizeBody } = require('express-validator'),
  { checkPasswordsMatch } = require('../../../util'),
  userCreator = require('./userCreator');
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
  body('userName')
    .isLength({ min: 1, max: 100 })
    .trim()
    .withMessage('Name must be specified.')
    .isAlphanumeric()
    .withMessage('Name has non-alphanumeric characters.'),
  // Sanitize fields.
  sanitizeBody('email').escape(),
  sanitizeBody('password').escape(),
  sanitizeBody('userName').escape(),
  userCreator
];
