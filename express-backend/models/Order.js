const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
    userId,
    items: [{
        poductId,
        sku,
        quantity,
        priceAtPurchase
    }],
    total,
    status: {type: String, default: "pending"},
    paymentIntentId: String,
    createdAt: Date
});

module.exports = mongoose.model("Order", OrderSchema);