import { Box, useMediaQuery, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import WidgetWrapper from "components/WidgetWrapper";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import PostLikeWidget from "scenes/widgets/PostLikeWidget";
import PostSaveWidget from "scenes/widgets/PostSaveWidget";
import UserWidget from "scenes/widgets/UserWidget";
import StaticData from "./StaticData";
import UserStatus from "scenes/gamePage/UserStatus";
import BASE_URL from "back_url";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [selectedWidget, setSelectedWidget] = useState("posts");
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
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
  }, []);

  const handleWidgetSelection = (widget) => {
    setSelectedWidget(widget);
  };
  // tcgrrxnsvfmxrmlt;
  console.log(_id);

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
          {_id === userId && <MyPostWidget picturePath={user.picturePath} />}{" "}
          <br></br>
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
              variant={selectedWidget === "saved" ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleWidgetSelection("saved")}
            >
              Saved
            </Button>
          </Box>
          {selectedWidget === "posts" && (
            <PostsWidget userId={userId} isProfile />
          )}
          {selectedWidget === "likes" && (
            <PostLikeWidget userId={userId} isProfile />
          )}
          {selectedWidget === "saved" && (
            <PostSaveWidget userId={userId} isProfile />
          )}
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box marginLeft="10px" width="300px">
            <WidgetWrapper>
              <StaticData />
            </WidgetWrapper>
          </Box>
          <Box m="1rem 0" />
          <Box marginLeft="10px" width="300px">
            <WidgetWrapper>
              <h2 style={{ textAlign: "center" }}>GoalFeed game</h2>
              <UserStatus userId={userId} />
            </WidgetWrapper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
