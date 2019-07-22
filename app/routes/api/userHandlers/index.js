const { withProtect } = require('../../../middleware');
const userHandler = (req, res) => {
  res.send(req.user);
};

module.exports = withProtect(userHandler);
