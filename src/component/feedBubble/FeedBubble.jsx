import React from "react";
import "./feedBubble.css";

export default function FeedBubble() {
  return (
    <div className="feed-bar">
      <div className="feed-bar-container">
        <div className="create-post-text-container">
          <img alt="Post" />
          <input placeholder="write post" />
        </div>
        <div className="create-post-bottom-container">
          <button className="create-post-btn">Share</button>
        </div>
      </div>
    </div>
  );
}
