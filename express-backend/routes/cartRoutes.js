const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Cart = require('../models/Cart');

router.post("/add", async (req,res) => {
    const { userId, productId, quantity } = req.body;
    
    try{
        let cart = await Cart.findOne({ userId, status: "active"});

        if(!cart) {
            cart = new Cart({userId, items: []});
        }

        const itemExists = cart.items.find(item =>
            item.productId.equals(productId)
        );

        if(itemExists){
            itemExists.quantity += quantity;
        }else{
            cart.items.push({ productId, quantity });
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

module.exports = router;