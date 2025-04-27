import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/${user.id}`
      );
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (bookId) => {
    if (!user) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/cart/${user.id}/add`, {
        bookId,
      });
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (bookId) => {
    if (!user) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/cart/${user.id}/remove/${bookId}`
      );
      fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
