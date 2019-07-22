const { Account } = require('../../models'),
  // Wrapper middleware
  { errorHandler, withValidatorError } = require('..'),
  // Wrapped middleware
  createAccount = ({ body }, res) =>
    new Account({
      ...body
    }).save((saveErr, doc) =>
      // If save failed, respond error.
      // Else, respond created invoice.
      saveErr ? errorHandler(saveErr, res) : res.send(doc)
    );

module.exports = withValidatorError(createAccount);
