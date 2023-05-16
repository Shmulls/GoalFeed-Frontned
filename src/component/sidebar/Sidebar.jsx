import React from "react";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="side-bar">
      <div className="side-bar-container">
        <div className="btn-container">
          <button className="side-bar-btn" type="button">
            Game
          </button>
          <button className="side-bar-btn" type="button">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
