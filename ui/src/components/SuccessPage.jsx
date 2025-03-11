import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => (
  <div className="p-6 text-center">
    <h2 className="text-2xl font-bold">Payment Successful!</h2>
    <p>Thank you for your purchase.</p>
    <Link to="/">
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Back to Home
      </button>
    </Link>
  </div>
);

export default SuccessPage;
