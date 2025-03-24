import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const BookItem = ({ book }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState(new Set());

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
        body: isWishlisted ? null : JSON.stringify({ bookId: book._id }), // No body for DELETE
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

  return (
    <Link to={`/book/${book._id}`}>
      <div className="flex flex-col items-center hover:bg-amber-100/75 p-6 rounded hover:scale-[103%] transition-transform duration-300">
        <img
          src={book.image}
          alt={book.title}
          className="w-44 h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-xl font-semibold text-center mb-1">{book.title}</h2>
        <p className="text-sm text-amber-800/80 text-center">{book.author}</p>
        <div className="flex justify-between gap-8 w-full mt-4">
          <p className="text-lg font-bold">₹{book.price}</p>
          <button onClick={toggleWishlist}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`size-6 ${
                wishlist.has(book._id) && "text-transparent fill-red-500"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BookItem;
