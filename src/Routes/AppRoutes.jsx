import { Routes, Route,Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Menu from "../Pages/Menu";
import Cart from "../Pages/Cart";
import MyOrders from "../Pages/Myorders"
import Admin from "../Pages/Admin";
import { useAuth } from "../Context/AuthContext";

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route
        path="/admin"
        element={
          user?.role === "admin" ? <Admin /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default AppRoutes;