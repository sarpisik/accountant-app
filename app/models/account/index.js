const mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema,
  // Middleware
  hashPassword = require('../../middleware/account/hashPassword'),
  // preUpdateModel = require('../../middleware/preUpdateModel')({
  //   connection: mongoose,
  //   model: 'Account',
  //   property: 'lastLogin'
  // // }),
  // handlePreRemoveAccount = require('../../middleware/handlePreRemoveAccount')(
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
  AccountSchema = new Schema({
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    validated: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now }
  });

// Remove invalidated accounts after 1 hour.
AccountSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 60 * 60,
    partialFilterExpression: { validated: false }
  }
);

// Hash and salt password before registering to database.
AccountSchema.pre('save', hashPassword);

// Auto update lastLogin timestamp
// AccountSchema.pre('updateOne', preUpdateModel);

// Remove all categories, friends before account delete.
// AccountSchema.pre('remove', handlePreRemoveAccount);

// AccountSchema.virtual('createdAtFormatted').get(createdAtFormatted);

// AccountSchema.virtual('lastLoginFormatted').get(lastLoginFormatted);

// Handle password validation on Log In.
AccountSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return next(err);
    next(null, isMatch);
  });
};

// Add invited / requested friend account by id
// AccountSchema.statics.addField = function(_id, field, value, callBack) {
//   this.updateOne({ _id }, { $push: { [field]: value } }).exec(callBack);
// };

// Remove invited / requested friend account by id
// AccountSchema.statics.removeField = function(_id, field, value, callBack) {
//   this.updateOne({ _id }, { $pull: { [field]: value } }).exec(callBack);
// };

// Check if account exist.
// AccountSchema.statics.isExistByEmail = function(email) {
//   const Account = this;
//   return new Promise((resolve, reject) => {
//     Account.countDocuments({ email }).exec((err, count) => {
//       // API error.
//       if (err) return reject(err);
//       // No result.
//       if (!count) return reject('Account does not exist.');
//       // Account exist.
//       resolve(count);
//     });
//   });
// };

// Handle find by Email.
AccountSchema.statics.findByEmail = function(email) {
  const Account = this;
  return new Promise((resolve, reject) => {
    Account.find({ email }).exec((err, account) => {
      // API error.
      if (err) return reject(err);

      // No result.
      if (account.length < 1)
        return reject({ type: 'reject', message: 'Account not found' });
      // Success
      resolve(account[0]);
    });
  });
};

module.exports = mongoose.model('Account', AccountSchema);
