import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User ID:', userId);
  };

  return (
    <div className="signup-container">
      <div className="nav-links">
        <span 
          className="nav-link active" 
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </span>
        <span 
          className="nav-link" 
          onClick={() => navigate('/login')}
        >
          Log In
        </span>
      </div>
      <div className="signup-form">
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="form-animate">
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
          <div className="button-group">
            <button type="submit" className="btn btn-primary submit-btn">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
