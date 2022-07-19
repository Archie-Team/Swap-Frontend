import React from "react";
import BULC from '../../assets/images/BULKLogo.svg'

import { navigationItems } from "../../modules/varibales";
import { NavLink } from "react-router-dom";
import "./Header.css";
import ConnectWallet from "./ConnectWallet";

const Header = () => {


  return (
    <header className="header">
      <div className="bullcoin-logo">
        <img src={BULC} alt="" />
        <p>Bullcoin</p>
      </div>
      <nav className="nav">
        <ul>
          {navigationItems.map((item) => (
            <li key={item.link}>
              <NavLink to={item.link} activeClassName="active" exact>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

        <ConnectWallet />

    </header>
  );
};

export default Header;
