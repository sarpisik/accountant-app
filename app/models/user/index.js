const mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema,
  // Middleware
  hashPassword = require('../../middleware/user/hashPassword'),
  // Model
  UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    validated: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now }
  });

// Remove invalidated users after 1 hour.
UserSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 60 * 60,
    partialFilterExpression: { validated: false }
  }
);

// Hash and salt password before registering to database.
UserSchema.pre('save', hashPassword);

// Auto update lastLogin timestamp
UserSchema.pre('updateOne', hashPassword);

// Handle password validation on Log In.
UserSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return next(err);
    next(null, isMatch);
  });
};

// Handle find by Email.
UserSchema.statics.findByEmail = function(email) {
  const User = this;
  return new Promise((resolve, reject) => {
    User.find({ email }).exec((err, user) => {
      // API error.
      if (err) return reject(err);

      // No result.
      if (user.length < 1)
        return reject({ type: 'reject', message: 'User not found' });
      // Success
      resolve(user[0]);
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
