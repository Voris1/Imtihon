import React, { useEffect, useState } from "react";
import "./Login.scss";

const Login = () => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      window.location = "/";
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("token", "token");
    window.location = "/";
  };

  return (
    <>
      <div className="login">
        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
          <h1 className="login-h1">Login</h1>
          <div className="login-input-div">
            <label className="login-label" htmlFor="username">
              Email
            </label>
            <input
              className="login-input shadow"
              type="email"
              name="email"
              id="login"
              placeholder="Enter username or email"
              required
            />
          </div>

          <div className="login-input-div">
            <label className="login-label" htmlFor="password">
              Password:
            </label>
            <input
              className="login-input shadow"
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              required
            />
          </div>
          <button className="login-button" typeof="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
