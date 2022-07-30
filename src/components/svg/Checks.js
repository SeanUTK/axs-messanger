import React from "react";

const Checks = ({ checked }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="#8774e1"
      viewBox="0 0 256 256"
      className={checked}
    >
      <rect width="256" height="256" fill="none"></rect>
      <path d="M153.7,89.7l-88,88a8.2,8.2,0,0,1-11.4,0l-44-44a8.1,8.1,0,0,1,11.4-11.4L60,160.7l82.3-82.4a8.1,8.1,0,0,1,11.4,11.4Zm92-11.4a8.1,8.1,0,0,0-11.4,0L152,160.7,134.3,143A8,8,0,0,0,123,154.3l23.3,23.4a8.2,8.2,0,0,0,11.4,0l88-88A8.1,8.1,0,0,0,245.7,78.3Z"></path>
    </svg>
  );
};

export default Checks;
