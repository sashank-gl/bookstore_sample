import React, { useState } from "react";
import axios from "axios";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
      });
      setToastMessage("Signup successful! Please login.");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setToastMessage(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center my-12">
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-6 p-6 py-12 rounded  bg-amber-100"
      >
        <h2 className="text-center text-3xl mb-4">SignUp</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="p-2 border border-amber-800 rounded focus:outline-amber-900 w-96"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border border-amber-800 rounded focus:outline-amber-900 w-96"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border border-amber-800 rounded focus:outline-amber-900 w-96"
        />

        <button
          type="submit"
          className="w-full bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 cursor-pointer"
        >
          Signup
        </button>

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        )}
      </form>
    </div>
  );
};

export default Signup;
