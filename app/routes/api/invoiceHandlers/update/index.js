const { body, sanitizeBody } = require('express-validator'),
  updateInvoice = require('../../../../middleware/invoice/updateInvoice');
module.exports = [
  // Validate field.
  body('_id')
    .exists()
    .withMessage('Invoice _id must be specified.')
    .isMongoId()
    .withMessage('Invoice _id must be a valid.'),
  body('update')
    .exists()
    .withMessage('Invoice update must be specified.'),
  // Sanitize field.
  sanitizeBody('_id')
    .escape()
    .trim(),
  sanitizeBody('update'),
  updateInvoice
];
