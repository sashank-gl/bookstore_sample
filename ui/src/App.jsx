import React, { useEffect, useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import UserProfile from "./pages/UserProfile";
import Wishlist from "./pages/Wishlist";
import Footer from "./components/Footer";
import { CartProvider } from "./context/cartContext";
import WishlistProvider from "./context/WishlistContext";
import SuccessPage from "./components/SuccessPage";

export default function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-amber-50  text-amber-800">
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage books={books} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/book/:id" element={<ProductDetails />} />
                <Route path="/success" element={<SuccessPage />} />
              </Routes>
              <Footer />
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
