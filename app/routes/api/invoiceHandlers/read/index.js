const { body, sanitizeBody } = require('express-validator'),
  readInvoice = require('../../../../middleware/invoice/readInvoice'),
  readInvoices = require('../../../../middleware/invoice/readInvoices');

module.exports.readInvoice = [
  // Validate field.
  body('type')
    .isString()
    .withMessage('Invoice type must be a string value.')
    .exists()
    .withMessage('Invoice type must be specified.')
    .isLength({ max: 100 })
    .withMessage('Invoice type must be max 100 characters long.'),
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
  body('type')
    .isString()
    .withMessage('Invoice type must be a string value.')
    .exists()
    .withMessage('Invoice type must be specified.')
    .isLength({ max: 100 })
    .withMessage('Invoice type must be max 100 characters long.'),
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
