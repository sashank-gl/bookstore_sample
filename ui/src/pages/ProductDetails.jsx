import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Toast from "../components/Toast";

const ProductDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState(new Set());
  const [toastMessage, setToastMessage] = useState("");

  // Fetch wishlist on component mount
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/wishlist/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          const wishlistSet = new Set(data.map((item) => item._id));
          setWishlist(wishlistSet);
        })
        .catch((error) => console.error("Error fetching wishlist:", error));
    }
  }, [user]);

  const addToCart = async (bookId) => {
    if (!user) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/cart/${user.id}/add`,
        { bookId }
      );
      setToastMessage("Book added to cart!");
      setTimeout(() => setToastMessage(""), 5000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

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
    const fetchBookDetails = async () => {
      const response = await fetch(`http://localhost:5000/api/books/${id}`);
      const data = await response.json();
      setBook(data);
    };

    fetchBookDetails();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="h-screen py-6 flex container mx-auto">
      <div className=" flex justify-end mr-12">
        <img
          src={book.image}
          alt={book.title}
          className=" h-[32rem] object-cover rounded-lg mb-4"
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
          {wishlist.has(book._id) ? (
            <span className="flex items-center">
              Wishlisted
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 ml-2 text-transparent fill-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </span>
          ) : (
            "Add to Wishlist"
          )}
        </button>

        <button
          onClick={() => addToCart(book._id)}
          className=" px-4 py-2 rounded bg-amber-100 hover:bg-amber-200 cursor-pointer"
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
