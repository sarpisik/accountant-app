const mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema,
  // Middleware
  hashPassword = require('../../middleware/user/hashPassword'),
  // preUpdateModel = require('../../middleware/preUpdateModel')({
  //   connection: mongoose,
  //   model: 'User',
  //   property: 'lastLogin'
  // // }),
  // handlePreRemoveUser = require('../../middleware/handlePreRemoveUser')(
  //   mongoose
  // ),
  // setHashPasswordAndSalt = require('../../middleware/setHashPasswordAndSalt'),
  // Helpers
  // {
  //   saltHashPassword,
  //   checkPassword,
  //   createdAtFormatted,
  //   lastLoginFormatted
  // } = require('../../utility'),
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
// UserSchema.pre('updateOne', preUpdateModel);

// Remove all categories, friends before user delete.
// UserSchema.pre('remove', handlePreRemoveUser);

// UserSchema.virtual('createdAtFormatted').get(createdAtFormatted);

// UserSchema.virtual('lastLoginFormatted').get(lastLoginFormatted);

// Handle password validation on Log In.
UserSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return next(err);
    next(null, isMatch);
  });
};

// Add invited / requested friend user by id
// UserSchema.statics.addField = function(_id, field, value, callBack) {
//   this.updateOne({ _id }, { $push: { [field]: value } }).exec(callBack);
// };

// Remove invited / requested friend user by id
// UserSchema.statics.removeField = function(_id, field, value, callBack) {
//   this.updateOne({ _id }, { $pull: { [field]: value } }).exec(callBack);
// };

// Check if user exist.
// UserSchema.statics.isExistByEmail = function(email) {
//   const User = this;
//   return new Promise((resolve, reject) => {
//     User.countDocuments({ email }).exec((err, count) => {
//       // API error.
//       if (err) return reject(err);
//       // No result.
//       if (!count) return reject('User does not exist.');
//       // User exist.
//       resolve(count);
//     });
//   });
// };

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
