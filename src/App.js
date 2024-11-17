import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Routes and Route
import Login from './components/Login';
import TransactionForm from './components/TransactionForm';
import Loader from './components/Loader';
import Signup from './components/Signup.js'; // Import the SignUp component
import { useNavigate } from 'react-router-dom';
import ExistingUserLogin from './components/ExistingUserLogin.js';
import Dashboard from './components/Dashboard.js';
import MyListings from './components/MyListings.js';
import NewListing from './components/NewListing.js';

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoadingAfterLogin, setIsLoadingAfterLogin] = useState(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (authToken) => {
    setIsLoadingAfterLogin(true);
    setToken(authToken);
    sessionStorage.setItem('token', authToken);

    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoadingAfterLogin(false);
    }, 2000);

    navigate('/signup')
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
    sessionStorage.removeItem('token');
  };

  return (
    <div className="App">
      {isLoadingAfterLogin && <Loader />}
      {!isLoadingAfterLogin && (
        <Routes>
          <Route path="/" element={isAuthenticated ? <TransactionForm onLogout={handleLogout} token={token} /> : <Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<ExistingUserLogin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/mylistings' element={<MyListings />} />
          <Route path='/newlisting' element={<NewListing />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
