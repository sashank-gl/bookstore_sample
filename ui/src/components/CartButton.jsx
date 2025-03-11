import React from "react";

const CartButton = ({ children, onClick, className }) => (
  <button
    className={`bg-amber-500 text-white px-3 py-1.5 rounded hover:bg-amber-600 cursor-pointer text-sm ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default CartButton;
