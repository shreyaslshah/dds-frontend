import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import useNavigationHelpers from '../functions';
import ResVaultSDK from 'resvault-sdk';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';
import axios from 'axios';  // Import axios to make API requests
import { useAuth } from '../AuthContext'; // Import the AuthContext hook

const MyListings = () => {
  const { goToNewListing, logout } = useNavigationHelpers();
  const sdkRef = useRef(new ResVaultSDK());
  const { authState } = useAuth(); // Access the current auth state for the username
  const [myListingsData, setMyListingsData] = useState([]);  // State for listings

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/my-listings', {
          params: { username: authState.username }, // Send the username as a query parameter
        });
        if (response.data) {
          setMyListingsData(response.data); // Set the fetched listings
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    if (authState.username) {
      fetchListings(); // Fetch listings when username is available
    }
  }, [authState.username]); // Re-run when the username changes

  const handleLogout = () => logout();

  // Delete listing
  const handleDeleteListing = async (listingId, title) => {
    try {
      const response = await axios.delete('http://localhost:3000/delete-listing', {
        data: { username: authState.username, listingId },
      });

      if (response.status === 200) {
        console.log('Listing deleted successfully:', response.data);

        // Remove listing from the state
        setMyListingsData(myListingsData.filter((listing) => listing._id !== listingId));

        // Optional: ResVaultSDK transaction
        const transactionData = {
          projectName: 'ResAuc',
          transactionType: 'Delete Listing',
          title,
        };

        sdkRef.current?.sendMessage({
          type: 'commit',
          direction: 'commit',
          amount: '1',
          data: transactionData,
          recipient: 'DpVsFmC7d5e39MgRkPmfVPR8npJ3RRsRPZhRDzrK7DCm',
        });

        console.log('Delete Listing Transaction:', transactionData);
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  // Sell item
  const handleSellItem = async (listingId, title, minBidValue) => {
    try {
      const response = await axios.post('http://localhost:3000/sell-item', {
        sellerUsername: authState.username,
        listingId,
      });

      if (response.status === 200) {
        console.log('Item sold successfully:', response.data);

        // Optional: ResVaultSDK transaction
        const transactionData = {
          projectName: 'ResAuc',
          transactionType: 'Sell Item',
          title,
          soldPrice: response.data.soldPrice,
        };

        sdkRef.current?.sendMessage({
          type: 'commit',
          direction: 'commit',
          amount: '1',
          data: transactionData,
          recipient: 'DpVsFmC7d5e39MgRkPmfVPR8npJ3RRsRPZhRDzrK7DCm',
        });

        console.log('Sell Item Transaction:', transactionData);

        // Mark listing as sold in the UI
        setMyListingsData(myListingsData.map((listing) =>
          listing._id === listingId ? { ...listing, sold: true } : listing
        ));
      }
    } catch (error) {
      console.error('Error selling item:', error);
      alert(error.response.data)
    }
  };

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

      {/* Main content */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">My Listings</h2>
        {myListingsData.length === 0 ? (
          <div className="text-center">No listings found.</div>
        ) : (
          <div className="row">
            {myListingsData.map((listing) => (
              <div className="col-md-4 mb-4" key={listing._id}>
                <Card className="card-hover shadow-sm">
                  <Card.Img style={{
                    width: '100%',
                    height: '250px', // Fixed height for uniformity
                    objectFit: 'cover', // Ensures aspect ratio is maintained
                    objectPosition: 'center', // Centers the image within the container
                  }} variant="top" src={listing.image ? `data:image/jpeg;base64,${listing.image}` : 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'} />
                  <Card.Body>
                    <Card.Title className="card-title">{listing.title}</Card.Title>
                    <Card.Text>{listing.description}</Card.Text>
                    <Card.Subtitle className="card-subtitle minimum-bid mb-2">
                      Minimum Bid Value: ${listing.minBidValue}
                    </Card.Subtitle>
                    <Card.Subtitle className="card-subtitle mb-2">Existing Bids:</Card.Subtitle>
                    <ul className="text-muted">
                      {Array.isArray(listing.bids) && listing.bids.map((bid, index) => (
                        <li key={index}>
                          Bid Value: ${bid.bidValue}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="success"
                      onClick={() => handleSellItem(listing._id, listing.title, listing.minBidValue)}
                      className="me-2 btn-gradient"
                      disabled={listing.sold}
                    >
                      {listing.sold ? 'Sold' : 'Sell Item'}
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteListing(listing._id, listing.title)}
                      className="btn-danger btn-gradient"
                      disabled={listing.sold}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
