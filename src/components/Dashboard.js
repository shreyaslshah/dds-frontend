import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import useNavigationHelpers from '../functions';
import ResVaultSDK from 'resvault-sdk';
import './Dashboard.css';
import { useAuth } from '../AuthContext'; // Import the AuthContext hook
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { goToMyListings, goToNewListing, logout } = useNavigationHelpers();
  const location = useLocation();
  const { authState } = useAuth(); // Access the current auth state for the username
  const [listings, setListings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bidValue, setBidValue] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  // Initialize ResVaultSDK
  const sdkRef = useRef(new ResVaultSDK());

  // Fetch listings on component mount
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/all-listings');
        setListings(response.data); // Assuming response.data contains an array of listings
        console.log(listings)
      } catch (error) {
        console.error('Error fetching listings:', error);
        alert('Error fetching listings. Please try again later.');
      }
    };

    fetchListings();
  }, []);

  const handleMakeBidClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setBidValue('');
  };

  const handleBidSubmit = async () => {
    if (!bidValue || !selectedCard) return;

    const transactionData = {
      projectName: 'ResAuc',
      transactionType: 'Bid',
      listingTitle: selectedCard.title,
      bidValue,
    };

    const recipient = 'DpVsFmC7d5e39MgRkPmfVPR8npJ3RRsRPZhRDzrK7DCm';

    try {
      // Send bid to backend
      const response = await axios.post('http://localhost:3000/post-bid', {
        username: authState.username, // Replace with your actual username
        listingId: selectedCard._id, // Assuming _id is the unique identifier for the listing
        bidValue
      });

      // Handle the response from the backend
      console.log(response.data); // Success message from the backend
      alert('Bid placed successfully!');

      // Send message to ResVaultSDK
      sdkRef.current?.sendMessage({
        type: 'commit',
        direction: 'commit',
        amount: '1',
        data: transactionData,
        recipient,
      });

      console.log(`Bid Submitted:`, transactionData);
      handleModalClose();
    } catch (error) {
      console.error('Error placing bid:', error);
      alert(error.response?.data || 'Error placing bid. Please try again.');
    }
  };


  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: '#1a1a40' }}>
        <div className="container">
          <Link
            className={`navbar-brand text-light ${location.pathname === '/dashboard' ? 'text-decoration-underline' : ''}`}
            to="/dashboard"
            style={{ fontWeight: 'bold', fontSize: '24px' }}
          >
            ResAuc
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/my-listings">My Listings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/new-listing">New Listing</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/items-sold">Items Sold</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/items-bought">Items Bought</Link>
              </li>
            </ul>
            <button className="btn btn-danger" onClick={logout}>Logout</button>
          </div>
        </div>
      </nav>

      {/* Cards Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">All Listings</h2>
        <div className="row">
          {listings.length === 0 ? (
            <p>No listings available.</p>
          ) : listings.filter(listing => !listing.sold).length === 0 ? (
            <p>No unsold listings found.</p>
          ) : (
            listings.filter(listing => !listing.sold).map((listing, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <Card className="card-hover">
                  <Card.Img
                    style={{
                      width: '100%',
                      height: '250px', // Fixed height for uniformity
                      objectFit: 'cover', // Ensures aspect ratio is maintained
                      objectPosition: 'center', // Centers the image within the container
                    }}
                    variant="top"
                    src={listing.image ? `data:image/jpeg;base64,${listing.image}` : 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'}
                  />
                  <Card.Body>
                    <Card.Title className="card-title">{listing.title}</Card.Title>
                    <Card.Text className="card-text">{listing.description}</Card.Text>
                    <Card.Subtitle className="card-subtitle minimum-bid mb-2">Minimum Bid Value: {listing.minBidValue || '$0'}</Card.Subtitle>
                    <ul className="text-muted">
                      {(listing.bids || []).map((bid, index) => (
                        <li key={index}>
                          {bid.bidValue ? `$${bid.bidValue}` : 'No amount provided'}
                        </li>
                      ))}
                    </ul>
                    <Button className="btn-gradient mt-3" onClick={() => handleMakeBidClick(listing)}>
                      Make a Bid
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Make a Bid for {selectedCard && selectedCard.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Bid Value</Form.Label>
              <Form.Control
                type="number"
                value={bidValue}
                onChange={(e) => setBidValue(e.target.value)}
                placeholder="Enter your bid"
                className="modal-input"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose} className="btn-gradient">
            Close
          </Button>
          <Button variant="primary" onClick={handleBidSubmit} className="btn-gradient">
            Submit Bid
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
