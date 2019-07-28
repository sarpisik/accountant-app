const { Invoice } = require('../../models'),
  // Wrapper middleware
  { readModel } = require('..'),
  // Wrapped middleware
  readInvoice = readModel({ Model: Invoice, key: 'invoice' });

module.exports = readInvoice;
