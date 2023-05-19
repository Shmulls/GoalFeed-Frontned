import React, { useState } from "react";
import { SendPostRequest } from "../../API/Auth_calls";

import "./feedBubble.css";

export default function FeedBubble() {
  const [content, setPost] = useState("");

  const handlePostChange = (event) => {
    setPost(event.target.value);
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    const userid = "64637f26cc12effe0a500d91";
    console.log(`PostText: ${content}`);
    try {
      await SendPostRequest({
        userid,
        content
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="feed-bar">
      <div className="feed-bar-container">
        <form onSubmit={handlePostSubmit}>
          <div className="create-post-text-container">
            <img alt="Post" />
            <input type="post" value={content} onChange={handlePostChange} placeholder="write post" />
          </div>
          <div className="create-post-bottom-container">
            <button className="create-post-btn">Share</button>
          </div>
        </form>
      </div>
    </div>
  );
}
