const { Account } = require('../../models'),
  // Wrapper middleware
  { errorHandler, withValidatorError } = require('..'),
  // Wrapped middleware
  updateAccount = ({ body: { _id, update } }, res) =>
    Account.updateOne({ _id }, { ...update }, (updateErr, doc) =>
      updateErr
        ? errorHandler(updateErr, res)
        : doc.nModified < 1
        ? errorHandler(
            {
              message: 'Could not edit field. Please check id or update field.'
            },
            res
          )
        : res.send({ message: 'Update succeed.' })
    );

module.exports = withValidatorError(updateAccount);
