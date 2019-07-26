const server = require('../../lib/server'),
  userHandler = require('./userHandlers'),
  signInHandler = require('./signInHandler'),
  signUpHandler = require('./signUpHandler'),
  logOutHandler = require('./logOutHandler'),
  validateHandler = require('./validateHandler'),
  {
    readAccount,
    createAccount,
    readAccounts,
    updateAccount,
    deleteAccount
  } = require('./accountHandlers'),
  {
    createInvoice,
    readInvoices,
    updateInvoice,
    deleteInvoice
  } = require('./invoiceHandlers'),
  meHandler = require('./meHandler');
try {
  server.use('/api/me', meHandler);
  server.use('/api/signIn', signInHandler);
  server.use('/api/signUp', signUpHandler);
  server.use('/api/logOut', logOutHandler);
  server.use('/api/validate/:id', validateHandler);

  server.use('/api/user', userHandler);
  server.get('/api/version', (req, res) => {
    res.json({
      version: 1.0
    });
  });

  // Account
  server.post('/api/account', readAccount);
  server.post('/api/account/list', readAccounts);
  server.post('/api/account/new', createAccount);
  server.put('/api/account/edit', updateAccount);
  server.delete('/api/account/delete', deleteAccount);

  // Invoice
  server.post('/api/invoice/new', createInvoice);
  server.post('/api/invoice/list', readInvoices);
  server.put('/api/invoice/edit', updateInvoice);
  server.delete('/api/invoice/delete', deleteInvoice);

  module.exports = server;
} catch (ex) {
  console.error('API Error', ex);
}
