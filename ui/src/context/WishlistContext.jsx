import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/wishlist/${user.id}`
      );
      setWishlist(response.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlist([]);
    }
  };

  const addToWishlist = async (bookId) => {
    if (!user) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/wishlist/${user.id}/add`, {
        bookId,
      });
      fetchWishlist();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (bookId) => {
    if (!user) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/wishlist/${user.id}/remove/${bookId}`
      );
      fetchWishlist();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
