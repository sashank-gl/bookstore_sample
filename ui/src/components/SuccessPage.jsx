import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => (
  <div className="flex justify-center items-center p-6">
    <div className="my-24 w-96 text-center gap-6 flex flex-col items-center border-2 rounded p-6 border-amber-800/50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-20 fill-green-600"
      >
        <path
          fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
          clip-rule="evenodd"
        />
      </svg>

      <h2 className="text-2xl font-bold">Payment Successful!</h2>
      <p>
        Thank you for your purchase. Your order has been processed successfully.
      </p>
      <div className="flex gap-6">
        <Link to="/">
          <button className="w-full px-4 py-2 rounded cursor-pointer bg-amber-100 hover:bg-amber-200">
            Back to Home
          </button>
        </Link>
        <Link to="/profile">
          <button className="w-full px-4 py-2 rounded cursor-pointer bg-amber-100 hover:bg-amber-200">
            View Orders
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default SuccessPage;
