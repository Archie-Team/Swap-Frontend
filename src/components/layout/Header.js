import React, { useEffect, useState } from "react";
import BULC from "../../assets/images/Logo.png";
import { navigationItems } from "../../modules/varibales";
import { NavLink } from "react-router-dom";
import "./Header.css";
import ConnectWallet from "./ConnectWallet";
import web3 from "web3";
import { useSelector } from "react-redux";

const Header = () => {
  const [navbarActivate, setNavbarActivate] = useState("");
  const { account, owner } = useSelector((state) => state.auth);
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    if (account && owner) {
      const isAdmin =
        owner === web3.utils.toChecksumAddress(account) ? true : false;
      setisAdmin(isAdmin);
    }
  }, [owner, account]);

  const toggleNavbarHandler = () => {
    setNavbarActivate(navbarActivate === "active" ? "" : "active");
  };

  return (
    <header className="header">
      <nav className="nav navbar">
        <NavLink to="/" className="nav-logo">
          <img src={BULC} alt="" />
          <p>Bullcoin</p>
        </NavLink>
        <ul className={"nav-menu " + navbarActivate}>
          {isAdmin && (
            <li className="nav-item" key="/admin">
              <NavLink
                className="nav-link"
                to="/admin"
                activeClassName="active"
                exact
              >
                admin
              </NavLink>
            </li>
          )}
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
