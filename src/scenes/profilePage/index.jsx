import { Box, useMediaQuery, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import PostLikeWidget from "scenes/widgets/PostLikeWidget";
import UserWidget from "scenes/widgets/UserWidget";
import BASE_URL from "back_url";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [selectedWidget, setSelectedWidget] = useState("posts");
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleWidgetSelection = (widget) => {
    setSelectedWidget(widget);
  };

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box display="flex" justifyContent="center" mb="1rem">
            <Button
              variant={selectedWidget === "posts" ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleWidgetSelection("posts")}
            >
              Posts
            </Button>
            <Box mx="1rem" />
            <Button
              variant={selectedWidget === "likes" ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleWidgetSelection("likes")}
            >
              Likes
            </Button>
            <Box mx="1rem" />
            <Button
              variant={selectedWidget === "empty" ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleWidgetSelection("empty")}
            >
              Empty
            </Button>
          </Box>
          <MyPostWidget picturePath={user.picturePath} />
          {selectedWidget === "posts" && (
            <PostsWidget userId={userId} isProfile />
          )}
          {selectedWidget === "likes" && (
            <PostLikeWidget userId={userId} isProfile />
          )}
          {selectedWidget === "empty" &&
            {
              /* Render the necessary components for the empty widget */
            }}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
