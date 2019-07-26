const { Account } = require('../../models'),
  { errorHandler, withValidatorError } = require('..'),
  readAccount = ({ body: { no, keys } }, res) =>
    Account.findOne({ no }, keys, (error, account) => {
      if (error) return errorHandler(error, res);
      if (account == null)
        return errorHandler({ message: 'Can not find account.' }, res);
      res.send({ account });
    });

module.exports = withValidatorError(readAccount);
