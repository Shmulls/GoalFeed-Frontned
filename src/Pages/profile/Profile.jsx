import "./profile.css";
import Sidebar from "../../component/sidebar/Sidebar";
import Feed from "../../component/feed/Feed";
import Rightbar from "../../component/rightbar/Rightbar";
import Post from "../../component/post/Post";
export default function Profile() {
    return (
      <>
        <div className="profile">
          <Sidebar />
          <div className="feed">
      <div className="feed-container">
        <div className="create-post-container">
         
        </div>
        <div className="post-box">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
          
          <Rightbar/>
        </div>
      </>
    );
  }
