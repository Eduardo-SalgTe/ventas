const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String },
  tags: [{ type: String}],
  price: { type: Number },
  quantity: { type: String }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
