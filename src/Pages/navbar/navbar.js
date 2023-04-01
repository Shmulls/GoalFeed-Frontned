import React, { useState } from "react";
import "./navbar.css";

function Navbar() {
  return (
    <div className="nav">
      <nav>
        <ul>
          <li>
            <a href="http://www.google.com">Home</a>
          </li>
          <li>
            <a href="http://www.google.com">About</a>
          </li>
          <li>
            <a href="http://www.google.com">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
