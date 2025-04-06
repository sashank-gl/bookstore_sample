import React, { useState, useEffect } from "react";

import BookItem from "../components/BookItem";

const HomePage = ({ addToCart, books }) => {
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    let updatedBooks = books;

    // Filter by search
    if (search) {
      updatedBooks = updatedBooks.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by genre
    if (genre) {
      updatedBooks = updatedBooks.filter((book) => book.genre === genre);
    }

    // Filter by author
    if (author) {
      updatedBooks = updatedBooks.filter((book) => book.author === author);
    }

    // Sort by price
    if (sortOrder === "asc") {
      updatedBooks = [...updatedBooks].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      updatedBooks = [...updatedBooks].sort((a, b) => b.price - a.price);
    }

    setFilteredBooks(updatedBooks);
  }, [search, genre, author, sortOrder, books]);

  const uniqueGenres = [...new Set(books.map((book) => book.genre))];
  const uniqueAuthors = [...new Set(books.map((book) => book.author))];

  return (
    <div className="container mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <input
            type="text"
            placeholder="Search books"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-amber-800 rounded focus:outline-amber-900 w-96"
          />
        </div>
        <div>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="p-2 border border-amber-800 rounded focus:outline-none mr-2"
          >
            <option value="">All Genres</option>
            {uniqueGenres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="p-2 border border-amber-800 rounded focus:outline-none mr-2"
          >
            <option value="">All Authors</option>
            {uniqueAuthors.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border border-amber-800 rounded focus:outline-none"
          >
            <option value="default">Sort (Default)</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div>
        {filteredBooks.length === 0 ? (
          <p className="text-center text-xl italic font-semibold ">
            No results found.
          </p>
        ) : (
          <div className="grid grid-cols-5 gap-4 place-items-center">
            {filteredBooks.map((book) => (
              <BookItem key={book._id} book={book} addToCart={addToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
