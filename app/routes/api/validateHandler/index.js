// Model
const { User } = require('../../../models'),
  jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    lastLogin: new Date(),
    validated: true
  }).exec((err, updatedUser) => {
    // API error.
    if (err) return res.status(500).send(err);
    // No result.
    if (updatedUser == null) {
      return res.status(404).send({
        message:
          'User not found or validation token expired. Please sign up again.'
      });
    }
    // User verified success
    const key = process.env.TOKEN_KEY,
      userId = updatedUser._id,
      userName = updatedUser.userName,
      token = jwt.sign({ userId }, key);
    res.status(200).send({
      type: 'success',
      userId,
      userName,
      token
    });
  });
};
