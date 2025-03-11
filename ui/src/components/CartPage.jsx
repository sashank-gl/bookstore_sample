import React from "react";
import { Link } from "react-router-dom";

const CartPage = ({ cart, handleCheckout }) => (
  <div className="p-6 flex justify-center items-start bg-amber-50 h-screen">
    <div className=" bg-amber-100 rounded p-4 mt-24">
      <h2 className="text-2xl font-bold mb-4 text-center">Cart</h2>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      <div className="flex flex-col gap-4 mb-8">
        {cart.map((book, index) => (
          <div key={index} className="flex gap-4">
            <img
              src={book.image}
              alt={book.title}
              className="size-12 object-cover rounded-lg"
            />
            <div>
              <p>{book.title}</p>
              <p>₹ {book.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <Link to="/">
          <button className=" px-4 py-2 rounded hover:bg-amber-200 cursor-pointer">
            Go Back
          </button>
        </Link>
        {cart.length > 0 && (
          <button
            className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 cursor-pointer"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  </div>
);

export default CartPage;
