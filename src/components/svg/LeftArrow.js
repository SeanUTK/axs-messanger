import React from "react";

const LeftArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      viewBox="0 0 256 256"
      className="left-arrow"
    >
      <rect width="256" height="256" fill="none"></rect>
      <line
        x1="216"
        y1="128"
        x2="40"
        y2="128"
        fill="none"
        stroke="#ffffff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      ></line>
      <polyline
        points="112 56 40 128 112 200"
        fill="none"
        stroke="#ffffff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      ></polyline>
    </svg>
  );
};

export default LeftArrow;
