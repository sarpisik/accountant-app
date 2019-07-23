const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  // Middleware
  updateModelProperty = require('../../middleware/updateModelProperty')({
    connection: mongoose,
    model: 'Account',
    property: 'lastEdit'
  }),
  handlePreRemoveAccount = require('../../middleware/preRemoveAccount')(
    mongoose
  ),
  // Model
  AccountSchema = new Schema({
    no: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],
    createdAt: { type: Date, default: Date.now },
    lastEdit: { type: Date, default: Date.now },
    type: { type: String, enum: ['seller', 'buyer'], required: true },
    balance: { type: Number, default: 0 }
  });

// Auto update lastEdit timestamp.
AccountSchema.post('updateOne', updateModelProperty);
// Remove registered invoices.
AccountSchema.pre('remove', handlePreRemoveAccount);

module.exports = mongoose.model('Account', AccountSchema);
