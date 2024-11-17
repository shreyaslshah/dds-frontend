import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useNavigationHelpers from '../functions';

const Dashboard = () => {
  const { goToMyListings, goToNewListing, logout } = useNavigationHelpers();

  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false);
  const [bidValue, setBidValue] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  const handleNewListing = () => {
    console.log("New Listing clicked");
    goToNewListing()
  };

  const handleMyListings = () => {
    console.log("My Listings clicked");
    goToMyListings()
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const handleMakeBidClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setBidValue('');
  };

  const handleBidSubmit = () => {
    console.log(`Bid Value for ${selectedCard.title}:`, bidValue);
    handleModalClose();
  };

  const cardData = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg', // Replace with actual image paths
      title: 'Listing Title 1',
      description: 'Description for Listing 1.',
      existingBids: ['Bid 1', 'Bid 2', 'Bid 3'],
      minBidValue: '$50',
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: 'lightblue' }}>
        <div className="container">
          <a className="navbar-brand" href="/dashboard" style={{ fontWeight: 'bold', fontSize: '24px' }}>
            ResAuc
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleNewListing} style={{ fontWeight: 'bold', fontSize: '20px' }}>
                  New Listing
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleMyListings} style={{ fontWeight: 'bold', fontSize: '20px' }}>
                  My Listings
                </button>
              </li>
            </ul>
            <div className="d-flex">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mt-4">
        <div className="row">
          {cardData.map((card) => (
            <div className="col-md-4 mb-4" key={card.id}>
              <Card>
                <Card.Img variant="top" src={card.image} />
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.description}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">
                    Minimum Bid Value: {card.minBidValue}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">Existing Bids:</Card.Subtitle>
                  <ul>
                    {card.existingBids.map((bid, index) => (
                      <li key={index}>{bid}</li>
                    ))}
                  </ul>
                  <Button variant="primary" onClick={() => handleMakeBidClick(card)}>
                    Make a Bid
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
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
                placeholder="Enter your bid value"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBidSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
