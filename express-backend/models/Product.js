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
  compatibility: {
    type: String 
  },
  price: {
    type: Number 
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  stock: {
    type: Number
  },
  variants: {
    type: [
      {
        model: String,
        price: Number,
      }
    ],
    default: undefined,
  },
  createdAt: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Product", ProductSchema);