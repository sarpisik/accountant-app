try {
  const server = require('../../lib/server'),
    meHandler = require('./meHandler');
  server.use('/api/me', meHandler);
  server.get('/api/version', (req, res) => {
    res.json({
      version: 1.0
    });
  });
  module.exports = server;
} catch (ex) {
  console.error('API Error', ex);
}
