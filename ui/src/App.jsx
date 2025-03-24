import React, { useEffect, useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
import CartPage from "./components/CartPage";
import Toast from "./components/Toast";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import UserProfile from "./pages/UserProfile";
import Wishlist from "./pages/Wishlist";

export default function Bookstore() {
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const addToCart = (book) => {
    setCart([...cart, book]);
    setToastMessage(`"${book.title}" added to cart!`);
    setTimeout(() => setToastMessage(""), 5000);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payments/pay",
        { cart }
      );
      const { url } = response.data;
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error.response?.data || error.message);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar cartCount={cart.length} />
        <Routes>
          <Route
            path="/"
            element={<HomePage books={books} addToCart={addToCart} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />

          <Route
            path="/wishlist"
            element={<Wishlist addToCart={addToCart} />}
          />
          <Route path="/book/:id" element={<ProductDetails />} />
          <Route
            path="/cart"
            element={<CartPage cart={cart} handleCheckout={handleCheckout} />}
          />
          <Route
            path="/success"
            element={
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold">Payment Successful!</h2>
                <p>Thank you for your purchase.</p>
                <Link to="/">
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Back to Home
                  </button>
                </Link>
              </div>
            }
          />
        </Routes>

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        )}
      </Router>
    </AuthProvider>
  );
}
