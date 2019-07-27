const createInvoice = require('./create'),
  { readInvoice, readInvoices } = require('./read'),
  updateInvoice = require('./update'),
  deleteInvoice = require('./delete');

module.exports = {
  createInvoice,
  readInvoices,
  readInvoice,
  updateInvoice,
  deleteInvoice
};
