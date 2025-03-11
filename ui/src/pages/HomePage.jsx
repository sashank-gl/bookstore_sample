import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BookItem from "../components/BookItem";

const HomePage = ({ addToCart, cartCount }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  return (
    <div className="p-6 bg-amber-50 h-screen">
      <div className="flex justify-between py-6 px-12">
        <h1 className="text-3xl font-semibold italic mb-4">The Bookshelf</h1>
        <Link to="/cart" className="flex gap-2 items-center">
          Cart
          {cartCount > 0 && (
            <div className="bg-amber-500 text-white w-6 rounded flex justify-center items-center">
              {cartCount}
            </div>
          )}
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-4 place-items-center">
        {books.map((book) => (
          <BookItem key={book._id} book={book} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
