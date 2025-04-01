import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BookItem from "../components/BookItem";
import Toast from "../components/Toast";

import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/cartContext";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const [toastMessage, setToastMessage] = useState("");

  if (!user) return <p>Please log in to view your wishlist.</p>;

  return (
    <div className="py-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      <div className="grid grid-cols-5 gap-4">
        {wishlist.map((book) => {
          const isInCart = cart.some((cartItem) => cartItem._id === book._id);

          return (
            <div key={book._id}>
              <BookItem book={book} />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    if (isInCart) {
                      removeFromCart(book._id);
                    } else {
                      addToCart(book._id);
                    }
                  }}
                  className={`w-full px-4 py-2 rounded cursor-pointer ${
                    isInCart
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-amber-100 hover:bg-amber-200"
                  }`}
                >
                  {isInCart ? "Remove from Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
};

export default Wishlist;
