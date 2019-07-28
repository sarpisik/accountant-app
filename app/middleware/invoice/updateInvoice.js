const { Invoice } = require('../../models'),
  // Wrapper middleware
  { updateModel } = require('..'),
  // Wrapped middleware
  updateInvoice = updateModel(Invoice);

module.exports = updateInvoice;
