const server = require('../../lib/server'),
  accountHandler = require('./accountHandler'),
  signInHandler = require('./signInHandler'),
  signUpHandler = require('./signUpHandler'),
  logOutHandler = require('./logOutHandler'),
  validateHandler = require('./validateHandler'),
  meHandler = require('./meHandler');
try {
  server.use('/api/me', meHandler);
  server.use('/api/signIn', signInHandler);
  server.use('/api/signUp', signUpHandler);
  server.use('/api/logOut', logOutHandler);
  server.use('/api/validate/:id', validateHandler);
  console.log(accountHandler);

  server.use('/api/account', accountHandler);
  server.get('/api/version', (req, res) => {
    res.json({
      version: 1.0
    });
  });
  module.exports = server;
} catch (ex) {
  console.error('API Error', ex);
}
