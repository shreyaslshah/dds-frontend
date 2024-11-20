import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Import NavLink
import useNavigationHelpers from '../functions';
import './ItemsStyles.css'; // Custom styling file

const ItemsSold = () => {
  const { logout } = useNavigationHelpers();

  const handleLogout = () => logout();
  
  const handleSendReceipt = (itemId) => {
    console.log(`Sending receipt for item ID: ${itemId}`);
  };

  const soldItems = [
    { id: 1, image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg', title: 'Sold Item 1', description: 'Description of Sold Item 1', soldFor: '$200', buyer: 'John Doe' },
    { id: 2, image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg', title: 'Sold Item 2', description: 'Description of Sold Item 2', soldFor: '$300', buyer: 'Jane Smith' }
  ];

  return (
    <div>
      {/* Navbar - Make it consistent with the My Listings navbar */}
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
        <h2 className="text-center mb-4">Items Sold</h2>
        <div className="row">
          {soldItems.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <Card className="card-hover shadow-sm">
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title className="card-title">{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Subtitle className="card-subtitle mb-2">Sold For: {item.soldFor}</Card.Subtitle>
                  <Card.Subtitle className="card-subtitle mb-2">Buyer: {item.buyer}</Card.Subtitle>
                  <Button variant="success" onClick={() => handleSendReceipt(item.id)} className="me-2 btn-gradient">
                    Send Receipt
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

export default ItemsSold;
