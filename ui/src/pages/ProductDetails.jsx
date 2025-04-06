import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Toast from "../components/Toast";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/cartContext";
import { WishlistContext } from "../context/WishlistContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
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

    const isWishlisted = wishlist.some((item) => item._id === book._id);

    try {
      if (isWishlisted) {
        await removeFromWishlist(book._id);
      } else {
        await addToWishlist(book._id);
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
    <div className="py-12 flex container mx-auto">
      <div className="flex justify-end mr-12 w-1/3">
        <img
          src={book.image}
          alt={book.title}
          className="h-[32rem] object-cover rounded-lg mb-4"
        />
      </div>
      <div className="space-y-4 w-2/3">
        <h1 className="text-5xl">{book.title}</h1>
        <p>by {book.author}</p>
        <p>{book.genre} Genre</p>
        <p className="max-w-[36rem]">{book.description}</p>
        <p className="text-3xl">₹{book.price}</p>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleWishlist}
            className="px-4 py-2 rounded bg-amber-100 hover:bg-amber-200 cursor-pointer flex items-center gap-2"
          >
            {wishlist.some((item) => item._id === book._id) ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-transparent fill-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                Wishlisted
              </>
            ) : (
              "Add to Wishlist"
            )}
          </button>

          <button
            onClick={() => addToCart(book._id)}
            className="px-4 py-2 rounded bg-amber-100 hover:bg-amber-200 cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
