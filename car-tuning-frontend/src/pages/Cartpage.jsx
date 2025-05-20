import { useEffect, useState } from "react";
import { fetchCart } from "../api/cartService"
import { useAuthContext } from "../contexts/AuthContext";
import "../css/Cart.css"

function CartPage(){
    const {user} = useAuthContext();
    const [cart, setCart] = useState(null);

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

    if (!cart) return (<p>Cart loading</p>);

  return (
    <div className="cart-container">
        <div className="cart-items">
            {cart.items.map((item, index) => (
                <div className="cart-item" key={index}>
                    <div className="cart-item-counter">
                        {index + 1}/{cart.items.length}
                    </div>
                    <div className="cart-item-image">
                        <button className="remove-button">X</button>
                    </div>
                    <div className="cart-item-details">
                        <div className="product-name">{item.productId.name}</div>
                        <div className="product-quantity">Quantity: {item.quantity}</div>
                    </div>
                    <div className="product-price">
                        <div>
                        Price: {(item.productId.variant ? item.productId.variant.price : item.productId.price) * item.quantity}
                        </div>
                        <div>
                        Per unit: {item.productId.variant ? item.productId.variant.price : item.productId.price}
                        </div>
                    </div>
                    <div className="stock-details">
                        <div>SKU: {item.productId.variant ? item.productId.variant.sku : item.productId.sku}</div>
                        <div>Stock: {item.productId.variant ? item.productId.variant.stock : item.productId.stock}</div>
                    </div>
                </div>
            ))}
        </div>
        <div className="cart-summary" style={{ flexShrink: 0 }}>
            <p>TOTAL: 100$</p>
            <p>PROMO</p>
            <button>C/O</button>
            <button>STRIPE</button>
        </div>
    </div>
);        

}

export default CartPage;