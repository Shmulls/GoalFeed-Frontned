import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
          <Link to="/home" className="nav-link">
            <span className="link-text logo-text">Home</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/about" className="nav-link">
            <span className="link-text">About</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/game" className="nav-link">
            <span className="link-text">Game</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            <span className="link-text">Log in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
