const { Account } = require('../../models'),
  // Wrapper middleware
  { updateModel } = require('..'),
  // Wrapped middleware
  updateAccount = updateModel(Account);

module.exports = updateAccount;
