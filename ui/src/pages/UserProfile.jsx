import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { WishlistContext } from "../context/WishlistContext";

import axios from "axios";
import { CartContext } from "../context/cartContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/orders/${user.id}`)
        .then((response) => setOrders(response.data))
        .catch((error) => console.error("Error fetching orders:", error));
    }
  }, [user]);

  if (!user) return <p>Please log in to view your profile.</p>;

  return (
    <div className="p-6">
      <p className="text-3xl font-semibold">Hello {user.username},</p>
      <div>
        <p className="text-xl">Your Orders ({orders.length})</p>
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="my-6 p-6 flex  gap-6 bg-amber-100/50"
              >
                <div className="flex gap-4">
                  {order.books.map(({ book }) => (
                    <a
                      key={book._id}
                      href={`/book/${book._id}`}
                      className="block"
                    >
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-24 h-32 object-cover rounded-lg hover:opacity-80 transition-opacity"
                      />
                    </a>
                  ))}
                </div>
                <div className=" flex flex-col gap-1">
                  <p className=" ">Order ID: {order._id}</p>
                  <p className=" ">Status: {order.status}</p>
                  <p className=" ">Total Price: ₹{order.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No recent orders.</p>
        )}
      </div>
      <div>
        <p className="text-xl">Items In Your Cart ({cart.length})</p>
        {cart.length > 0 ? (
          <div className="flex gap-4 mt-2">
            {cart.map((item) => (
              <a key={item._id} href={`/book/${item._id}`} className="block">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-32 object-cover rounded-lg hover:opacity-80 transition-opacity"
                />
              </a>
            ))}
          </div>
        ) : (
          <p>No items in your cart.</p>
        )}
      </div>
      <div>
        <p className="text-xl">Items In Your Wishlist ({wishlist.length})</p>
        {wishlist.length > 0 ? (
          <div className="flex gap-4 mt-2">
            {wishlist.map((item) => (
              <a key={item._id} href={`/book/${item._id}`} className="block">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-32 object-cover rounded-lg hover:opacity-80 transition-opacity"
                />
              </a>
            ))}
          </div>
        ) : (
          <p>No items in your wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
