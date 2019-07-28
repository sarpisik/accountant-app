const { Account } = require('../../models'),
  // Wrapper middleware
  { readModel } = require('..'),
  // Wrapped middleware
  readAccount = readModel({ Model: Account, key: 'account' });

module.exports = readAccount;
