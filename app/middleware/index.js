const errorHandler = require('./errorHandler'),
  withProtect = require('./withProtect'),
  withValidatorError = require('./withValidatorError'),
  readModel = require('./readModel'),
  readModels = require('./readModels'),
  updateModel = require('./updateModel'),
  updateUser = require('./user/updateUser');

module.exports = {
  errorHandler,
  withProtect,
  withValidatorError,
  readModel,
  readModels,
  updateModel,
  updateUser
};
