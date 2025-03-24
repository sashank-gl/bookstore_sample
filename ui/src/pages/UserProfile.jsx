import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Please log in to view your profile.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
