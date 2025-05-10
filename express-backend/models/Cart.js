const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
    quantity: {type: Number, default: 1}
});

const CartSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    items: [CartItemSchema],
    status: {type: String, enum: ["active", "pending"], default: "active"}
});

module.exports = mongoose.model("Cart", CartSchema);