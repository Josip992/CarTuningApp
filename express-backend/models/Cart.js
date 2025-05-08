const mongoose = require("mongoose");


const CartSchema = new mongoose.Schema({
    userId: String,
    items: [CartItem],
    status: {type: String, enum: ["active", "pending"], default: "active"}
});

module.exports = mongoose.model("Cart", CartSchema);