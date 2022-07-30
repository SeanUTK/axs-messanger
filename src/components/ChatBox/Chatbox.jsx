import React from "react";
import Message from "../Message/Message";
import MessageForm from "../MessageForm/MessageForm";
import LeftArrow from "../svg/LeftArrow";
import RightArrow from "../svg/RightArrow";
import Saved from "../svg/Saved";

import "./ChatBox.scss";

const Chatbox = ({
  handleSubmit,
  text,
  setText,
  setImg,
  msgs,
  user1,
  chat,
  setUserClicked,
  userClicked,
  setMessageForm,
  messageForm,
}) => {
  return (
    <div className="chatbox">
      {chat ? (
        <>
          <div className="messages-user">
            {!userClicked ? (
              <span onClick={() => setUserClicked(true)}>
                <RightArrow />
              </span>
            ) : (
              <span onClick={() => setUserClicked(false)}>
                <LeftArrow />
              </span>
            )}

            {chat.uid !== user1 ? (
              chat.avatar ? (
                <img src={chat.avatar} alt="avatar" className="avatar" />
              ) : (
                <p className="avatar">{chat.name[0]}</p>
              )
            ) : (
              <p className="avatar-saved">
                <Saved />
              </p>
            )}
            <div className={chat.uid !== user1 ? "user-detail" : "user-saved"}>
              <h3>{chat.uid !== user1 ? chat.name : "Saved Messages"}</h3>
              {chat.uid !== user1 ? (
                <div className="status">
                  {chat.isOnline ? "online" : "last seen recently"}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            className={messageForm ? "messages-container" : "chat-box-active"}
          >
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
              setMessageForm={setMessageForm}
            />
          </div>
        </>
      ) : (
        <div className="default-bg"></div>
      )}
    </div>
  );
};

export default Chatbox;
