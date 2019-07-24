const { body, sanitizeBody } = require('express-validator'),
  deleteInvoice = require('../../../../middleware/invoice/deleteInvoice');
module.exports = [
  // Validate field.
  body('_id')
    .exists()
    .withMessage('Invoice _id must be specified.')
    .isMongoId()
    .withMessage('Invoice _id must be a valid.'),
  // Sanitize field.
  sanitizeBody('_id')
    .escape()
    .trim(),
  deleteInvoice
];
