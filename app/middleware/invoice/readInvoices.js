const { Invoice } = require('../../models'),
  { errorHandler, withValidatorError } = require('..'),
  readInvoices = ({ body: { type, sort } }, res) =>
    Invoice.find({ type })
      .sort({ ...sort })
      .exec((error, invoices) => {
        if (error) return errorHandler(error, res);
        if (invoices.length < 1)
          return errorHandler({ message: 'Can not find invoices.' }, res);
        res.send({ invoices });
      });

module.exports = withValidatorError(readInvoices);
