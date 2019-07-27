const { body, sanitizeBody } = require('express-validator'),
  readInvoice = require('../../../../middleware/invoice/readInvoice'),
  readInvoices = require('../../../../middleware/invoice/readInvoices');

module.exports.readInvoice = [
  // Validate field.
  body('searchBy')
    .exists()
    .withMessage('Invoice keys must be specified.'),
  body('keys')
    .exists()
    .withMessage('Invoice keys must be specified.'),
  // Sanitize field.
  sanitizeBody('type')
    .escape()
    .trim(),
  sanitizeBody('searchBy'),
  sanitizeBody('keys'),
  readInvoice
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
  readInvoices
];
