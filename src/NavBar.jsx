import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faBell, faCog } from "@fortawesome/free-solid-svg-icons";

import "./NavBar.css";

const NavBar = ({isLoggedIn, handleLogin, handleLoginClick, handleTabClick}) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/favicon.svg" alt="Logo" className="logo" />
        <div className="navbar-title">
          <h1>Railway Repair Manager</h1>
        </div>
      </div>
      
      <div className="navbar-middle">
        <p>{currentDate}</p>
      </div>
      
      <div className="navbar-icons">
        {isLoggedIn ? (
          <>
          <FontAwesomeIcon icon={faPlus} className="icon1" 
            onClick={() => handleTabClick('posts')}/>
          <FontAwesomeIcon icon={faSearch} className="icon2" 
            onClick={() => handleTabClick('login')}/>
          <FontAwesomeIcon icon={faBell} className="icon3" 
            onClick={() => handleTabClick('posts')}/>
          <FontAwesomeIcon icon={faCog} className="icon4" 
            onClick={() => handleTabClick('posts')}/>
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