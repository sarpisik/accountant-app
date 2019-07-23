const { validationResult } = require('express-validator');
module.exports = wrappedFunction => (req, res) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  // If form values are valid, pass wrappedFunction.
  if (errors.isEmpty()) return wrappedFunction(req, res);

  // Else, send error.
  res.status(400).send({ type: 'validation', errors: errors.array() });
};
