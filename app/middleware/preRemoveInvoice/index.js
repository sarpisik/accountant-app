module.exports = connection =>
  async function(next) {
    const { _id, account } = this,
      Account = connection.model('Account');
    Account.updateOne(
      { _id: account },
      {
        $pull: { invoices: _id }
      },
      (updateErr, doc) =>
        updateErr
          ? next(updateErr)
          : doc.nModified < 1
          ? next({
              message: 'Could not change timestamp of the related account.'
            })
          : next()
    );
  };
