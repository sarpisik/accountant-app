const { each } = require('async');
module.exports = connection =>
  async function(next) {
    const self = this,
      Invoice = connection.model('Invoice');
    each(
      self.invoices,
      (invoiceId, callBack) => Invoice.findByIdAndDelete(invoiceId, callBack),
      deleteErr => (deleteErr ? next(deleteErr) : next())
    );
  };
