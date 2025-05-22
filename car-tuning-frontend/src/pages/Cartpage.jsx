import { useEffect, useState } from "react";
import { fetchCart } from "../api/cartService"
import { useAuthContext } from "../contexts/AuthContext";
import "../css/Cart.css"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(");

function CartPage(){
    const {user} = useAuthContext();
    const [cart, setCart] = useState(null);
    const [total, setTotal] = useState(0);
    const [showStripeForm, setShowStripeForm] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            try{
                const cartItems = await fetchCart(user.id);
                console.log(cartItems);
                setCart(cartItems);
            }catch(err){
                console.log(err);       
            }
        }
        fetchCartItems();
    },[]);

    useEffect(() => {
        if (!cart) return;

        const calcTotal = () => {
            return cart.items.reduce((acc, item) => {
                const { price } = getProductInfo(item.productId, item.vehicleType);
                return acc + (price || 0) * item.quantity;
            }, 0);
        };

        setTotal(calcTotal());
    }, [cart]);

    const getProductInfo = (product, vehicleType) => {
        let price = null;
        let sku = null;
        let stock = null;
    
        if (product.variants) {
            const matchedVariant = product.variants.find(v => v.model === vehicleType);
            if (matchedVariant) {
                price = matchedVariant.price;
                sku = matchedVariant.sku;
                stock = matchedVariant.stock;
            }
        } else if (product.compatibility) {
            price = product.price;
            sku = product.sku;
            stock = product.stock;
        }
    
        return { price, sku, stock };
    };
    
    const formatFileName = (name) =>
        name.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

    if (!cart) return (<p>Cart loading</p>);

    const cartItemsList = cart.items.map((item, index) => {
        const product = item.productId;
        const { price, sku, stock } = getProductInfo(product, item.vehicleType);
    
        return (
            <div className="cart-item" key={index}>
                <div className="cart-item-counter">
                    {index + 1}/{cart.items.length}
                </div>
                <div className="cart-item-image">
                    <img
                    src={`/images/products/${formatFileName(product.name)}.jpg`}
                    />
                    <button className="remove-button">X</button>
                </div>
                <div className="cart-item-details">
                    <div className="product-name">{product.name}</div>
                    <div className="product-quantity">
                        <label htmlFor={`qty-${index}`}>Quantity:</label>
                        <input
                            id={`qty-${index}`}
                            type="number"
                            min={1}
                            max={stock || 1}
                            value={item.quantity}
                            
                        />
                    </div>
                </div>
                <div className="stock-details">
                    <div>Stock: {stock !== null ? stock : 'N/A'}</div>
                    <div>SKU: {sku || 'N/A'}</div>
                </div>
                <div className="product-price">
                    <div>Price: {price ? `$${price * item.quantity}` : 'N/A'}</div>
                    <div>Per unit: {price ? `$${price}` : 'N/A'}</div>
                </div>
            </div>
        );
    });
    
    return (
        <div>
        {!showStripeForm ? (
            <div className="cart-container">
            <div className="cart-items">
                {cartItemsList}
            </div>
            <div className="cart-summary">
                <p>TOTAL: ${total}</p>
    
                <div className="promo-section">
                    <label htmlFor="promo">Promo Code:</label>
                    <input type="text" id="promo" name="promo" placeholder="Enter promo code" />
                    <button>Apply</button>
                </div>
                <button onClick={() => setShowStripeForm(true)}>Checkout with Stripe</button>
                <button>PayPal</button>
            </div>
        </div>
        ) : (
                <Elements stripe={stripePromise}>
                    <CheckoutForm amount={total * 100} />
                </Elements>
        )}
        </div>
    );
    
    
}

export default CartPage;