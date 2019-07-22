const { User } = require('../../models'),
  jwt = require('jsonwebtoken');

module.exports = wrappedFunction => (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1],
      key = process.env.TOKEN_KEY;

    jwt.verify(token, key, function(err, payload) {
      payload
        ? User.findById(payload.userId).then(doc => {
            req.user = doc;
            wrappedFunction(req, res);
          })
        : res
            .status(403)
            .send({ type: 'reject', message: 'Token is not valid.' });
    });
  } catch (e) {
    console.error('Token validation error. ', e);
    res
      .status(500)
      .send({ type: 'reject', message: 'Token validation error.' });
  }
};
