const { Account, Invoice } = require('../../models'),
  // Wrapper middleware
  { errorHandler, withValidatorError } = require('..'),
  // Wrapped middleware
  createInvoice = ({ body }, res) =>
    new Invoice({
      ...body
    }).save((saveErr, doc) =>
      // If save failed, respond error.
      // Else, register saved invoice ID on related Account list.
      saveErr
        ? errorHandler(saveErr, res)
        : Account.updateOne(
            { _id: body.account },
            { $push: { invoices: doc._id } },
            // If invoice ID register succeed, respond created invoice.
            // Else, respond error.
            (updateErr, updatedAcc) =>
              updateErr
                ? errorHandler(updateErr, res)
                : updatedAcc.nModified < 1
                ? errorHandler(
                    { message: 'Could not register to related account' },
                    res
                  )
                : res.send(doc)
          )
    );

module.exports = withValidatorError(createInvoice);
