const { User } = require('../../models'),
  // Wrapper middleware
  { errorHandler, withValidatorError } = require('..'),
  // Wrapped middleware
  deleteUser = ({ body: _id }, res) =>
    User.findByIdAndDelete(_id, deleteErr =>
      deleteErr
        ? errorHandler(deleteErr, res)
        : res.send({
            type: 'success',
            message: 'User has been deleted.'
          })
    );

module.exports = withValidatorError(deleteUser);
