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
  variants: {
    type: [
      {
        model: String,
        price: Number,
      }
    ],
    default: undefined,
  }
});


module.exports = mongoose.model("Product", ProductSchema);