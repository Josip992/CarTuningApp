const mongoose = require("mongoose");


const CartItemSchema = new mongoose.Schema({
    productSku: String,
    quantity: Number
});

module.exports = mongoose.model("CartItem", CartItemSchema);