import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'; // Reuse styles
import useNavigationHelpers from '../functions';
import ResVaultSDK from 'resvault-sdk';
import { NavLink, useLocation } from 'react-router-dom';

const NewListing = () => {
  const { goToMyListings, logout } = useNavigationHelpers();
  const [itemTitle, setItemTitle] = useState('');
  const [description, setDescription] = useState('');
  const [minBidValue, setMinBidValue] = useState('');
  const [file, setFile] = useState(null);
  const sdkRef = useRef(new ResVaultSDK());
  const location = useLocation();  // Access the current route location

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = {
      itemTitle,
      description,
      minBidVal: minBidValue,
      itemImage: file ? file.name : 'No file uploaded',
    };

    const amount = '1219';
    const recipient = 'DpVsFmC7d5e39MgRkPmfVPR8npJ3RRsRPZhRDzrK7DCm';

    sdkRef.current?.sendMessage({
      type: 'commit',
      direction: 'commit',
      amount,
      data: transactionData,
      recipient,
    });

    console.log('Transaction Data:', transactionData);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleLogout = () => {
    logout();
  };

  // Function to check if the current path is active
  const isActiveLink = (path) => location.pathname === path;

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: '#1a1a40' }}>
        <div className="container">
          <NavLink className="navbar-brand text-light" to="/dashboard" style={{ fontWeight: 'bold', fontSize: '24px' }}>
            ResAuc
          </NavLink>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/my-listings" activeClassName="active-link">
                  My Listings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/new-listing" activeClassName="active-link">
                  New Listing
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/items-sold" activeClassName="active-link">
                  Items Sold
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/items-bought" activeClassName="active-link">
                  Items Bought
                </NavLink>
              </li>
            </ul>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-4 signup-form">
        <h2>Create New Listing</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="itemTitle" className="form-label">
              Item Title
            </label>
            <input
              type="text"
              className="form-control input-field"
              id="itemTitle"
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
              placeholder="Enter the title of your item"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control input-field"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the item"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="minBidValue" className="form-label">
              Minimum Bid Value
            </label>
            <input
              type="number"
              className="form-control input-field"
              id="minBidValue"
              value={minBidValue}
              onChange={(e) => setMinBidValue(e.target.value)}
              placeholder="Set the minimum bid value (in USD)"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fileUpload" className="form-label">
              Upload Image (Optional)
            </label>
            <input type="file" className="form-control" id="fileUpload" onChange={handleFileChange} />
            <small className="form-text text-muted">Optional: Upload an image to make your listing more attractive.</small>
          </div>
          <div className="button-group">
            <button type="submit" className="submit-btn">
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewListing;
