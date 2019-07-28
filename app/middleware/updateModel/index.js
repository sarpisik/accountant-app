const withValidatorError = require('../withValidatorError'),
  errorHandler = require('../errorHandler');

module.exports = Model => ({ body: { _id, ...rest } }, res) => {
  const updateModel = Model.updateOne({ _id }, { ...rest }, (updateErr, doc) =>
    updateErr
      ? errorHandler(updateErr, res)
      : doc.nModified < 1
      ? errorHandler(
          {
            message: 'Could not edit field. Please check id or update field.'
          },
          res
        )
      : res.send({ message: 'Update succeed.' })
  );
  return withValidatorError(updateModel);
};
