import FeedBubble from "../feedBubble/FeedBubble";
import Post from "../post/Post";
import "./feed.css";

export default function Feed() {
  return (
    <div className="feed">
      <div className="feed-container">
        <div className="create-post-container">
          <FeedBubble />
        </div>
        <div className="post-box">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
}
