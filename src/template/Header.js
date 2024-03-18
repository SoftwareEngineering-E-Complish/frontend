import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Header() {

  const [openedDrawer, setOpenedDrawer] = useState(false)

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
      const response = await axios.get("http://localhost:8005/signupURL",);
      console.log("Signup URL: " + response.data);
  
      //setSearchResults(searchResults); // Set search results in global state
      window.location.replace(response.data);
      } catch(error){

      }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:8005/loginURL",);
      console.log("Login URL: " + response.data);
  
      //setSearchResults(searchResults); // Set search results in global state
      window.location.replace(response.data);
      } catch(error){

      }
  };

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
          <Link className="navbar-brand" to="/createAdd" onClick={changeNav}>
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
              <li className="nav-item dropdown">
                <a
                  href="!#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={["fas", "user-alt"]} />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
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
            </ul>
          </div>

          
        </div>
      </nav>
    </header>
  );
}

export default Header;
