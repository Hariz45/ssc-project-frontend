// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext";
// import { useCart } from "../Context/Cartcontext";

// function Cart() {
//     const navigate = useNavigate()

//     const { token } = useAuth();
//     const {
//         cart,
//         increaseQty,
//         decreaseQty,
//         removeItem,
//         clearcart,
//     } = useCart();

//     const placeOrder = async () => {
//         try {
//             if (!token) {
//                 alert("Please login to place order")
//                 navigate("/register")
//             }

//             const OrderData = {
//                 items: cart.map((item) => ({
//                     menuId: item._id,
//                     quantity: item.quantity,
//                 })),
//                 totalprice,
//             };

//             const res = await api.post("orders", OrderData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 }
//             });
//             alert(res.data.message || "order Placed Successfully")
//             clearcart();
//             navigate("/my-orders")
//         } catch (error) {
//             alert(error.response?.data?.message || "Error from placing order")
//         }
//     }

//         return (
//             <div>
//                 <h3>Cart</h3>

//                 {cart.map((item)=>(
//                     <div key={item._id}>
//                         <h3>{item.name}</h3>
//                         <p>Price:₹{item.price}</p>
//                         <p>Quantity: {item.quantity}</p>

//                         <div>
//                             <button onClick={() => increaseQty(item._id)}>+</button>
//                             <button onClick={() => decreaseQty(item._id)}>-</button>
//                             <button onClick={() => removeItem(item._id)}>Remove</button>   
//                         </div>

//                         <div>
//                             <h3>Total : ₹{item.price * item.quantity}</h3>
//                             <button onClick={placeOrder}>Place Order

//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         )
//     }
//     export default Cart


import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext"

function Cart() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    totalPrice,
    updateQty
  } = useCart();

  const placeOrder = async () => {
    try {
      if (!token) {
        alert("Please login first");
        navigate("/");
        return;
      }

      const orderData = {
        items: cart.map((item) => ({
          menuId: item._id,
          quantity: item.quantity,
        })),
        totalPrice,
      };

      const res = await api.post("/order", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message || "Order placed successfully");
      clearCart();
      navigate("/my-orders");
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>

      {cart.length === 0 ? (
        <p className="cart-title">No items in cart</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="rounded-xl border p-4 shadow-sm">
              <h3 className="cart-item">{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <input
                type="number"
                min="0"
                value={item.quantity}
                onChange={(e) => updateQty(item._id, e.target.value)}
                className="border rounded px-2 py-1 w-20 text-center"/>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => increaseQty(item._id)}
                  className="rounded bg-black px-3 py-1 text-white"
                >
                  +
                </button>

                <button
                  onClick={() => decreaseQty(item._id)}
                  className="rounded bg-gray-700 px-3 py-1 text-white"
                >
                  -
                </button>

                <button
                  onClick={() => removeItem(item._id)}
                  className="rounded bg-red-500 px-3 py-1 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div>
            <h3 className="total-price">Total: ₹{totalPrice}</h3>

            <button
              onClick={placeOrder}
              className="place-order-btn"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;