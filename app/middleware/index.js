const errorHandler = require('./errorHandler'),
  withProtect = require('./withProtect'),
  withValidatorError = require('./withValidatorError'),
  readModel = require('./readModel'),
  updateModel = require('./updateModel');

module.exports = {
  errorHandler,
  withProtect,
  withValidatorError,
  readModel,
  updateModel
};
