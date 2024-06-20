import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/AuthActions";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"; // Import the CSS file
import Spinner from "./Spinner"; // Assuming you have a Spinner component

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading spinner
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields."); // Display error toast for empty fields
      return;
    }
    setLoading(true); // Set loading state to true before dispatching login action
    try {
      const response = await dispatch(login({ email, password }, navigate));
      // Check if token exists in localStorage after successful login response
      const token = localStorage.getItem("token");
      if (token && response && response.data && response.data.token) {
        toast.success("Login successful!"); // Display success toast
      } else {
        toast.error("Invalid email or password. Please try again."); // Display error toast
      }
    } catch (err) {
      toast.error("Invalid email or password. Please try again."); // Display error toast
    } finally {
      setLoading(false); // Set loading state back to false after login attempt
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button className="form-button" type="submit" disabled={loading}>
        {loading ? <Spinner /> : "Login"}
      </button>
      <p className="form-text">
        Does not have an account{" "}
        <Link className="form-link" to="/register">
          Register
        </Link>
      </p>
    </form>
  );
};

export default Login;
