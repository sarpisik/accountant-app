const { Account } = require('../../models'),
  // Wrapper middleware
  { readModels } = require('..'),
  // Wrapped middleware
  readAccounts = readModels({ Model: Account, key: 'accounts' });

module.exports = readAccounts;
