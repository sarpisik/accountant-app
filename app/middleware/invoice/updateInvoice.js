const { Invoice } = require('../../models'),
  // Wrapper middleware
  { errorHandler, withValidatorError } = require('..'),
  // Wrapped middleware
  updateInvoice = ({ body: { _id, ...rest } }, res) =>
    Invoice.updateOne({ _id }, { ...rest }, (updateErr, doc) =>
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

module.exports = withValidatorError(updateInvoice);
