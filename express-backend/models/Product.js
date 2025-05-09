const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
  fits: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  compatibility: String,
  price: Number,
  sku: String,
  stock: Number,
  variants: {
    type: [
      {
        model: String,
        price: Number,
        sku: String,
        stock: Number
      }
    ], default: undefined
  },
  createdAt: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Product", ProductSchema);