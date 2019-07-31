const server = require('../../lib/server'),
  imageHandler = require('./imageHandler'),
  userHandler = require('./userHandlers'),
  editUserHandler = require('./editUserHandler'),
  signInHandler = require('./signInHandler'),
  signUpHandler = require('./signUpHandler'),
  logOutHandler = require('./logOutHandler'),
  validateHandler = require('./validateHandler'),
  deleteUserHandler = require('./deleteUserHandler'),
  {
    readAccount,
    createAccount,
    readAccounts,
    updateAccount,
    deleteAccount
  } = require('./accountHandlers'),
  {
    createInvoice,
    readInvoice,
    readInvoices,
    updateInvoice,
    deleteInvoice
  } = require('./invoiceHandlers');
try {
  // Images for email template
  server.get('/images/:name', imageHandler);

  // Session
  server.use('/api/signin', signInHandler);
  server.use('/api/signup', signUpHandler);
  server.use('/api/logout', logOutHandler);
  server.use('/api/validate/:id', validateHandler);
  server.post('/api/user', userHandler);
  server.put('/api/user/edit', editUserHandler);
  server.delete('/api/user/delete', deleteUserHandler);

  // Account
  server.post('/api/account', readAccount);
  server.post('/api/account/list', readAccounts);
  server.post('/api/account/new', createAccount);
  server.put('/api/account/edit', updateAccount);
  server.delete('/api/account/delete', deleteAccount);

  // Invoice
  server.post('/api/invoice', readInvoice);
  server.post('/api/invoice/new', createInvoice);
  server.post('/api/invoice/list', readInvoices);
  server.put('/api/invoice/edit', updateInvoice);
  server.delete('/api/invoice/delete', deleteInvoice);

  module.exports = server;
} catch (ex) {
  console.error('API Error', ex);
}
