import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import useNavigationHelpers from '../functions';
import { NavLink } from 'react-router-dom'; // Use NavLink for active link styling
import './ItemsStyles.css'; // Custom styling file

const ItemsBought = () => {
  const { logout } = useNavigationHelpers();

  const handleLogout = () => {
    logout();
  };

  const handleRequestInvoice = (itemId) => {
    console.log(`Requesting invoice for item ID: ${itemId}`);
  };

  const boughtItems = [
    { id: 1, image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg', title: 'Bought Item 1', description: 'Description of Bought Item 1', boughtFor: '$150', seller: 'Alice Brown' },
    { id: 2, image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg', title: 'Bought Item 2', description: 'Description of Bought Item 2', boughtFor: '$250', seller: 'Bob Johnson' }
  ];

  return (
    <div>
      {/* Navbar - Make it consistent with the Items Sold page */}
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
        <h2 className="text-center mb-4">Items Bought</h2>
        <div className="row">
          {boughtItems.length > 0 ? (
            boughtItems.map((item) => (
              <div className="col-md-4 mb-4" key={item.id}>
                <Card className="card-hover">
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title className="card-title">{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Subtitle className="card-subtitle minimum-bid mb-2">{`Bought for: ${item.boughtFor}`}</Card.Subtitle>
                    <Card.Text>Seller: {item.seller}</Card.Text>
                    <Button className="btn-gradient" onClick={() => handleRequestInvoice(item.id)}>Request Invoice</Button>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-center">No items bought yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemsBought;
