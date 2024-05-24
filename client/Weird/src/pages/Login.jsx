import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginForm = ({ handleToggleClick }) => {
  const [activeInput, setActiveInput] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputFocus = (index) => {
    setActiveInput(index);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        { ...formData },
        { headers: { "Content-Type": "application/json" } }
      );


      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // setAuth(true);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="sign-in-form">
      <div className="logo">
        <h4>Weird Stories</h4>
      </div>

      <div className="heading">
        <h2>Welcome Back</h2>
        <h6>Not registered yet?</h6> <br />
        <Link to="#" className="toggle" onClick={handleToggleClick}>
          Create Account
        </Link>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
          <input
            type="email"
            name="email"
            value={formData.email}
            className={`input-field ${
              activeInput === 1 || formData.name ? "active" : ""
            }`}
            autoComplete="off"
            required
            onFocus={() => handleInputFocus(1)}
            onBlur={handleInputBlur}
            onChange={handleInputChange}
          />
          <label>Email</label>
        </div>

        <div className="input-wrap">
          <input
            type="password"
            minLength="4"
            name="password"
            value={formData.password}
            className={`input-field ${
              activeInput === 2 || formData.name ? "active" : ""
            }`}
            autoComplete="off"
            required
            onFocus={() => handleInputFocus(2)}
            onBlur={handleInputBlur}
            onChange={handleInputChange}
          />
          <label>Password</label>
        </div>

        <input type="submit" value="Sign In" className="sign-btn" />

        <p className="text">
          Forgotten your password or your login details?{" "}
          <a href="#">Get help</a> signing in
        </p>
      </div>

      {/* <button onClick={() => setAuth(true)}>Hello</button> */}
    </form>
  );
};

export default LoginForm;
