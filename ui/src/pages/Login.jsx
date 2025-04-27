import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Toast from "../components/Toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      login(response.data.token);
      setToastMessage("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setToastMessage(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center my-12">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-6 p-6 py-12 rounded  bg-amber-100"
      >
        <h2 className="text-center text-3xl mb-4">Login</h2>

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
          Login
        </button>

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        )}
      </form>
    </div>
  );
};

export default Login;
