const { withValidatorError } = require('../../../middleware'),
  { User } = require('../../../models'),
  jwt = require('jsonwebtoken');
const userValidator = ({ body: { email, password } }, res) =>
  User.findByEmail(email)
    .then(user =>
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch) {
          const key = process.env.TOKEN_KEY,
            userId = user._id,
            userName = user.userName,
            token = jwt.sign({ userId }, key);
          res.status(200).send({
            type: 'success',
            userId,
            userName,
            token
          });
        } else {
          console.error(err);
          res
            .status(400)
            .send({ type: 'reject', message: 'Invalid Password/Username' });
        }
      })
    )
    .catch(err => res.status(404).send(err));

module.exports = withValidatorError(userValidator);
