import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faBell, faCog } from "@fortawesome/free-solid-svg-icons";

import "./NavBar.css";

const NavBar = ({isLoggedIn, handleLogin, handleLoginClick}) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/favicon.svg" alt="Logo" className="logo" />
      </div>
      <div className="navbar-title">
        <h1>Railway Repair Manager</h1>
      </div>
      <div className="navbar-middle">
        <p>{currentDate}</p>
      </div>
      
      <div className="navbar-icons">
        {isLoggedIn ? (
          <>
          <FontAwesomeIcon icon={faPlus} className="icon1" />
          <FontAwesomeIcon icon={faSearch} className="icon2" />
          <FontAwesomeIcon icon={faBell} className="icon3" />
          <FontAwesomeIcon icon={faCog} className="icon4" />
          <div className="login" onClick={handleLogin} >
            Logout
          </div>
          </>
        ) : (
          <>
          <div className="login" onClick={handleLoginClick} >
            Login
          </div>
          </>
        )}
      </div>
      
    </nav>
  );
}

export default NavBar;