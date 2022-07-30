import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../../firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import UserSide from "../../components/UserSide/UserSide";
import ChatBox from "../../components/ChatBox/Chatbox";

import "./Home.scss";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [userClicked, setUserClicked] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [messageForm, setMessageForm] = useState(false);

  console.log(messageForm);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  console.log(userClicked);

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("createdAt"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
    // eslint-disable-next-line
  }, []);

  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    setText("");
    setImg("");
    setMessageForm(false);
  };
  return (
    <div className="home">
      <div className={!userClicked ? "home-container" : "ChatBoxContainer"}>
        <UserSide
          clicked={clicked}
          users={users}
          selectUser={selectUser}
          user1={user1}
          chat={chat}
          setClicked={setClicked}
          msgs={msgs}
          setUserClicked={setUserClicked}
          windowSize={windowSize}
        />

        <ChatBox
          handleSubmit={handleSubmit}
          text={text}
          setText={setText}
          setImg={setImg}
          msgs={msgs}
          user1={user1}
          setClicked={setClicked}
          chat={chat}
          setUserClicked={setUserClicked}
          setMessageForm={setMessageForm}
          userClicked={userClicked}
          messageForm={messageForm}
        />
      </div>
    </div>
  );
};

export default Home;
