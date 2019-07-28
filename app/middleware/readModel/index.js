const withValidatorError = require('../withValidatorError'),
  errorHandler = require('../errorHandler');

module.exports = ({ Model, key }) => ({ body: { searchBy, keys } }, res) => {
  const readModel = Model.findOne({ ...searchBy }, keys, (error, data) => {
    if (error) return errorHandler(error, res);
    if (data == null)
      return errorHandler({ message: 'Can not find data.' }, res);
    console.log(data);

    res.send({ [key]: data });
  });
  return withValidatorError(readModel);
};
