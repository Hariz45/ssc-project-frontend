import { useEffect, useState } from "react";
import api from "../api/api";
import MenuCard from "../Components/Menucard";
import Loader from "../Components/Loader";
import { useCart } from "../Context/CartContext";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await api.get("/menu");
      setMenu(res.data);
    } catch (error) {
      console.log("Error fetching menu");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="menu-title">Menu</h2>
      <h3 className="menu-desc">Explore Our Delicious Options</h3>
      <div className="menu-card-container" >
        {menu.map((item) => (
          <MenuCard key={item._id} item={item} onAddToCart={addToCart} />
        ))}
      </div>

      <div className="foot-container">
        <footer>
        <p>📞 +91 98765 43210 &nbsp;|&nbsp; 📍 Coimbatore, Tamil Nadu</p>
        <p>© 2026 SSC A to Z Catering Services</p>
      </footer>
      </div>
    </div>
  );
}

export default Menu;