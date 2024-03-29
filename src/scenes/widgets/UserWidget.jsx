import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ManageAccountsOutlined, PhoneOutlined } from "@mui/icons-material";
import { Button, Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import BASE_URL from "back_url";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate(); // added useNavigate
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const { _id } = useSelector((state) => state.user);

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

  if (!user) {
    return null;
  }

  const { firstName, lastName, team, phoneNumber, friends } = user;
  const imagePath = `../assets/${team}.png`;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        {_id === userId && (
          <Button
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/profile/${userId}/EditProfile`);
            }}
          >
            <ManageAccountsOutlined />
          </Button>
        )}
      </FlexBetween>
      <Divider />
      <WidgetWrapper>
        <Box p="0rem 0">
          <Box display="flex" alignItems="center" gap="1rem">
            <PhoneOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{phoneNumber}</Typography>
          </Box>
          <br></br>
          <Divider />
          <br></br>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center" // Add this style to center the image horizontally
            gap="1rem"
            mb="0.5rem"
          >
            <Typography color={medium}>
              <img src={imagePath} alt={team} width="130" height="130" />
            </Typography>
          </Box>
        </Box>
      </WidgetWrapper>
    </WidgetWrapper>
  );
};

export default UserWidget;
