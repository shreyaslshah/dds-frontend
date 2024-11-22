import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useNavigationHelpers from '../functions';
import { useAuth } from '../AuthContext'; // Import the AuthContext for auth state
import './ItemsStyles.css'; // Custom styling file

const ItemsBought = () => {
  const { logout } = useNavigationHelpers();
  const { authState } = useAuth(); // Get the current auth state
  const [boughtItems, setBoughtItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => logout();

  // Fetch bought items from the backend
  useEffect(() => {
    const fetchBoughtItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/bought-by-me', {
          headers: { 'Content-Type': 'application/json' },
          params: { username: authState.username }, // Pass the username as a query parameter
        });
        console.log(response)

        // Process the response to calculate `boughtFor` as the highest bid value
        const updatedBoughtItems = response.data.map((item) => {
          const highestBid = item.bids.reduce(
            (max, bid) => (bid.bidValue > max ? bid.bidValue : max),
            item.minBidValue // Start with the minimum bid value
          );

          return {
            ...item,
            boughtFor: `$${highestBid.toFixed(2)}`, // Format as currency
          };
        });

        setBoughtItems(updatedBoughtItems);
      } catch (err) {
        console.error('Error fetching bought items:', err);
        setError('Failed to fetch bought items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBoughtItems();
  }, [authState.username]);

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
        <h2 className="text-center mb-4">Items Bought</h2>

        {loading ? (
          <p className="text-center">Loading bought items...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : boughtItems.length === 0 ? (
          <p className="text-center">No items bought yet.</p>
        ) : (
          <div className="row">
            {boughtItems.map((item) => (
              <div className="col-md-4 mb-4" key={item._id}>
                <Card className="card-hover shadow-sm">
                  <Card.Img
                    variant="top"
                    src={item.image ? `data:image/jpeg;base64,${item.image}` : 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'}
                  />
                  <Card.Body>
                    <Card.Title className="card-title">{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Subtitle className="card-subtitle minimum-bid mb-2">
                      Bought For: {item.boughtFor}
                    </Card.Subtitle>
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

export default ItemsBought;
