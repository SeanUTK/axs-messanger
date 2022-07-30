import React, { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Check from "../svg/Check";
import Checks from "../svg/Checks";

import "../User/User.scss";
import TimeLine from "../TimeLine/TimeLine";

const User = ({ user1, user, selectUser, chat }) => {
  const [data, setData] = useState("");
  const user2 = user?.uid;

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();

    // eslint-disable-next-line
  }, []);

  if (
    (data?.from === user2 && data?.to === user1) ||
    (data?.from === user1 && data?.to === user2)
  ) {
    return (
      <div className="users">
        <div
          className={`user ${chat.name === user.name && "selected-user"}`}
          onClick={() => selectUser(user)}
        >
          <div className="user-info">
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className="avatar" />
            ) : (
              <p className="avatar">{user.name[0]}</p>
            )}

            <div
              className={`user_status ${user.isOnline ? "online" : "offline"}`}
            ></div>
            <div className="user-detail">
              <h4>{user.name}</h4>
              {data ? (
                <p className="new-message">{data.text}</p>
              ) : (
                <p className="new-message">{user.name} joined AXS Messenger</p>
              )}
            </div>
          </div>
          <div className="unread">
            {data?.from !== user2
              ? data?.unread
                ? data && (
                    <small>
                      <Check
                        checked={
                          chat.name === user.name ? "checked" : "notChecked"
                        }
                      />
                    </small>
                  )
                : data && (
                    <small>
                      <Checks
                        checked={
                          chat.name === user.name ? "checked" : "notChecked"
                        }
                      />
                    </small>
                  )
              : data?.unread &&
                data && (
                  <small
                    className={chat.name !== user.name ? "new" : "new-selected"}
                  ></small>
                )}
            <span
              className={
                chat.name !== user.name ? "timeline" : "timeline-selected"
              }
            >
              <TimeLine data={data} />
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default User;
