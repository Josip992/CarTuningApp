import { useEffect, useState } from "react";
import {fetchCart} from "../api/cartService"
import { useAuthContext } from "../contexts/AuthContext";

function Cartpage(){
    const {user} = useAuthContext();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try{
                console.log(user);
                const cartItems = await fetchCart(user.id);
                setCart(cartItems);
                console.log(cartItems);
            }catch(err){
                console.log(err);       
            }
        }
        fetchCartItems();
    },[]);

    return (
        <div>
            {cart.items.map((item, index) =>(
                <div
                key={index}>
                    <p>{item.quantity}</p>
                </div>
            ))} 
        </div>
    );
}

export default Cartpage;