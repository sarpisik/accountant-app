const { Invoice } = require('../../models'),
  { errorHandler, withValidatorError } = require('..'),
  readInvoice = ({ body: { searchBy, type, keys } }, res) =>
    Invoice.findOne({ type, ...searchBy }, keys, (error, invoice) => {
      if (error) return errorHandler(error, res);
      if (invoice == null)
        return errorHandler({ message: 'Can not find invoice.' }, res);
      res.send({ invoice });
    });

module.exports = withValidatorError(readInvoice);
