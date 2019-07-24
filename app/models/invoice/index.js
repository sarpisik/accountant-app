const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  // Middleware
  validateRelatedAccount = require('../../middleware/invoice/validateRelatedAccount')(
    mongoose
  ),
  handlePreRemoveInvoice = require('../../middleware/preRemoveInvoice')(
    mongoose
  ),
  updateModelProperty = require('../../middleware/updateModelProperty')({
    connection: mongoose,
    model: 'Invoice',
    property: 'lastEdit'
  }),
  // Model
  InvoiceSchema = new Schema({
    no: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    date: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    lastEdit: { type: Date, default: Date.now },
    type: { type: String, enum: ['purchase', 'sale'] },
    amount: { type: Number, required: true },
    url: { type: String },
    taxRate: { type: Number, required: true }
  });

// Validate account before save.
InvoiceSchema.pre('save', validateRelatedAccount);

// Auto update lastEdit timestamp.
InvoiceSchema.post('updateOne', updateModelProperty);

// Remove from the registered account.
InvoiceSchema.pre('remove', handlePreRemoveInvoice);

module.exports = mongoose.model('Invoice', InvoiceSchema);
