import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'; // Reuse styles
import axios from 'axios';
import useNavigationHelpers from '../functions';
import ResVaultSDK from 'resvault-sdk';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the AuthContext hook

const NewListing = () => {
  const { goToMyListings, logout } = useNavigationHelpers();
  const { authState } = useAuth(); // Access the current auth state for the username
  const [itemTitle, setItemTitle] = useState('');
  const [description, setDescription] = useState('');
  const [minBidValue, setMinBidValue] = useState('');
  const [file, setFile] = useState(null);
  const sdkRef = useRef(new ResVaultSDK());
  const location = useLocation();  // Access the current route location

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the data in a JSON format
    const jsonData = {
      title: itemTitle,
      description: description,
      minBidValue: parseInt(minBidValue),
      username: authState.username,  // Get the username from the global auth state
    };
  
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageBase64 = reader.result.split(',')[1];  // Extract base64 string from Data URL
        jsonData.imageBase64 = imageBase64;  // Add the base64 image data to the JSON object
  
        console.log(JSON.stringify(jsonData))
        // Now send the data to the backend using Axios as JSON
        axios.post('http://localhost:3000/new-listing', JSON.stringify(jsonData), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            console.log('Listing created:', response.data);
            alert('Listing created successfully!');
            
            // Optionally handle transaction after listing creation
            const transactionData = {
              projectName: 'ResAuc',
              transactionType: 'New Listing',
              itemTitle,
              description,
              minBidVal: minBidValue,
              itemImage: file ? file.name : 'No file uploaded',
            };
  
            const amount = '1';
            const recipient = 'DpVsFmC7d5e39MgRkPmfVPR8npJ3RRsRPZhRDzrK7DCm';
  
            sdkRef.current?.sendMessage({
              type: 'commit',
              direction: 'commit',
              amount,
              data: transactionData,
              recipient,
            });
          })
          .catch((error) => {
            console.error('Error creating listing:', error);
            alert('Error creating listing. Please try again!');
          });
      };
      reader.readAsDataURL(file);  // Convert the file to base64
    } else {
      // If no file is selected, just send the data without image
      axios.post('http://localhost:3000/new-listing', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log('Listing created:', response.data);
          alert('Listing created successfully!');
          
          // Handle any post-submission logic
          const transactionData = {
            projectName: 'ResAuc',
            transactionType: 'New Listing',
            itemTitle,
            description,
            minBidVal: minBidValue,
            itemImage: 'No file uploaded',
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
        })
        .catch((error) => {
          console.error('Error creating listing:', error);
          alert('Error creating listing. Please try again!');
        });
    }
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
