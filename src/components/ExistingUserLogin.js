import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'; // Reuse the same styles
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the AuthContext hook

const ExistingUserLogin = () => {
  const navigate = useNavigate();
  const { updateAuthState } = useAuth(); // Correctly access the updateAuthState function from useAuth
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' }); // Feedback message state

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' }); // Clear previous messages

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      // Update global state with the logged-in username
      updateAuthState({ username });

      setMessage({ type: 'success', text: 'Login successful!' });
      console.log('User data:', response.data); // Optional: Debug user data
      navigate('/dashboard'); // Redirect to a dashboard or another page
    } catch (error) {
      if (error.response) {
        setMessage({ type: 'error', text: error.response.data }); // Show the error message from the backend
      } else {
        console.log(error);
        setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="nav-links">
        <span 
          className="nav-link" 
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </span>
        <span 
          className="nav-link active" 
          onClick={() => navigate('/login')}
        >
          Log In
        </span>
      </div>
      <div className="signup-form">
        <h2 className="text-center">Existing User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
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
          {message.text && (
            <div className={`feedback-message ${message.type}`}>
              {message.text}
            </div>
          )}
          <div className="button-group">
            <button type="submit" className="btn btn-primary login-btn">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExistingUserLogin;
