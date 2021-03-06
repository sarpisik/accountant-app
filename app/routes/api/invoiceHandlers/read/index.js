const { body, sanitizeBody } = require('express-validator'),
  readInvoice = require('../../../../middleware/invoice/readInvoice'),
  readInvoices = require('../../../../middleware/invoice/readInvoices'),
  { withProtect } = require('../../../../middleware');

module.exports.readInvoice = [
  // Validate field.
  body('searchBy')
    .exists()
    .withMessage('Invoice search param must be specified.'),
  body('keys')
    .exists()
    .withMessage('Invoice keys must be specified.'),
  // Sanitize field.
  sanitizeBody('searchBy'),
  sanitizeBody('keys'),
  withProtect(readInvoice)
];

module.exports.readInvoices = [
  // Validate field.
  body('keys')
    .exists()
    .withMessage('Invoice keys must be specified.'),
  // Sanitize field.
  sanitizeBody('type')
    .escape()
    .trim(),
  sanitizeBody('keys'),
  withProtect(readInvoices)
];
