const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Definición del esquema
const ventaSchema = new mongoose.Schema({
  saleDate: { type: Date, default: Date.now },
  items: [{type: {name: {type: String}, price: {type: Number}, quality: {type: String}}}],
  storeLocation: { type: String },
  customer: {
    gender: { type: String },
    email: { type: String },
    satisfaction: {type: Number}
  },
  couponUsed: { type: Boolean },
  purchaseMethod: { type: String }
});

module.exports = mongoose.model('sales', ventaSchema);