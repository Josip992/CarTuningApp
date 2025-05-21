import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { completeCartCheckout, checkoutCart } from "../api/cartService"
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from  "react-router-dom"

export default function CheckoutForm({ amount }) {
    const {user} = useAuthContext();
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const checkoutRes = await checkoutCart(user.id);

        const res = await fetch('http://localhost:5000/api/payment/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount })
        });
        const { clientSecret } = await res.json();

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        });

        if (result.error) {
            alert(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                const completeRes = await completeCartCheckout(user.id);
                alert('Payment succeeded!');
                navigate(-1);
            }
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}
        className='stripe-payment'>
            <div className='stripe-card-details'>
                <CardElement />
            </div>
            <div className='stripe-btn'>
                <button type="submit" disabled={!stripe || loading}>
                    Checkout ${amount / 100}
                </button>
            </div>
        </form>
    );
}
