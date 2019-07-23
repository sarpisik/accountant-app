const { Account } = require('../../models'),
  { errorHandler, withValidatorError } = require('..'),
  readAccounts = ({ body: { type, sort } }, res) =>
    Account.find({ type })
      .sort({ ...sort })
      .exec((error, accounts) => {
        if (error) return errorHandler(error, res);
        if (accounts.length < 1)
          return errorHandler({ message: 'Can not find accounts.' }, res);
        res.send({ accounts });
      });

module.exports = withValidatorError(readAccounts);
