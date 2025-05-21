const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SK_KEY);
 
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body; 

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card']
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ message: 'Payment initialization failed' });
    }
});

module.exports = router;