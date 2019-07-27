const { body, sanitizeBody } = require('express-validator'),
  updateInvoice = require('../../../../middleware/invoice/updateInvoice');
module.exports = [
  // Validate field.
  body('_id')
    .exists()
    .withMessage('Invoice _id must be specified.')
    .isMongoId()
    .withMessage('Invoice _id must be a valid.'),
  body('no')
    .exists()
    .withMessage('Invoice no must be specified.')
    .isString()
    .withMessage('Must be string value.')
    .isLength({ max: 100 })
    .withMessage('Invoice no must be max 100 characters long.'),
  body('title')
    .exists()
    .withMessage('Invoice title must be specified.')
    .isString()
    .withMessage('Must be string value.')
    .isLength({ max: 100 })
    .withMessage('Invoice title must be max 100 characters long.'),
  body('date')
    .exists()
    .withMessage('Invoice date must be specified.')
    .isString()
    .withMessage('Must be string value.')
    .isLength({ max: 100 })
    .withMessage('Invoice date must be max 100 characters long.'),
  body('account')
    .exists()
    .withMessage('Invoice account must be specified.')
    .isMongoId()
    .withMessage('Invoice account must be valid mongo Id.'),
  body('type')
    .exists()
    .withMessage('Invoice type must be specified.')
    .isString()
    .withMessage('Must be string value.')
    .isLength({ max: 100 })
    .withMessage('Invoice type must be max 100 characters long.'),
  body('amount')
    .exists()
    .withMessage('Invoice amount must be specified.')
    .isNumeric()
    .withMessage('Invoice amount must be numeric value.')
    .isLength({ max: 100 })
    .withMessage('Invoice amount must be max 100 characters long.'),
  body('taxRate')
    .exists()
    .withMessage('Invoice tax rate must be specified.')
    .isNumeric()
    .withMessage('Invoice tax rate must be numeric value.')
    .isLength({ max: 2 })
    .withMessage('Invoice tax rate must be max 2 characters long.'),
  // Sanitize field.
  sanitizeBody('_id')
    .escape()
    .trim(),
  sanitizeBody('no')
    .escape()
    .trim(),
  sanitizeBody('title')
    .escape()
    .trim(),
  sanitizeBody('account')
    .escape()
    .trim(),
  sanitizeBody('type')
    .escape()
    .trim(),
  sanitizeBody('amount')
    .escape()
    .trim(),
  sanitizeBody('taxRate')
    .escape()
    .trim(),
  updateInvoice
];
