import React from "react";

const Smiley = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      fill="#ffffff"
      viewBox="0 0 256 256"
      className="smiley"
    >
      <rect width="256" height="256" fill="none"></rect>
      <circle
        cx="128"
        cy="128"
        r="96"
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></circle>
      <circle cx="92" cy="108" r="12"></circle>
      <circle cx="164" cy="108" r="12"></circle>
      <path
        d="M169.6,152a48.1,48.1,0,0,1-83.2,0"
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
    </svg>
  );
};

export default Smiley;
