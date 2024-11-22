import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('in here');
      
      const response = await axios.post('http://localhost:3000/register', {
        username,
        password,
      });

      alert(response.data); // Success message
      navigate('/login'); // Redirect to login page
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        alert(error.response.data);
      } else {
        // Other errors (e.g., network issues)
        console.log(error);
        
        alert('An error occurred. Please try again.');
      }
    }
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control user-id-input"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
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
