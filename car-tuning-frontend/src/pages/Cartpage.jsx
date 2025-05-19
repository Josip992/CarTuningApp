import { useEffect, useState } from "react";
import { fetchCart } from "../api/cartService"
import { useAuthContext } from "../contexts/AuthContext";
import "../css/Cart.css"

function CartPage(){
    const {user} = useAuthContext();
    const [cart, setCart] = useState({});

    useEffect(() => {
        const fetchCartItems = async () => {
            try{
                const cartItems = await fetchCart(user.id);
                setCart(cartItems);
            }catch(err){
                console.log(err);       
            }
        }
        fetchCartItems();
    },[]);

  return (
    <div className="cart-container">
        <div className="cart-items">
            <div className="cart-item">
                <div className="cart-item-image">
                    <button>
                        X
                    </button>
                </div>
                <div className="product-name">
                    Product name
                </div>
                <div className="product-quantity">
                    1
                </div>
                <div className="product-price">
                    <p>price</p>
                    <p>unit price</p>
                </div>
            </div>
        </div>
        <div className="cart-summary">
            <p>TOTAL</p>
            <p>PROMO</p>
            <p>C/O</p>
            <p>STRIPE</p>
        </div>
    </div>
);        

}

export default CartPage;