const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  // Middleware
  updateModelProperty = require('../../middleware/updateModelProperty')({
    connection: mongoose,
    model: 'Account',
    property: 'lastEdit'
  }),
  // Model
  AccountSchema = new Schema({
    no: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice', required: true }],
    createdAt: { type: Date, default: Date.now },
    lastEdit: { type: Date, default: Date.now },
    type: { type: String, enum: ['seller', 'buyer'] },
    balance: { type: Number, default: 0 }
  });

// Auto update lastEdit timestamp.
AccountSchema.post('updateOne', updateModelProperty);

module.exports = mongoose.model('Account', AccountSchema);
