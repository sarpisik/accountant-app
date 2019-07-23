const { body, sanitizeBody } = require('express-validator'),
  readAccounts = require('../../../../middleware/account/readAccounts');
module.exports = [
  // Validate field.
  body('type')
    .isString()
    .withMessage('Account type must be a string value.')
    .exists()
    .withMessage('Account type must be specified.')
    .isLength({ max: 100 })
    .withMessage('Account type must be max 100 characters long.'),
  body('sort')
    .exists()
    .withMessage('Account sort must be specified.'),
  // Sanitize field.
  sanitizeBody('type')
    .escape()
    .trim(),
  sanitizeBody('sort'),
  readAccounts
];
