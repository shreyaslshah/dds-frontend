import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Signup.css'; // Optional: Custom styles for the component
import { useNavigate } from 'react-router-dom';
import useNavigationHelpers from '../functions';
import ResVaultSDK from 'resvault-sdk';

const NewListing = () => {
  const { goToMyListings, goToNewListing, logout } = useNavigationHelpers();
  const navigate = useNavigate();
  const [itemTitle, setItemTitle] = useState('');
  const [description, setDescription] = useState('');
  const [minBidValue, setMinBidValue] = useState('');
  const [file, setFile] = useState(null);
  const sdkRef = useRef(new ResVaultSDK());

  const handleItemTitleChange = (e) => {
    setItemTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleMinBidValueChange = (e) => {
    setMinBidValue(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const redirectToMyListings = () => {
    navigate('/mylistings');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the data object
    const transactionData = {
      itemTitle: itemTitle,
      description: description,
      minBidVal: minBidValue,
      itemImage: file ? file.name : 'No file uploaded',
    };

    const amount = '1219'; // Fixed amount
    const recipient = 'DpVsFmC7d5e39MgRkPmfVPR8npJ3RRsRPZhRDzrK7DCm'; // Fixed recipient address

    // Use the SDK to post the transaction
    if (sdkRef.current) {
      sdkRef.current.sendMessage({
        type: 'commit',
        direction: 'commit',
        amount: amount,
        data: transactionData,
        recipient: recipient,
      });
    } else {
      console.error('SDK is not initialized.');
    }

    // Log form data to the console (optional)
    console.log('Transaction Data:', transactionData);
    console.log('Amount:', amount);
    console.log('Recipient:', recipient);

    redirectToMyListings();
  };

  const handleNewListing = () => {
    goToNewListing();
  };

  const handleMyListings = () => {
    goToMyListings();
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    logout();
  };

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
      <div className="signup-container container d-flex justify-content-center align-items-center vh-100">
        <div className="signup-form">
          <h2 className="text-center mb-4">New Listing</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="itemTitle">Item Title</label>
              <input
                type="text"
                className="form-control"
                id="itemTitle"
                value={itemTitle}
                onChange={handleItemTitleChange}
                placeholder="Enter item title"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter description"
                rows="3"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="minBidValue">Minimum Bid Value</label>
              <input
                type="number"
                className="form-control"
                id="minBidValue"
                value={minBidValue}
                onChange={handleMinBidValueChange}
                placeholder="Enter minimum bid value"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fileUpload">Upload Item Image</label>
              <input
                type="file"
                className="form-control-file"
                id="fileUpload"
                onChange={handleFileChange}
              />
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewListing;





// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../Signup.css'; // Optional: Custom styles for the component
// import { useNavigate } from 'react-router-dom';
// import useNavigationHelpers from '../functions';

// const NewListing = () => {
//   const { goToMyListings, goToNewListing, logout } = useNavigationHelpers();

//   const navigate = useNavigate();
//   const [itemTitle, setItemTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [minBidValue, setMinBidValue] = useState('');
//   const [file, setFile] = useState(null);

//   const handleItemTitleChange = (e) => {
//     setItemTitle(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleMinBidValueChange = (e) => {
//     setMinBidValue(e.target.value);
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const redirectToMyListings = () => {
//     navigate('/mylistings');
//   };

//   const handleNewListing = () => {
//     goToNewListing()
//   };

//   const handleMyListings = () => {
//     goToMyListings()
//   };

//   const handleLogout = () => {
//     console.log("Logout clicked");
//     // Implement your logout logic here
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Implement your logic here (e.g., API call)
//     console.log('Item Title:', itemTitle);
//     console.log('Description:', description);
//     console.log('Minimum Bid Value:', minBidValue);
//     console.log('Uploaded File:', file);
//     redirectToMyListings();
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: 'lightblue' }}>
//         <div className="container">
//           <a className="navbar-brand" href="/dashboard" style={{ fontWeight: 'bold', fontSize: '24px' }}>
//             ResAuc
//           </a>
//           <div className="collapse navbar-collapse">
//             <ul className="navbar-nav me-auto">
//               <li className="nav-item">
//                 <button className="btn btn-link nav-link" onClick={handleNewListing} style={{ fontWeight: 'bold', fontSize: '20px' }}>
//                   New Listing
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button className="btn btn-link nav-link" onClick={handleMyListings} style={{ fontWeight: 'bold', fontSize: '20px' }}>
//                   My Listings
//                 </button>
//               </li>
//             </ul>
//             <div className="d-flex">
//               <button className="btn btn-danger" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main content */}
//       <div className="signup-container container d-flex justify-content-center align-items-center vh-100">
//         <div className="signup-form">
//           <h2 className="text-center mb-4">New Listing</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="itemTitle">Item Title</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="itemTitle"
//                 value={itemTitle}
//                 onChange={handleItemTitleChange}
//                 placeholder="Enter item title"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <textarea
//                 className="form-control"
//                 id="description"
//                 value={description}
//                 onChange={handleDescriptionChange}
//                 placeholder="Enter description"
//                 rows="3"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="minBidValue">Minimum Bid Value</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="minBidValue"
//                 value={minBidValue}
//                 onChange={handleMinBidValueChange}
//                 placeholder="Enter minimum bid value"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="fileUpload">Upload Item Image</label>
//               <input
//                 type="file"
//                 className="form-control-file"
//                 id="fileUpload"
//                 onChange={handleFileChange}
//                 required
//               />
//             </div>
//             <div className="d-flex justify-content-end mt-3">
//               <button type="submit" className="btn btn-primary">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewListing;
