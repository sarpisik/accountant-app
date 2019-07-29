const withValidatorError = require('../withValidatorError'),
  errorHandler = require('../errorHandler');

module.exports = ({ Model, key }) => ({ body: { type, keys } }, res) => {
  const readModels = Model.find({ type }, keys, (error, list) => {
    if (error) return errorHandler(error, res);
    if (list.length < 1)
      return errorHandler({ message: `Can not find #{key} list.` }, res);
    res.send({ [key]: list });
  });
  return withValidatorError(readModels);
};
