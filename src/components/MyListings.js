import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import useNavigationHelpers from '../functions';

const MyListings = () => {
  const { goToMyListings, goToNewListing, logout } = useNavigationHelpers();

  const handleNewListing = () => {
    console.log("New Listing clicked");
    goToNewListing();
  };

  const handleMyListings = () => {
    console.log("My Listings clicked");
    goToMyListings();
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    logout();
  };

  const handleDeleteListing = (listingId) => {
    console.log(`Delete Listing with ID: ${listingId}`);
  };

  const handleSellItem = (listingId) => {
    console.log(`Sell Item with ID: ${listingId}`);
    // Add any additional logic needed for selling the item
  };

  const myListingsData = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg',
      title: 'My Listing 1',
      description: 'Description for My Listing 1.',
      existingBids: ['Bid 1', 'Bid 2', 'Bid 3'],
      minBidValue: '$100',
    },
    // Add more listings if needed
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
          {myListingsData.map((listing) => (
            <div className="col-md-4 mb-4" key={listing.id}>
              <Card>
                <Card.Img variant="top" src={listing.image} />
                <Card.Body>
                  <Card.Title>{listing.title}</Card.Title>
                  <Card.Text>{listing.description}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">
                    Minimum Bid Value: {listing.minBidValue}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">Existing Bids:</Card.Subtitle>
                  <ul>
                    {listing.existingBids.map((bid, index) => (
                      <li key={index}>{bid}</li>
                    ))}
                  </ul>
                  <Button
                    variant="success"
                    onClick={() => handleSellItem(listing.id)}
                    className="me-2"
                  >
                    Sell Item
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteListing(listing.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyListings;
