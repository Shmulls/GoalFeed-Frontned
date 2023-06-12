import { Button, Typography, useTheme, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "back_url";

const StaticData = () => {
  const navigate = useNavigate();
  const { _id, picturePath } = useSelector((state) => state.user);
  const { userId } = useParams();
  const [totalPosts, setTotalPosts] = useState("");
  const [totalLikes, setTotalLikes] = useState("");

  const getData = async () => {
    const response = await fetch(`${BASE_URL}/users/${userId}/getstaticdata`, {
      method: "GET",
    });
    const data = await response.json();
    setTotalPosts(data.totalposts);
    setTotalLikes(data.totalLikes);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="user-status-container">
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <h2>Statistical analysis</h2>
        <h2>Total likes :</h2>
        <h3>{totalLikes}</h3>
        <h2>Total posts :</h2>
        <h3>{totalPosts}</h3>
      </div>
    </div>
  );
};

export default StaticData;
