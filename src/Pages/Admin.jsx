import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../index.css"

function Admin() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    fetchOrders();
    fetchMenu();
  }, [token]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get("/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log("FETCH ORDERS ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await api.get("/menu", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMenu(res.data);
    } catch (error) {
      console.log("FETCH MENU ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to fetch menu");
    }
  };

  const handleAddMenu = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/menu", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message || "Menu added successfully");

      setForm({
        name: "",
        category: "",
        price: "",
        description: "",
      });

      fetchMenu();
    } catch (error) {
      console.log("ADD MENU ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add menu");
    }
  };

  const handleDeleteMenu = async (id) => {
    try {
      const res = await api.delete(`/menu/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message || "Menu deleted");
      fetchMenu();
    } catch (error) {
      console.log("DELETE MENU ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to delete menu");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await api.put(
        `/order/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message || "Status updated");
      fetchOrders();
    } catch (error) {
      console.log("STATUS UPDATE ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="admin-container">
      <div>
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        {user && (
          <p className="text-sm text-gray-600">
            Logged in as: <span className="font-semibold">{user.name}</span>
          </p>
        )}
      </div>

      <div className="rounded-xl border p-5 shadow-sm">
        <h3 className="mb-4 text-2xl font-semibold">Add Menu</h3>

        <form
          onSubmit={handleAddMenu}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <input
            type="text"
            name="name"
            placeholder="Menu name"
            value={form.name}
            onChange={handleChange}
            className="rounded-lg border px-4 py-2 outline-none"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="rounded-lg border px-4 py-2 outline-none"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="rounded-lg border px-4 py-2 outline-none"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="rounded-lg border px-4 py-2 outline-none"
          />

          <button className="rounded-lg bg-black px-4 py-2 text-white md:col-span-2">
            Add Menu
          </button>
        </form>
      </div>

      <div className="rounded-xl border p-5 shadow-sm">
        <h3 className="mb-4 text-2xl font-semibold">All Menu</h3>

        {menu.length === 0 ? (
          <p>No menu found</p>
        ) : (
          <div className="">
            {menu.map((item) => (
              <div key={item._id} className="rounded-xl border p-4">
                <h4 className="text-xl font-semibold">{item.name}</h4>
                <p>Category: {item.category}</p>
                <p>Price: ₹{item.price}</p>
                <p>{item.description}</p>

                <button
                  onClick={() => handleDeleteMenu(item._id)}
                  className="mt-3 rounded bg-red-500 px-4 py-2 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="">
        <h3 className="mb-4 text-2xl font-semibold">All Orders</h3>

        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="rounded-xl border p-4">
                <p>
                  <span className="font-semibold">User:</span>{" "}
                  {order.userId?.name || "Unknown"}
                </p>

                <p>
                  <span className="font-semibold">Total:</span> ₹{order.totalPrice}
                </p>

                <p>
                  <span className="font-semibold">Status:</span> {order.status}
                </p>

                <div className="mt-3">
                  <h4 className="font-semibold">Items:</h4>
                  {order.items.map((item, index) => (
                    <p key={index}>
                      {item.menuId?.name} - Qty: {item.quantity}
                    </p>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleStatusChange(order._id, "pending")}
                    className="rounded bg-yellow-500 px-3 py-2 text-white"
                  >
                    Pending
                  </button>

                  <button
                    onClick={() => handleStatusChange(order._id, "Confirmed")}
                    className="rounded bg-blue-500 px-3 py-2 text-white"
                  >
                    Confirmed
                  </button>

                  <button
                    onClick={() => handleStatusChange(order._id, "Delivered")}
                    className="rounded bg-green-600 px-3 py-2 text-white"
                  >
                    Delivered
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;