import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import useNavigationHelpers from '../functions';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link
import './Dashboard.css'; // Ensure to import the same stylesheet to maintain consistent design

const MyListings = () => {
  const { goToNewListing, logout } = useNavigationHelpers();

  const handleLogout = () => logout();

  const handleDeleteListing = (listingId) => {
    console.log(`Delete Listing with ID: ${listingId}`);
  };

  const handleSellItem = (listingId) => {
    console.log(`Sell Item with ID: ${listingId}`);
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
    {
      id: 2,
      image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg',
      title: 'My Listing 2',
      description: 'Description for My Listing 2.',
      existingBids: ['Bid 1', 'Bid 2'],
      minBidValue: '$150',
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg',
      title: 'My Listing 3',
      description: 'Description for My Listing 3.',
      existingBids: ['Bid 1'],
      minBidValue: '$200',
    },
  ];

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
        <div className="row">
          {myListingsData.map((listing) => (
            <div className="col-md-4 mb-4" key={listing.id}>
              <Card className="card-hover shadow-sm">
                <Card.Img variant="top" src={listing.image} />
                <Card.Body>
                  <Card.Title className="card-title">{listing.title}</Card.Title>
                  <Card.Text>{listing.description}</Card.Text>
                  <Card.Subtitle className="card-subtitle minimum-bid mb-2">
                    Minimum Bid Value: {listing.minBidValue}
                  </Card.Subtitle>
                  <Card.Subtitle className="card-subtitle mb-2">Existing Bids:</Card.Subtitle>
                  <ul className="text-muted">
                    {listing.existingBids.map((bid, index) => (
                      <li key={index}>{bid}</li>
                    ))}
                  </ul>
                  <Button variant="success" onClick={() => handleSellItem(listing.id)} className="me-2 btn-gradient">
                    Sell Item
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteListing(listing.id)}
                    className="btn-danger btn-gradient"
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
