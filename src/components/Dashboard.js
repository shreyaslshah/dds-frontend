import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom'; 
import useNavigationHelpers from '../functions';
import './Dashboard.css';

const Dashboard = () => {
  const { goToMyListings, goToNewListing, logout } = useNavigationHelpers();
  const location = useLocation(); 

  const [showModal, setShowModal] = useState(false);
  const [bidValue, setBidValue] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

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
      image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg',
      title: 'Listing Title 1',
      description: 'Description for Listing 1.',
      existingBids: ['Bid 1', 'Bid 2', 'Bid 3'],
      minBidValue: '$50',
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg?cs=srgb&dl=pexels-pixabay-207983.jpg&fm=jpg',
      title: 'Listing Title 2',
      description: 'Description for Listing 2.',
      existingBids: ['Bid 4', 'Bid 5', 'Bid 6'],
      minBidValue: '$75',
    },
  ];

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
        <div className="row">
          {cardData.map((card) => (
            <div className="col-md-4 mb-4" key={card.id}>
              <Card className="card-hover">
                <Card.Img variant="top" src={card.image} />
                <Card.Body>
                  <Card.Title className="card-title">{card.title}</Card.Title>
                  <Card.Text className="card-text">{card.description}</Card.Text>
                  <Card.Subtitle className="card-subtitle minimum-bid mb-2">Minimum Bid Value: {card.minBidValue}</Card.Subtitle>
                  <ul className="text-muted">
                    {card.existingBids.map((bid, index) => (
                      <li key={index}>{bid}</li>
                    ))}
                  </ul>
                  <Button className="btn-gradient mt-3" onClick={() => handleMakeBidClick(card)}>
                    Make a Bid
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
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
                className="modal-input" // Use the modal input class
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
