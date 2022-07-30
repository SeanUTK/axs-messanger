import React from "react";

const Dots = ({ active }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      fill="#ffffff"
      viewBox="0 0 256 256"
      className={active}
    >
      <rect width="256" height="256" fill="none"></rect>
      <circle cx="128" cy="64" r="20"></circle>
      <circle cx="128" cy="128" r="20"></circle>
      <circle cx="128" cy="192" r="20"></circle>
    </svg>
  );
};

export default Dots;
