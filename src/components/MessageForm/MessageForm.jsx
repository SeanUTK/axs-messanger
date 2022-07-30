import React from "react";
import Attachment from "../svg/Paperclip";
import Send from "../svg/Send";
import Smiley from "../svg/Smiley";
import "./MessageForm.scss";

const MessageForm = ({
  handleSubmit,
  text,
  setText,
  setImg,
  setMessageForm,
}) => {
  return (
    <div className="messages-box">
      <form className="message-form" onSubmit={handleSubmit}>
        <div className="message-input">
          <div className="input-field">
            <Smiley />
            <input
              type="text"
              placeholder="Message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setMessageForm(true)}
              onBlur={() => setMessageForm(false)}
            />
          </div>

          <div className="img-input">
            <label htmlFor="img">
              <Attachment />
            </label>
            <input
              onChange={(e) => setImg(e.target.files[0])}
              type="file"
              id="img"
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
        </div>
        <button className="btn">
          <Send />
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
