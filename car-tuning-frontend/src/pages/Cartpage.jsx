import { useEffect, useState } from "react";
import {fetchCart} from "../api/cartService"
import { useAuthContext } from "../contexts/AuthContext";

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

    // return (
    //         <div>
    //             {cart.length === 0 ? (
    //                 <p>Your cart is empty</p>
    //             ) : (
    //                 cart.items.map((item, index) =>(
    //                     <div
    //                     key={index}>
    //                         {item.productId.name}
    //                         <p>{item.quantity}</p>
    //                     </div>
    //                 ))
    //             )}
    //         </div>
    // );
    // return (
    //     <div className="flex flex-row w-full h-full p-4 gap-4 box-border">
          
    //       LEFT: Cart Items List
    //       <div className="flex-1 overflow-y-auto space-y-4">
    //         {cart.items.map((item, index) => (
    //           <div key={index} className="flex items-start border p-3 gap-4 rounded-md shadow-md">
    //             {/* Image */}
    //             <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-sm">SLIKA</div>
    
    //             {/* Details */}
    //             <div className="flex flex-col flex-1 gap-2">
    //               {/* Remove Button */}
    //               <button className="self-end text-red-500">X</button>
                  
    //               {/* Product Name (editable maybe?) */}
    //               <input
    //                 type="text"
    //                 className="border rounded p-1"
    //                 defaultValue={item.productId.name}
    //               />
    
    //               {/* Quantity */}
    //               <input
    //                 type="number"
    //                 className="w-20 border rounded p-1"
    //                 defaultValue={item.productId.quantity}
    //               />
    //             </div>
    
    //             {/* Price Info */}
    //             <div className="flex flex-col items-end text-right">
    //               <p>${item.productId.price.toFixed(2)}</p>
    //               <p className="text-sm text-gray-500">Total: ${(item.productId.price * item.quantity).toFixed(2)}</p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    
    //       {/* RIGHT: Summary Box */}
    //       <div className="w-64 h-fit border p-4 rounded-md shadow-md flex flex-col gap-4 shrink-0">
    //         <h2 className="text-xl font-bold">TOTAL</h2>
    
    //         {/* Promo Input */}
    //         <input
    //           type="text"
    //           placeholder="PROMO"
    //           className="border rounded p-2"
    //         />
    
    //         {/* Checkout Buttons */}
    //         <button className="bg-blue-600 text-white rounded p-2">C/O</button>
    //         <button className="bg-black text-white rounded p-2">STRIPE</button>
    //       </div>
    //     </div>
    //   );
    return(
        <></>
    );
}

export default CartPage;