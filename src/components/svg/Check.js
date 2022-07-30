import React from "react";

const Check = ({ checked }) => {
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
      <path d="M104,192a8.5,8.5,0,0,1-5.7-2.3l-56-56a8.1,8.1,0,0,1,11.4-11.4L104,172.7,210.3,66.3a8.1,8.1,0,0,1,11.4,11.4l-112,112A8.5,8.5,0,0,1,104,192Z"></path>
    </svg>
  );
};

export default Check;
