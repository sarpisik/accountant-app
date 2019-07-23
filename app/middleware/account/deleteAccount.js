const { Account } = require('../../models'),
  // Wrapper middleware
  { errorHandler, withValidatorError } = require('..'),
  // Wrapped middleware
  deleteAccount = ({ body: _id }, res) =>
    Account.findById(_id, (findErr, foundAcc) =>
      findErr
        ? errorHandler(findErr, res)
        : foundAcc == null
        ? errorHandler({ message: 'Account can not found.' }, res)
        : foundAcc.remove(removeErr =>
            removeErr
              ? errorHandler(removeErr, res)
              : res.send({
                  type: 'success',
                  message: 'Account and related invoices has been deleted.'
                })
          )
    );

module.exports = withValidatorError(deleteAccount);
