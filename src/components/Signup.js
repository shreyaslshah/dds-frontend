import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Signup.css'; // Optional: Custom styles for the signup component
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const redirectToLogin = () => {
    navigate('/login')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your signup logic here (e.g., API call)
    console.log('User ID:', userId);
  };

  return (
    <div className="signup-container container d-flex justify-content-center align-items-center vh-100">
      <div className="signup-form">
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId">User ID</label>
            <input
              type="text"
              className="form-control user-id-input"
              id="userId"
              value={userId}
              onChange={handleUserIdChange}
              placeholder="Enter your user ID"
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
            <a href="/login" className="btn btn-secondary" onClick={redirectToLogin}>
              Log In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
