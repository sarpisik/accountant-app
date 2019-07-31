const path = require('path');
module.exports = (req, res) =>
  res.sendFile(
    req.params.name,
    { root: path.join(__dirname, '..', '..', '..', 'images') },
    err => err && console.error(err)
  );
