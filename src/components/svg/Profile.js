import React from "react";

const UserName = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      fill="#ffffff"
      viewBox="0 0 256 256"
      className="profile"
    >
      <rect width="256" height="256" fill="none"></rect>
      <circle
        cx="128"
        cy="96"
        r="64"
        fill="none"
        stroke="#ffffff"
        stroke-miterlimit="10"
        stroke-width="16"
      ></circle>
      <path
        d="M31,216a112,112,0,0,1,194,0"
        fill="none"
        stroke="#ffffff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></path>
    </svg>
  );
};

export default UserName;
