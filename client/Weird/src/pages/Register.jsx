import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = ({ handleToggleClick, setAuth}) => {
  const [activeInput, setActiveInput] = useState(null);
  const[error, setErrors] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputFocus = (index) => {
    setActiveInput(index);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        { ...formData },
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log(response.data);
      // navigate("/dashboard");

      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      setAuth(true)

    } catch (error) {
      console.error("Registration failed:", error);
      setErrors([{ message: "Registration failed. Please check your input." }]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sign-up-form">

      
      <div className="logo">
        {/* <img src={} alt="easyclass" /> */}
        <h4>Weird Stories</h4>
      </div>
      
      <div className="heading">
        <h2>Get Started</h2>
        <h6>Already have an account?</h6>
        {error && (
        <div className="error-container">
          <p className="error-message">
             {error}
          </p>
        </div>
      )}

        <Link to="#" className="toggle" onClick={handleToggleClick}>
         Login here
        </Link>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
          <input
            type="text"
            minLength="4"
            id="name"
            value={formData.name}
            className={`input-field ${
              activeInput === 1 || formData.name ? "active" : ""
            }`}
            autoComplete="off"
            required
            onFocus={() => handleInputFocus(1)}
            onBlur={handleInputBlur}
            onChange={handleChange}
          />
          <label>Name</label>
        </div>

        <div className="input-wrap">
          <input
            type="text"
            minLength="4"
            id="username"
            value={formData.username}
            className={`input-field ${
              activeInput === 2 || formData.username ? "active" : ""
            }`}
            autoComplete="off"
            required
            onFocus={() => handleInputFocus(2)}
            onBlur={handleInputBlur}
            onChange={handleChange}
          />
          <label>Username</label>
        </div>

        <div className="input-wrap">
          <input
            type="email"
            id="email"
            value={formData.email}
            className={`input-field ${
              activeInput === 3 || formData.email ? "active" : ""
            }`}
            autoComplete="off"
            required
            onFocus={() => handleInputFocus(3)}
            onBlur={handleInputBlur}
            onChange={handleChange}
          />
          <label>Email</label>
        </div>

        <div className="input-wrap">
          <input
            type="password"
            minLength="4"
            id="password"
            value={formData.password}
            className={`input-field ${
              activeInput === 4 || formData.password ? "active" : ""
            }`}
            autoComplete="off"
            required
            onFocus={() => handleInputFocus(4)}
            onBlur={handleInputBlur}
            onChange={handleChange}
          />
          <label>Password</label>
        </div>

        <div className="input-wrap">
          <input
            type="password"
            minLength="4"
            id="confirmPassword"
            value={formData.confirmPassword}
            className={`input-field ${
              activeInput === 5 || formData.confirmPassword ? "active" : ""
            }`}
            autoComplete="off"
            required
            onFocus={() => handleInputFocus(5)}
            onBlur={handleInputBlur}
            onChange={handleChange}
          />
          <label>Confirm Password</label>
        </div>

        

        <button type="submit" className="sign-btn">
          Sign Up
        </button>

        <p className="text">
          By signing up, I agree to the Terms of Services and
        Privacy Policy
        </p>
      </div>
    </form>
  );
};

Register.propTypes = {
  handleToggleClick: PropTypes.func.isRequired,
};

export default Register;
