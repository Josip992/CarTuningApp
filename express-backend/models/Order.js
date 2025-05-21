const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [{
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        price: Number,
        vehicleType: String,
        quantity: Number
    }],  
    status: { type: String, enum: ['processing', 'shipped', 'delivered', 'cancelled'], default: 'processing' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
