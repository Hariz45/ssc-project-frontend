import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import logo from "../assets/ssc.png.jpeg";



function Navbar({toggleTheme}) {
  const navigate = useNavigate();
  const { token, logout, user } = useAuth();
  const { cart } = useCart();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <nav className="nav-container">
      <div className="logo-title">
        <img src={logo} alt="logo" className="logo" />
        <h1 className="h-name">S S C </h1>
      </div>

      <div className="flex items-center gap-4 text-sm font-medium">
        {!token && <Link to="/">Login</Link>}
        {!token && <Link to="/register">Register</Link>}
        <Link to="/menu">Menu</Link>
        <Link to="/cart"> Cart ({cart.length})</Link>
        <Link to="/my-orders">My Orders</Link>


        {user?.role === "admin" && <Link to="/admin">Admin</Link>}

        <button className="tog-btn" onClick={toggleTheme}>
          Theme
        </button>

        {token && (
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-white"
          >
            Logout
          </button>

        )}
      </div>
    </nav>
  );
}

export default Navbar;