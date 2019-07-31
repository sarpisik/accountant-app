const { withProtect } = require('../../../middleware');
const userHandler = ({ user }, res) => res.send({ user });

module.exports = withProtect(userHandler);
