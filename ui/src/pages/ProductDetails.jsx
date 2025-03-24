import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

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
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <p>Price: ${book.price}</p>
      {/* Add a button to add the book to the wishlist */}
      <button>Add to Wishlist</button>
    </div>
  );
};

export default ProductDetails;
