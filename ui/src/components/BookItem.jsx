import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Toast from "./Toast";

const BookItem = ({ book, addToCart }) => {
  const { user } = useContext(AuthContext);
  const [toastMessage, setToastMessage] = useState("");

  const addToWishlist = async () => {
    if (!user) {
      setToastMessage("Please log in to add items to your wishlist.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/wishlist/${user.id}/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookId: book._id }),
        }
      );

      if (response.ok) {
        setToastMessage("Book added to wishlist!");
      } else {
        const errorData = await response.json();
        setToastMessage(errorData.error || "Failed to add book to wishlist.");
      }
    } catch (error) {
      console.error("Error adding book to wishlist:", error);
      setToastMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Link to={`/book/${book._id}`}>
        <div className="w-56 flex flex-col items-center hover:bg-amber-100 p-4 rounded">
          <img
            src={book.image}
            alt={book.title}
            className="w-36 h-56 object-cover rounded-lg mb-2"
          />
          <h2 className="text-xl font-semibold text-center">{book.title}</h2>
          <p className="text-sm text-gray-500 text-center">{book.author}</p>
          <div className="flex justify-between gap-8 w-full mt-4">
            <p className="text-lg font-bold">₹{book.price}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                addToWishlist();
              }}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </Link>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </>
  );
};

export default BookItem;
