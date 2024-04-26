import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

function Header() {

  const [openedDrawer, setOpenedDrawer] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  let profileField = (<div></div>);

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false)
    }
  }
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.get("/signupURL");

      //setSearchResults(searchResults); // Set search results in global state
      window.location.replace(response.data);
    } catch (error) {

    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.get("/loginURL");
      //setSearchResults(searchResults); // Set search results in global state
      window.location.replace(response.data);
    } catch (error) {

    }
  };

  profileField = loggedIn ? (
    <li className="nav-item">
      <Link to="/profile" className="nav-link">
        <FontAwesomeIcon icon={["fas", "user-alt"]} />
      </Link>
    </li>
  ) : (
    <li className="nav-item dropdown">
      <a
        href="#!"
        className="nav-link dropdown-toggle"
        id="userDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <FontAwesomeIcon icon={["fas", "user-alt"]} />
      </a>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
        <li>
          <Link to="#" className="dropdown-item" onClick={handleLogin}>
            Login
          </Link>
        </li>
        <li>
          <Link to="#" className="dropdown-item" onClick={handleRegister}>
            Sign Up
          </Link>
        </li>
      </ul>
    </li>
  );

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('accessToken');
      setLoggedIn(!!token);
    };
    checkToken();
    const handleStorageChange = (event) => {
    
      checkToken();
    };

    window.addEventListener('localStorageChange', handleStorageChange);
    return () => window.removeEventListener('localStorageChange', handleStorageChange);

  }, []);

  
  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={changeNav}>
            <FontAwesomeIcon
              icon={["fab", "bootstrap"]}
              className="ms-1"
              size="lg"
            />
            <span className="ms-2 h5">BinaRentalApp</span>
          </Link>
          <Link className="navbar-brand" to="/addEditor" onClick={changeNav}>
            <span className="ms-2 h7">Create New Add</span>
          </Link>
          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '')}>
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link to="/properties" className="nav-link" replace onClick={changeNav}>
                  Explore
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              {profileField}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
