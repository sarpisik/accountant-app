const bcrypt = require('bcrypt');

module.exports = async function(next) {
  try {
    let user = this;

    // Brand new user so password already hashed.
    if (!user.isModified('password')) return next();

    // User already exist. Hash the password.
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    console.error(error);

    next(error);
  }
};
