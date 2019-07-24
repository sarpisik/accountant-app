const createInvoice = require('./create'),
  readInvoices = require('./read'),
  updateInvoice = require('./update'),
  deleteInvoice = require('./delete');

module.exports = {
  createInvoice,
  readInvoices,
  updateInvoice,
  deleteInvoice
};
