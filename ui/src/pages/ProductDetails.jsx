import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Toast from "../components/Toast";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/cartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [wishlist, setWishlist] = useState(new Set());
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/wishlist/${user.id}`)
        .then((res) => res.json())
        .then((data) => setWishlist(new Set(data.map((item) => item._id))))
        .catch((error) => console.error("Error fetching wishlist:", error));
    }
  }, [user]);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to manage your wishlist.");
      return;
    }

    const isWishlisted = wishlist.has(book._id);
    const url = `http://localhost:5000/api/wishlist/${user.id}/${
      isWishlisted ? `remove/${book._id}` : "add"
    }`;
    const method = isWishlisted ? "DELETE" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: isWishlisted ? null : JSON.stringify({ bookId: book._id }),
      });

      if (response.ok) {
        const updatedWishlist = new Set(wishlist);
        isWishlisted
          ? updatedWishlist.delete(book._id)
          : updatedWishlist.add(book._id);
        setWishlist(updatedWishlist);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to update wishlist.");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="h-screen py-6 flex container mx-auto">
      <div className="flex justify-end mr-12">
        <img
          src={book.image}
          alt={book.title}
          className="h-[32rem] object-cover rounded-lg mb-4"
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-5xl">{book.title}</h1>
        <p>by {book.author}</p>
        <p>{book.genre} Genre</p>
        <p>{book.description}</p>
        <p className="text-3xl">₹{book.price}</p>

        <button
          onClick={toggleWishlist}
          className="mr-4 px-4 py-2 rounded bg-amber-100 hover:bg-amber-200 cursor-pointer"
        >
          {wishlist.has(book._id) ? "Wishlisted" : "Add to Wishlist"}
        </button>

        <button
          onClick={() => addToCart(book._id)}
          className="px-4 py-2 rounded bg-amber-100 hover:bg-amber-200 cursor-pointer"
        >
          Add to Cart
        </button>

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
