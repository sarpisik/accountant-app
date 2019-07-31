const { body, sanitizeBody } = require('express-validator'),
  deleteAccount = require('../../../../middleware/account/deleteAccount'),
  { withProtect } = require('../../../../middleware');
module.exports = [
  // Validate field.
  body('_id')
    .exists()
    .withMessage('Account _id must be specified.')
    .isMongoId()
    .withMessage('Account _id must be a valid.'),
  // Sanitize field.
  sanitizeBody('_id')
    .escape()
    .trim(),
  withProtect(deleteAccount)
];
