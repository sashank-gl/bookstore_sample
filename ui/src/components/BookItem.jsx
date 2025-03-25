import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";

const BookItem = ({ book }) => {
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const isWishlisted = wishlist.some((item) => item._id === book._id);

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
          <button
            onClick={(e) => {
              e.preventDefault();
              isWishlisted
                ? removeFromWishlist(book._id)
                : addToWishlist(book._id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`size-6 ${
                isWishlisted && "text-transparent fill-red-500"
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
