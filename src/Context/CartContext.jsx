
import React, { createContext, useContext, useEffect, useState } from 'react'


const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, SetCart] = useState([])

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        SetCart(savedCart)
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem._id === item.id);

        if (existingItem) {
            const updatedCart = cart.map((cartItem) =>
                cartItem._id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            )
            SetCart(updatedCart);
        } else {
            SetCart([...cart, { ...item, quantity: 1 }])
        }
    }
      const updateQty = (id, qty) => {
            const parsed = parseInt(qty);
            if (isNaN(parsed) || parsed < 0) return;

            if (parsed === 0) {
                SetCart(cart.filter((item) => item._id !== id));
            } else {
                SetCart(cart.map((item) =>
                    item._id === id ? { ...item, quantity: parsed } : item
                ));
            }
        };

    const increaseQty = (id) => {
        const updatedCart = cart.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
        SetCart(updatedCart);
    }

    const decreaseQty = (id) => {
        const updatedCart = cart.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        ).filter((item) => item.quantity > 0)
        SetCart(updatedCart);
    }

    const removeItem = (id) => {
        const updatedCart = cart.filter((item) => item._id !== id)
            .filter((item) => item.quantity > 0)
        SetCart(updatedCart);
    }

    const clearCart = () => {
        SetCart([]);
    }

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

    return (

        <CartContext.Provider value={{
            cart,
            SetCart,
            addToCart,
            increaseQty,
            decreaseQty,
            removeItem,
            totalPrice,
            clearCart,
            updateQty
        }}>
            {children}
        </CartContext.Provider>
    )
}
export const useCart = () => useContext(CartContext)