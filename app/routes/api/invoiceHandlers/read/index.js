const { body, sanitizeBody } = require('express-validator'),
  readInvoices = require('../../../../middleware/invoice/readInvoices');
module.exports = [
  // Validate field.
  body('type')
    .isString()
    .withMessage('Invoice type must be a string value.')
    .exists()
    .withMessage('Invoice type must be specified.')
    .isLength({ max: 100 })
    .withMessage('Invoice type must be max 100 characters long.'),
  body('sort')
    .exists()
    .withMessage('Invoice sort must be specified.'),
  // Sanitize field.
  sanitizeBody('type')
    .escape()
    .trim(),
  sanitizeBody('sort'),
  readInvoices
];
