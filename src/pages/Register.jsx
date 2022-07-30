import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/svg/Logo";

import "./Login.scss";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const history = useNavigate();

  const { name, email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      history("/");
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
  // console.log(data);
  return (
    <section className="auth">
      <Logo />
      <h3>AXS Messanger</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input-container"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          className="input-container"
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="input-container"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
        />
        {error ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)." ? (
          <p className="error">*Password should be at least 6 characters</p>
        ) : null}

        {error === "Firebase: Error (auth/invalid-email)." ? (
          <p className="error">*Invalid Email</p>
        ) : null}

        {error === "Firebase: Error (auth/email-already-in-use)." ? (
          <p className="error">*User with this email already exists</p>
        ) : null}
        <div className="btn-container">
          <button className="btn" disabled={loading}>
            {loading ? "Creating ..." : "Create new account"}
          </button>
          <Link to="/login" className="link">
            Log in
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
