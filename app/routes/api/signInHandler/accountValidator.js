const { withValidatorError } = require('../../../middleware'),
  { Account } = require('../../../models'),
  jwt = require('jsonwebtoken');
const accountValidator = (req, res) =>
  Account.findByEmail(req.body.email)
    .then(user =>
      user.comparePassword(req.body.password, (err, isMatch) => {
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

module.exports = withValidatorError(accountValidator);
