import React, { useRef, useEffect } from "react";
import TimeLine from "../TimeLine/TimeLine";
import Checks from "../svg/Checks";

import "./Message.scss";

const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  return (
    <div className="message-wrapper" ref={scrollRef}>
      <div className={`${msg.from === user1 ? "right-side" : "left-side"}`}>
        <div className={msg.from === user1 ? "right" : "left"}>
          {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
          {msg.text}
          <span className="timeline">
            <TimeLine data={msg} />
            {msg.from === user1 && <Checks checked="check" />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
