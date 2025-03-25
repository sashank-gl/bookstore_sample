import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Please log in to view your profile.</p>;

  return (
    <div className="p-6">
      <p className="text-3xl font-semibold">Hello {user.username},</p>
      <div>
        <p className="text-3xl font-semibold">Your Recent Orders</p>
      </div>
      <div>
        <p className="text-3xl font-semibold">Items In Your Cart</p>
      </div>
      <div>
        <p className="text-3xl font-semibold">Items In Your Wishlist</p>
      </div>
    </div>
  );
};

export default UserProfile;
