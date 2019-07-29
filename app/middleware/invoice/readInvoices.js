const { Invoice } = require('../../models'),
  // Wrapper middleware
  { readModels } = require('..'),
  // Wrapped middleware
  readInvoices = readModels({ Model: Invoice, key: 'invoices' });

module.exports = readInvoices;
