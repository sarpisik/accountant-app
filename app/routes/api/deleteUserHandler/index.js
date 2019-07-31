const { body, sanitizeBody } = require('express-validator'),
  deleteUser = require('../../../middleware/user/deleteUser'),
  { withProtect } = require('../../../middleware');
module.exports = [
  // Validate field.
  body('_id')
    .exists()
    .withMessage('User _id must be specified.')
    .isMongoId()
    .withMessage('User _id must be a valid.'),
  // Sanitize field.
  sanitizeBody('_id')
    .escape()
    .trim(),
  withProtect(deleteUser)
];
