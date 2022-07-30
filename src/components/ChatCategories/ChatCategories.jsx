import React from "react";
import "./ChatCategories.scss";

const ChatCategories = ({ categories, setCategories }) => {
  return (
    <div className="categories">
      <div className="chat-categories">
        <span
          className={
            categories === "All Chats"
              ? "chat-category active"
              : "chat-category"
          }
          onClick={() => setCategories("All Chats")}
        >
          All Chats
        </span>
        <span
          className={
            categories === "Online" ? "chat-category active" : "chat-category"
          }
          onClick={() => setCategories("Online")}
        >
          Online
        </span>
        <span
          className={
            categories === "Personal" ? "chat-category active" : "chat-category"
          }
          onClick={() => setCategories("Personal")}
        >
          Personal
        </span>
      </div>
      <div className="chat-divider"></div>
    </div>
  );
};

export default ChatCategories;
