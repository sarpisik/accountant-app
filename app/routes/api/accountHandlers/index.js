const createAccount = require('./create'),
  { readAccount, readAccounts } = require('./read'),
  updateAccount = require('./update'),
  deleteAccount = require('./delete');

module.exports = {
  readAccount,
  createAccount,
  readAccounts,
  updateAccount,
  deleteAccount
};
