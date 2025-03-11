import React, { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
import CartPage from "./components/CartPage";
import Toast from "./components/Toast";

export default function Bookstore() {
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

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
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage addToCart={addToCart} cartCount={cart.length} />}
        />
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
  );
}
