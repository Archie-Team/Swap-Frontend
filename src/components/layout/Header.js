import React, { useState } from "react";
import BULC from "../../assets/images/Logo.png";

import { navigationItems } from "../../modules/varibales";
import { NavLink } from "react-router-dom";
import "./Header.css";
import ConnectWallet from "./ConnectWallet";

const Header = () => {
  const [navbarActivate, setNavbarActivate] = useState("");

  const toggleNavbarHandler = () => {
    setNavbarActivate(navbarActivate === "active" ? "" : "active");

  };


  return (
    <header className="header">
      <nav className="nav navbar">
        <div className="nav-logo">
          <img src={BULC} alt="" />
          <p>Bullcoin</p>
        </div>
        <ul className={"nav-menu " + navbarActivate}>
          {navigationItems.map((item) => (
            <li className="nav-item" key={item.link}>
              <NavLink
                className="nav-link"
                to={item.link}
                activeClassName="active"
                exact
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="navbar__connect-wallet">
          <ConnectWallet />
        </div>
        <div
          className={"hamburger " + navbarActivate}
          onClick={toggleNavbarHandler}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        
      </nav>
    </header>
  );
};

export default Header;
