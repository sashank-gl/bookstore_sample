import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartPage from "./CartPage";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/cartContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/cart/${user.id}`)
        .catch((err) => console.error("Error fetching cart:", err));
    }
  }, [user]);

  return (
    <div className=" flex items-center justify-between pt-4 pb-8 container mx-auto">
      <Link to="/" className="text-3xl font-semibold italic text-amber-800">
        The Bookshelf
      </Link>

      <div className="flex items-center gap-4">
        <div
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
