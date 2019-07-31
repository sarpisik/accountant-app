const { body, sanitizeBody } = require('express-validator'),
  createAccount = require('../../../../middleware/account/createAccount'),
  { withProtect } = require('../../../../middleware');
module.exports = [
  // Validate fields.
  body('no')
    .isString()
    .exists()
    .withMessage('Account no must be specified.')
    .isLength({ max: 100 })
    .withMessage('Account no must be max 100 characters long.'),
  body('title')
    .isString()
    .exists()
    .withMessage('Account title must be specified.')
    .isLength({ max: 100 })
    .withMessage('Account title must be max 100 characters long.'),
  body('type')
    .isString()
    .exists()
    .withMessage('Account type must be specified.')
    .isLength({ max: 100 })
    .withMessage('Account type must be max 100 characters long.'),
  // Sanitize fields.
  sanitizeBody('no')
    .escape()
    .trim(),
  sanitizeBody('title')
    .escape()
    .trim(),
  sanitizeBody('type')
    .escape()
    .trim(),
  withProtect(createAccount)
];
