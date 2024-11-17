// navigationHelpers.js
import { useNavigate } from "react-router-dom";

const useNavigationHelpers = () => {
  const navigate = useNavigate();

  // Navigation functions
  const goToMyListings = () => {
    navigate("/mylistings");
  };

  const goToNewListing = () => {
    navigate("/newlisting");
  };

  const logout = () => {
    // Implement your logout logic here, then redirect
    console.log("Logout clicked");
  };

  // Return the functions for use in components
  return { goToMyListings, goToNewListing, logout };
};

export default useNavigationHelpers;
