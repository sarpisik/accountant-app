const { body, sanitizeBody } = require('express-validator'),
  updateAccount = require('../../../../middleware/account/updateAccount');
module.exports = [
  // Validate field.
  body('_id')
    .exists()
    .withMessage('Account _id must be specified.')
    .isMongoId()
    .withMessage('Account _id must be a valid.'),
  body('update')
    .exists()
    .withMessage('Account update must be specified.'),
  // Sanitize field.
  sanitizeBody('_id')
    .escape()
    .trim(),
  sanitizeBody('update'),
  updateAccount
];
