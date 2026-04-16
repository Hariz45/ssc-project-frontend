import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../Context/AuthContext";
import { formatDate } from "../Utils/helpers"

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      if (!token) {
        alert("Please login first");
        navigate("/");
        return;
      }

      const res = await api.get("/order/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  const cancelOrder = async (id) => {
      try {
        const res = await api.put(
          `/order/cancel/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(res.data.message || "Order cancelled successfully");
        fetchOrders();
      } catch (error) {
        alert(error.response?.data?.message || "Failed to cancel order");
      }
    };

  return (
    <div className="my-orders-container">
      <h2 className="my-order-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="my-order-title">No orders found</p>
      ) : (
        <div className="my-orders-list">
          {orders.map((order) => (
            <div key={order._id} className="rounded-xl border p-4 shadow-sm">
              <p><span className="font-semibold">Status:</span> {order.status}</p>
              <p><span className="font-semibold">Total:</span> ₹{order.totalPrice}</p>
              <p><span className="font-semibold">Created At:</span> {formatDate(order.createdAt)}</p>

              <div className="mt-3">
                <h4 className="mb-2 font-semibold">Items:</h4>
                {order.items.map((item, index) => (
                  <p key={index}>
                    {item.menuId?.name} - Qty: {item.quantity}
                  </p>

                ))}
                {order.status === "pending" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;