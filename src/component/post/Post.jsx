import React from "react";
import "./post.css";
import { Link } from "react-router-dom";
// import Profile from "../../Pages/profile/Profile";
export default function Post() {
  return (
    <div className="post">
      <div className="post-container">
        <div className="user-name-container">
          <Link to="/profile" className="textUserName">tal sinay</Link>
        </div>
        <p>my name is sinay!!</p>
        <div className="button-like-container">
          <button type="button">like</button>
        </div>
      </div>
    </div>
  );
}
