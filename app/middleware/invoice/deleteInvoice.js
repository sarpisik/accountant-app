const { Invoice } = require('../../models'),
  // Wrapper middleware
  { errorHandler, withValidatorError } = require('..'),
  // Wrapped middleware
  deleteInvoice = ({ body: _id }, res) =>
    Invoice.findById(_id, (findErr, foundInv) =>
      findErr
        ? errorHandler(findErr, res)
        : foundInv == null
        ? errorHandler({ message: 'Invoice can not found.' }, res)
        : foundInv.remove(removeErr =>
            removeErr
              ? errorHandler(removeErr, res)
              : res.send({
                  type: 'success',
                  message: 'Invoice has been deleted.'
                })
          )
    );

module.exports = withValidatorError(deleteInvoice);
