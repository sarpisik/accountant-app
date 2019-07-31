const { User } = require('../../models'),
  jwt = require('jsonwebtoken');

module.exports = wrappedFunction => (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1],
      key = process.env.TOKEN_KEY;

    jwt.verify(token, key, function(err, payload) {
      err && console.error(err);
      payload
        ? User.findById(payload.userId, '-password').then(doc => {
            req.user = doc;
            wrappedFunction(req, res);
          })
        : res
            .status(403)
            .send({ type: 'reject', message: 'Token is not valid.' });
    });
  } catch (error) {
    console.error('Token validation error. ', error);
    res
      .status(500)
      .send({ type: 'reject', message: 'Token validation error.' });
  }
};
