import React from "react";
import "./home.css";
import Sidebar from "../../component/sidebar/Sidebar";
import Feed from "../../component/feed/Feed";
import Rightbar from "../../component/rightbar/Rightbar";

function Home1() {
  return (
    <div className="home-page">
      <div className="home-page-container">
        <div className="home-logo"></div>
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
}

export default Home1;
