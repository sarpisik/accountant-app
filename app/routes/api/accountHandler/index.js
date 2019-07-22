const { withProtect } = require('../../../middleware');
const accountHandler = (req, res) => {
  res.send(req.user);
};

module.exports = withProtect(accountHandler);
