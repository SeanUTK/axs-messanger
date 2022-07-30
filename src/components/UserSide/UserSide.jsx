import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import User from "../User/User";
import Contact from "../Contact/Contact";
import Profile from "../Profile/Profile";

import "./UserSide.scss";

const UserSide = ({
  clicked,
  users,
  selectUser,
  user1,
  chat,
  setClicked,
  setUserClicked,
  windowSize,
}) => {
  const [categories, setCategories] = useState("All Chats");
  const [profile, setProfile] = useState(false);

  return (
    <div className="UserSide">
      {profile ? (
        <Profile setProfile={setProfile} setClicked={setClicked} />
      ) : (
        <>
          <Navbar
            clicked={clicked}
            setClicked={setClicked}
            categories={categories}
            selectUser={selectUser}
            setCategories={setCategories}
            setProfile={setProfile}
          />
          <div className="users-scroll">
            <div onMouseOver={() => setClicked(false)}>
              <div className="users-container">
                {
                  // eslint-disable-next-line
                  users.map((user) => {
                    if (categories === "All Chats") {
                      return (
                        <User
                          key={user.uid}
                          user={user}
                          selectUser={selectUser}
                          user1={user1}
                          chat={chat}
                          clicked={clicked}
                          setClicked={setClicked}
                          setUserClicked={setUserClicked}
                          windowSize={windowSize}
                        />
                      );
                    } else if (
                      categories === "Online" &&
                      user.isOnline === true &&
                      user.uid !== user1
                    ) {
                      return (
                        <User
                          key={user.uid}
                          user={user}
                          selectUser={selectUser}
                          user1={user1}
                          chat={chat}
                          clicked={clicked}
                          setClicked={setClicked}
                          setUserClicked={setUserClicked}
                        />
                      );
                    } else if (
                      categories === "Personal" &&
                      user.uid !== user1
                    ) {
                      return (
                        <Contact
                          key={user.uid}
                          user={user}
                          selectUser={selectUser}
                          user1={user1}
                          chat={chat}
                          clicked={clicked}
                          setClicked={setClicked}
                          setUserClicked={setUserClicked}
                        />
                      );
                    }
                  })
                }
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserSide;
