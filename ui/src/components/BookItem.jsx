import React from "react";
import CartButton from "./CartButton";

const BookItem = ({ book, addToCart }) => (
  <div className="w-56 flex flex-col items-center hover:bg-amber-100  p-4 rounded">
    <img
      src={book.image}
      alt={book.title}
      className="w-36 h-56 object-cover rounded-lg mb-2"
    />
    <h2 className="text-xl font-semibold text-center">{book.title}</h2>
    <p className="text-sm text-gray-500 text-center ">{book.author}</p>
    <div className="flex justify-between gap-8 w-full mt-4">
      <p className="text-lg font-bold">₹{book.price}</p>
      <CartButton onClick={() => addToCart(book)}>Add to Cart</CartButton>
    </div>
  </div>
);

export default BookItem;
