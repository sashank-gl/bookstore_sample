import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import BookItem from "../components/BookItem";
import Toast from "../components/Toast";

const Wishlist = ({ addToCart }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/wishlist/${user.id}`)
        .then((res) => setWishlist(res.data))
        .catch((err) => console.error("Error fetching wishlist:", err));
    }
  }, [user]);

  const removeFromWishlist = async (bookId) => {
    try {
      await axios.post(`http://localhost:5000/api/wishlist/${user.id}/remove`, {
        bookId,
      });
      setWishlist(wishlist.filter((book) => book._id !== bookId));
      setToastMessage("Book removed from wishlist.");
    } catch (error) {
      console.error("Error removing book from wishlist:", error);
      setToastMessage("Failed to remove book from wishlist.");
    }
  };

  if (!user) return <p>Please log in to view your wishlist.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      <div className="grid grid-cols-5 gap-4">
        {wishlist.map((book) => (
          <div key={book._id}>
            <BookItem book={book} addToCart={addToCart} />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => removeFromWishlist(book._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
              <button
                onClick={() => addToCart(book)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
};

export default Wishlist;
