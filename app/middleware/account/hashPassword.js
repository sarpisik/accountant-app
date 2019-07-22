const bcrypt = require('bcrypt');

module.exports = function(next) {
  let user = this;
  // Brand new user so password already hashed.
  if (!user.isModified('password')) return next();
  // User already exist. Hash the password.
  bcrypt.hash(user.password, 10).then(hashedPassword => {
    user.password = hashedPassword;
    next();
  });
};
