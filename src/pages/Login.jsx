import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/svg/Logo";

import "./Login.scss";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const history = useNavigate();

  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setData({
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
  return (
    <section className="auth">
      <Logo />
      <h3>AXS Messanger</h3>
      <form className="form" onSubmit={handleSubmit}>
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
        {error ? <p className="error">*Invalid Email or Password</p> : null}
        <div className="btn-container">
          <button className="btn" disabled={loading}>
            {loading ? "Loading" : "Log in"}
          </button>
          <Link to="/register" className="link">
            Create new account
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
