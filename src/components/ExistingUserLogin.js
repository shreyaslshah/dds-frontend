import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Signup.css'; // Reuse the same styles from SignUp
import { useNavigate } from 'react-router-dom';

const ExistingUserLogin = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login logic here (e.g., API call)
    console.log('User ID:', userId);
  };

  return (
    <div className="signup-container container d-flex justify-content-center align-items-center vh-100">
      <div className="signup-form">
        <h2 className="text-center mb-4">Existing User Login</h2>
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
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExistingUserLogin;
