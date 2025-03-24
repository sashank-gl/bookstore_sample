import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ cartCount }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex justify-between py-6 px-12">
      <Link to="/" className="text-3xl font-semibold italic mb-4">
        The Bookshelf
      </Link>
      <Link to="/cart" className="flex gap-2 items-center">
        Cart
        {cartCount > 0 && (
          <div className="bg-amber-500 text-white w-6 rounded flex justify-center items-center">
            {cartCount}
          </div>
        )}
      </Link>

      <Link to="/wishlist">Wishlist</Link>

      {user ? (
        <>
          <span>Welcome, {user.username}!</span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/signup">SignUp</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
