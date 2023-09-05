const mongoose = require('mongoose');

// Definición del esquema
const saleSchema = new mongoose.Schema({
  user_id: {type: String, required: true },
  saleDate: { type: Date, },
  items: [{ type: String }],
  storeLocation: { type: String },
  customer: {
    name: { type: String },
    email: { type: String }
  },
  couponUsed: { type: Boolean },
  purchaseMethod: { type: String }
});
module.exports = mongoose.model('Venta',saleSchema);