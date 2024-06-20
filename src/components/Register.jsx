import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../actions/AuthActions";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css"; // Import the CSS file
import Spinner from "./Spinner"; // Import the Spinner component

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading spinner
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true); // Set loading state to true before dispatching register action

    try {
      await dispatch(register({ name, email, password }));
      toast.success("Registration successful!");
      // Clear form fields after successful registration
      setName("");
      setEmail("");
      setPassword("");
      // Redirect to login page after successful registration
      // navigate("/login");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage.includes("already registered")) {
          toast.error("Email is already registered.");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false); // Set loading state back to false after registration attempt
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          className="form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="form-button" type="submit" disabled={loading}>
        {loading ? (
          <Spinner /> // Show spinner when loading is true
        ) : (
          "Register"
        )}
      </button>
      <p className="form-text">
        Already have an account{" "}
        <Link className="form-link" to="/login">
          Login
        </Link>
      </p>

      <ToastContainer />
    </form>
  );
};

export default Register;