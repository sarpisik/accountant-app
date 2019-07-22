module.exports = function(connection) {
  const Account = connection.model('Account');
  return async function(next) {
    try {
      const self = this;
      const foundAccount = await Account.countDocuments({ _id: self.account });
      foundAccount
        ? next()
        : next({ message: 'Can not find the related account.' });
    } catch (error) {
      next(error);
    }
  };
};
