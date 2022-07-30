import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { List } from "phosphor-react";
import ChatCategories from "../ChatCategories/ChatCategories";

import "./Navbar.scss";

const Navbar = ({
  clicked,
  setClicked,
  categories,
  setCategories,
  setProfile,
}) => {
  const history = useNavigate();
  const [seariching, setSeariching] = useState("");

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history("/login");
  };
  return (
    <nav>
      <div className="navbar">
        <List
          size={23}
          color="#aaaaaa"
          weight="bold"
          onClick={() => setClicked((prev) => !prev)}
          className={clicked ? "nav-item bg-circle" : "nav-item"}
        />
        <div className="search">
          <input
            type="text"
            value={seariching}
            id="search"
            placeholder="Search"
            autoComplete="off"
            className="search-input"
            onChange={(e) => setSeariching(e.target.value)}
          />
          <svg
            className="search-icon nav-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="192"
            height="192"
            viewBox="0 0 256 256"
            htmlFor="search"
          >
            <rect width="256" height="256" fill="none"></rect>
            <circle
              cx="116"
              cy="116"
              r="75"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="22"
            ></circle>
            <line
              x1="170"
              y1="170"
              x2="240"
              y2="240"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="22"
            ></line>
          </svg>
          {seariching !== "" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="192"
              height="192"
              fill="#aaaaaa"
              viewBox="0 0 256 256"
              className="x-icon icon"
            >
              <rect width="256" height="256" fill="none"></rect>
              <line
                x1="200"
                y1="56"
                x2="56"
                y2="200"
                stroke="#aaaaaa"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="20"
              ></line>
              <line
                x1="200"
                y1="200"
                x2="56"
                y2="56"
                stroke="#aaaaaa"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="20"
              ></line>
            </svg>
          )}
        </div>
      </div>

      {clicked && (
        <div className="sidebar">
          <>
            <div className="nav-links">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="192"
                height="192"
                fill="#ffffff"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <path
                  d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="nav-link">Saved Messages</span>
            </div>
            <div className="nav-links">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="192"
                height="192"
                fill="#ffffff"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <path
                  d="M208,216H48a8,8,0,0,1-8-8V72L56,40H200l16,32V208A8,8,0,0,1,208,216Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <polyline
                  points="94.1 150.1 128 184 161.9 150.1"
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></polyline>
                <line
                  x1="128"
                  y1="104"
                  x2="128"
                  y2="184"
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></line>
                <line
                  x1="40"
                  y1="72"
                  x2="216"
                  y2="72"
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></line>
              </svg>
              <span className="nav-link">Archived Chats</span>
            </div>
            <div className="nav-links">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="192"
                height="192"
                fill="#fff"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <circle
                  cx="128"
                  cy="96"
                  r="64"
                  fill="none"
                  stroke="#fff"
                  strokeMiterlimit="10"
                ></circle>
                <path
                  d="M31,216a112,112,0,0,1,194,0"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="nav-link">Contacts</span>
            </div>
            <div className="nav-links">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="192"
                height="192"
                fill="#ffffff"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <circle
                  cx="128"
                  cy="128"
                  r="48"
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></circle>
                <path
                  d="M197.4,80.7a73.6,73.6,0,0,1,6.3,10.9L229.6,106a102,102,0,0,1,.1,44l-26,14.4a73.6,73.6,0,0,1-6.3,10.9l.5,29.7a104,104,0,0,1-38.1,22.1l-25.5-15.3a88.3,88.3,0,0,1-12.6,0L96.3,227a102.6,102.6,0,0,1-38.2-22l.5-29.6a80.1,80.1,0,0,1-6.3-11L26.4,150a102,102,0,0,1-.1-44l26-14.4a73.6,73.6,0,0,1,6.3-10.9L58.1,51A104,104,0,0,1,96.2,28.9l25.5,15.3a88.3,88.3,0,0,1,12.6,0L159.7,29a102.6,102.6,0,0,1,38.2,22Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span onClick={() => setProfile(true)} className="nav-link">
                Settings
              </span>
            </div>
            <div className="nav-links">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="192"
                height="192"
                fill="#ffffff"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <line
                  x1="216"
                  y1="112"
                  x2="216"
                  y2="64"
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></line>
                <line
                  x1="240"
                  y1="88"
                  x2="192"
                  y2="88"
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></line>
                <line
                  x1="168"
                  y1="24"
                  x2="168"
                  y2="56"
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></line>
                <line
                  x1="184"
                  y1="40"
                  x2="152"
                  y2="40"
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></line>
                <path
                  d="M216.7,152.6A91.9,91.9,0,0,1,103.4,39.3h0A92,92,0,1,0,216.7,152.6Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="nav-link">Night Mode</span>
            </div>
            <div className="nav-links">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="192"
                height="192"
                fill="#fff"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <polyline
                  points="174 86 216 128 174 170"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></polyline>
                <line
                  x1="104"
                  y1="128"
                  x2="216"
                  y2="128"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></line>
                <path
                  d="M104,216H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h56"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="nav-link" onClick={handleSignout}>
                Log out
              </span>
            </div>
          </>
        </div>
      )}

      <ChatCategories categories={categories} setCategories={setCategories} />
    </nav>
  );
};

export default Navbar;
