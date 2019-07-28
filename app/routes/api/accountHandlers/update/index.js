const { body, sanitizeBody } = require('express-validator'),
  updateAccount = require('../../../../middleware/account/updateAccount');
module.exports = [
  // Validate field.
  body('_id')
    .exists()
    .withMessage('Invoice _id must be specified.')
    .isMongoId()
    .withMessage('Invoice _id must be a valid.'),
  body('no')
    .exists()
    .withMessage('Invoice no must be specified.')
    .isString()
    .withMessage('Must be string value.')
    .isLength({ max: 100 })
    .withMessage('Invoice no must be max 100 characters long.'),
  body('title')
    .exists()
    .withMessage('Invoice title must be specified.')
    .isString()
    .withMessage('Must be string value.')
    .isLength({ max: 100 })
    .withMessage('Invoice title must be max 100 characters long.'),
  // Sanitize field.
  sanitizeBody('_id')
    .escape()
    .trim(),
  sanitizeBody('no')
    .escape()
    .trim(),
  sanitizeBody('title')
    .escape()
    .trim(),
  updateAccount
];
