import React, { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Check from "../svg/Check";
import Checks from "../svg/Checks";

import "./User.scss";
import TimeLine from "../TimeLine/TimeLine";
import Saved from "../svg/Saved";

const User = ({
  user1,
  user,
  selectUser,
  setUserClicked,
  chat,
  windowSize,
}) => {
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

  const handleClick = () => {
    if (windowSize.innerWidth < "900") {
      setUserClicked(true);
    } else {
      setUserClicked(false);
    }
  };

  return (
    <div>
      <div className="users" onClick={handleClick}>
        <div
          className={`user ${chat.name === user.name && "selected-user"}`}
          onClick={() => selectUser(user)}
        >
          <div className="user-info">
            {user.uid !== user1 ? (
              user.avatar ? (
                <img src={user.avatar} alt="avatar" className="avatar" />
              ) : (
                <p className="avatar">{user.name[0]}</p>
              )
            ) : (
              <p className="avatar">
                <Saved />
              </p>
            )}

            <div
              className={`user_status ${
                user.uid !== user1 && user.isOnline ? "online" : "offline"
              }`}
            ></div>
            <div className="user-detail">
              <h4>{user.uid !== user1 ? user.name : "Saved Messages"}</h4>
              {data ? (
                <p className="new-message">
                  {data.text.length > 20
                    ? `${data.text.slice(0, 20)} ...`
                    : data.text}
                </p>
              ) : (
                <p className="new-message">
                  {user.uid !== user1
                    ? `${user.name} joined AXS Messenger`
                    : "Welcome to AXS Messenger"}
                </p>
              )}
            </div>
          </div>
          <div className="unread">
            {data?.from !== user2 ? (
              data?.unread ? (
                data && (
                  <small>
                    <Check
                      checked={
                        chat.name === user.name ? "checked" : "notChecked"
                      }
                    />
                  </small>
                )
              ) : (
                data && (
                  <small>
                    <Checks
                      checked={
                        chat.name === user.name ? "checked" : "notChecked"
                      }
                    />
                  </small>
                )
              )
            ) : (
              <Checks checked="none" />
            )}

            {data ? (
              <span
                className={
                  chat.name !== user.name ? "timeline" : "timeline-selected"
                }
              >
                <TimeLine data={data} />
              </span>
            ) : (
              <span className="timeline-user">
                <TimeLine data={user} />
              </span>
            )}

            {data?.from === user2 && data?.unread ? (
              <div
                className={
                  user.uid !== user1
                    ? chat.name !== user.name
                      ? "new"
                      : "new-selected"
                    : "none"
                }
              ></div>
            ) : (
              <div className="none"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
