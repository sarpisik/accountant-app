const { body, sanitizeBody } = require('express-validator'),
  readAccount = require('../../../../middleware/account/readAccount'),
  readAccounts = require('../../../../middleware/account/readAccounts'),
  { withProtect } = require('../../../../middleware');

module.exports.readAccount = [
  // Validate field.
  body('searchBy')
    .exists()
    .withMessage('Account search param must be specified.'),
  body('keys')
    .exists()
    .withMessage('Account keys must be specified.'),
  // Sanitize field.
  sanitizeBody('searchBy'),
  sanitizeBody('keys'),
  withProtect(readAccount)
];

module.exports.readAccounts = [
  // Validate field.
  body('type')
    .isString()
    .withMessage('Account type must be a string value.')
    .exists()
    .withMessage('Account type must be specified.')
    .isLength({ max: 100 })
    .withMessage('Account type must be max 100 characters long.'),
  body('keys')
    .exists()
    .withMessage('Account keys must be specified.'),
  // Sanitize field.
  sanitizeBody('type')
    .escape()
    .trim(),
  sanitizeBody('keys'),
  withProtect(readAccounts)
];
