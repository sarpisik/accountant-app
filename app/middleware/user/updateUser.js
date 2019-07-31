const { User } = require('../../models'),
  withValidatorError = require('../withValidatorError'),
  errorHandler = require('../errorHandler'),
  updateUser = ({ user: { _id }, body: { password } }, res) =>
    User.findById(_id, (findError, user) => {
      if (findError) {
        console.error('findError: ', findError);
        return errorHandler({ message: 'Invalid User ID' }, res);
      }
      user.set({ password });
      user.save((saveError, updatedUser) => {
        if (saveError) {
          console.error('saveError: ', saveError);
          return errorHandler(
            { message: 'There was database error on change password' },
            res
          );
        }
        if (updatedUser == null)
          return errorHandler({ message: 'Could not change password.' }, res);
        res.send({ message: 'Update succeed.' });
      });
    });

module.exports = withValidatorError(updateUser);
