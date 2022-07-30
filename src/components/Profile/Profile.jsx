import React, { useState, useEffect } from "react";
import Camera from "../svg/Camera";
import { storage, db, auth } from "../../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import Delete from "../svg/Delete";
import { useNavigate } from "react-router-dom";
import Dots from "../svg/Dots";
import LeftArrow from "../svg/LeftArrow";

import "./Profile.scss";
import Email from "../svg/Email";
import UserName from "../svg/Profile";
import { signOut } from "firebase/auth";
import Logout from "../svg/Logout";
import Notification from "../svg/Notification";
import Data from "../svg/Data";
import Lock from "../svg/Lock";
import Gear from "../svg/Gear";
import Folder from "../svg/Folder";
import Devices from "../svg/Devices";
import Language from "../svg/Language";

const Profile = ({ setProfile, setClicked }) => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  const [settings, setSettings] = useState(false);
  const history = useNavigate("");

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });

          setImg("");
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImg();
    }
    // eslint-disable-next-line
  }, [img]);

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history("/login");
  };

  const deleteImage = async () => {
    try {
      await deleteObject(ref(storage, user.avatarPath));

      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        avatar: "",
        avatarPath: "",
      });
      history("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return user ? (
    <section>
      <div className="profile-container">
        <div>
          <div className="head">
            <div onClick={() => setClicked(false)}>
              <div onClick={() => setProfile(false)}>
                <LeftArrow />
              </div>
            </div>
            <div className={"settings"}>Settings</div>
            <div onClick={() => setSettings((prev) => !prev)}>
              <Dots active={!settings ? "dots" : "dots dots-active"} />
            </div>
          </div>
          <div className="img-container" onMouseOver={() => setSettings(false)}>
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" />
            ) : (
              <p className="avatar">{user.name[0]}</p>
            )}
          </div>
          <div
            className={user.avatar ? "text-container" : "text-container-center"}
          >
            <h3>{user.name}</h3>
            <h5>{user.isOnline ? "online" : "last seen recently"}</h5>
          </div>
          {user.avatar ? (
            <span onClick={deleteImage}>
              <Delete />
            </span>
          ) : null}
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camera avatar={user.avatar ? "camera" : "camera img"} />
              </label>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="photo"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
          <div
            className={
              user.avatar ? "profile-details email-avatar" : "profile-details"
            }
          >
            <UserName />
            <div className="user-text">
              <p className="user-name">{user.name}</p>
              <p className="userName"> User Name</p>
            </div>
          </div>
          <div
            className={
              user.avatar ? "profile-details email-avatar" : "profile-details"
            }
          >
            <Email />
            <div className="email-text">
              <p className="user-email">{user.email}</p>
              <p className="userEmail">Email</p>
            </div>
          </div>

          <div
            className={
              user.avatar ? "profile-divider avatar-divider" : "profile-divider"
            }
          ></div>
          {settings && (
            <span className="logout-container">
              <Logout onClick={handleSignout} />{" "}
              <span className="logout-text">Log Out</span>
              <span className="blur"></span>
            </span>
          )}
          <div
            className={
              user.avatar
                ? "user-profile-settings"
                : "user-profile-settings avatar-profile-settings"
            }
          >
            <Notification />
            <p>Notifications and Sounds</p>
          </div>
          <div
            className={
              user.avatar
                ? "user-profile-settings"
                : "user-profile-settings avatar-profile-settings"
            }
          >
            <Data />
            <p>Data and Storage</p>
          </div>
          <div
            className={
              user.avatar
                ? "user-profile-settings"
                : "user-profile-settings avatar-profile-settings"
            }
          >
            <Lock />
            <p>Privacy and Security</p>
          </div>
          <div
            className={
              user.avatar
                ? "user-profile-settings"
                : "user-profile-settings avatar-profile-settings"
            }
          >
            <Gear />
            <p>General Settings</p>
          </div>
          <div
            className={
              user.avatar
                ? "user-profile-settings"
                : "user-profile-settings avatar-profile-settings"
            }
          >
            <Folder />
            <p>Chat Folders</p>
          </div>
          <div
            className={
              user.avatar
                ? "user-profile-settings"
                : "user-profile-settings avatar-profile-settings"
            }
          >
            <Devices />
            <p>Devices</p>
          </div>
          <div
            className={
              user.avatar
                ? "user-profile-settings"
                : "user-profile-settings avatar-profile-settings"
            }
          >
            <Language />
            <p>Language</p>
          </div>
          <div
            className={
              settings
                ? user.avatar
                  ? "logout-settings avatar-settings"
                  : "logout-settings"
                : user.avatar
                ? "profile-settings avatar-settings"
                : "profile-settings"
            }
          ></div>
        </div>
      </div>
    </section>
  ) : null;
};

export default Profile;
