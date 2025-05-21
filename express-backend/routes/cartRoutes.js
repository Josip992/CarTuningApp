const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

router.post("/add", async (req,res) => {
    const { userId, productId, quantity, vehicleType } = req.body;
    
    try{
        let cart = await Cart.findOne({ userId, status: "active"});

        if(!cart) {
            cart = new Cart({userId, items: []});
        }

        if (cart.status !== 'active') {
            return res.status(400).json({ message: 'Cart is not modifiable.' });
        }        

        const itemExists = cart.items.find(item =>
            item.productId.equals(productId)
        );

        if(itemExists){
            itemExists.quantity += quantity;
        }else{
            cart.items.push({ productId, quantity, vehicleType });
        }
        await cart.save();
        res.status(200).json(cart)
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: "Failed to add to cart"
        });
    }
});

router.get("/:userId", async (req, res) => {
    try{
        const cart = await Cart.findOne({ userId: req.params.userId, status: "active"}).populate("items.productId");
        res.status(200).json( cart || { items: []});
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: "Failed to fetch cart"
        });
    }
});

router.post('/checkout', async (req, res) => {
    try {
        const userId = req.body.userId;

        const cart = await Cart.findOne({ userId, status: 'active' });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'No active cart to checkout.' });
        }

        cart.status = 'pending';
        await cart.save();

        return res.status(200).json({ message: 'Checkout started. Cart is pending.', cartId: cart._id });

    } catch (error) {
        console.error('Checkout error:', error);
        return res.status(500).json({ message: 'Server error during checkout.' });
    }
});

router.post('/complete-checkout', async (req, res) => {
    try {
        const userId = req.body.userId;

        const cart = await Cart.findOne({ userId, status: 'pending' });
        
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'No pending cart found.' });
        }

        const orderItems = [];
        for (let item of cart.items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(400).json({ message: `Product not found: ${item.productId}` });
            }

            orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                vehicleType: item.vehicleType
            });
        }

        const order = new Order({
            userId: cart.userId,
            items: orderItems,
            status: 'processing'
        });

        await order.save();

        cart.status = 'ordered';
        await cart.save();

        return res.status(200).json({ message: 'Order completed successfully.', order });

    } catch (error) {
        console.error('Complete checkout error:', error);
        return res.status(500).json({ message: 'Server error during order creation.' });
    }
});


module.exports = router;