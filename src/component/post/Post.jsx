import React from "react";
import "./post.css";

export default function Post() {
  return (
    <div className="post">
      <div className="post-container">
        <div className="user-name-container">
          <p>tal sinay</p>
        </div>
        <p>my name is sinay!!</p>
        <div className="button-like-container">
          <button type="button">like</button>
        </div>
      </div>
    </div>
  );
}
