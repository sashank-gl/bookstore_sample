import React from "react";

const Toast = ({ message, onClose }) => (
  <div className="fixed flex gap-4 bottom-4 right-4 bg-amber-500 text-white p-2 rounded">
    {message}
    <button onClick={onClose}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 bg-amber-400 cursor-pointer hover:bg-amber-600 rounded"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);

export default Toast;
