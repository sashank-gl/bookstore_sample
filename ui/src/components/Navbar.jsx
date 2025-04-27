import { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CartPage from "./CartPage";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    if (showCart) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCart]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/cart/${user.id}`)
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }, [user]);

  return (
    <div className=" flex items-center justify-between pt-4 pb-8 container mx-auto">
      <Link
        to="/"
        className="text-3xl font-semibold text-amber-800 flex gap-2 items-end"
      >
        <img src="/Bookshelf.png" className="h-10" /> The Bookshelf
      </Link>

      <div className="flex items-center gap-4">
        <div
          ref={cartRef}
          onClick={() => setShowCart(!showCart)}
          className="relative cursor-pointer flex gap-2 items-center "
        >
          <p className="hover:underline">Cart</p>

          {cart.length > 0 && (
            <div className="bg-amber-500 text-white w-6 rounded flex justify-center items-center">
              {cart.length}
            </div>
          )}

          {showCart && (
            <div className="absolute top-8 w-96 -left-48">
              <CartPage cart={cart} />
            </div>
          )}
        </div>

        <Link to="/wishlist" className="hover:underline">
          Wishlist
        </Link>

        {user ? (
          <>
            <Link to="/profile" className="hover:underline">
              {user.username}
            </Link>

            <button
              onClick={logout}
              className="hover:underline  cursor-pointer hover:text-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="hover:underline">
              SignUp
            </Link>

            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
