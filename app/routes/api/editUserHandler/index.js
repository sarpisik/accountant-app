const { body, sanitizeBody } = require('express-validator'),
  { checkPasswordsMatch } = require('../../../util'),
  { withProtect, updateUser } = require('../../../middleware');
module.exports = [
  // Validate fields.
  body('password')
    .isLength({ min: 5, max: 100 })
    .withMessage('Password must be at least 5 chars long')
    .custom(checkPasswordsMatch),
  // Sanitize fields.
  sanitizeBody('password').escape(),
  withProtect(updateUser)
];
