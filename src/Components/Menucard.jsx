// import { formatPrice } from "../utils/helpers";

// function MenuCard({ item, onAddToCart }) {
//   return (
//     <div className="rounded-xl border p-4 shadow-sm bg-white">
//       <h3 >{item.name}</h3>
//       <p >Category: {item.category}</p>
//       <p >{formatPrice(item.price)}</p>
//       <p >{item.description}</p>

//       <button
//         onClick={() => onAddToCart(item)}

//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }

// export default MenuCard;

import { formatPrice } from "../utils/helpers";

function MenuCard({ item, onAddToCart }) {
  return (
    <div>
      <div className="menu-card">
        <img className="menu-card-image"
        src={item.image}
        alt={item.name}
        
      />
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600 mt-1">Category: {item.category}</p>
      <p className="text-sm font-medium mt-1">{formatPrice(item.price)}</p>
      <p className="text-sm text-gray-700 mt-2">{item.description}</p>

      <button
        onClick={() => onAddToCart(item)}
        className="menu-card-btn"
      >
        Add to Cart
      </button>
      </div>
    </div>
  );
}

export default MenuCard;