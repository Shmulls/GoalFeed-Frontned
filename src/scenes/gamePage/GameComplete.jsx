import { Button, Typography, useTheme, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EndedGames from "./EndedGames";
import UserStatus from "./UserStatus";
import BASE_URL from "back_url";

const GameComplete = () => {
  const navigate = useNavigate();
  const { _id, picturePath } = useSelector((state) => state.user);
  const { userId } = useParams();
  const [fullName, setFullName] = useState("");

  const getUser = async () => {
    const response = await fetch(`${BASE_URL}/users/${userId}/getfullname`, {
      method: "GET",
    });
    const data = await response.json();
    setFullName(data.fullname);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <widgetWrapper>
      <div>
        {/* Add any additional content or components here */}
        <h1 style={{ textAlign: "center", marginTop: "50px" }}>Games history</h1>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>{fullName}</h1>
        <Box display="flex" marginTop="50px" paddingRight="120px">
          <Box flexBasis="30.00%" marginTop="50px" marginLeft="2rem" alignItems="center" display="flex" flexDirection="column" justifyContent="left">
            <Button
              type="submit"
              variant="contained"
              size="large"
              marginTop="20px"
              color="primary"
              sx={{ mx: "auto", mt: 4, display: "block" }}
              onClick={(event) => {
              event.stopPropagation();
              navigate(`/${_id}/Game`);
              }}
            >
              To the GoalFeed game
            </Button>
            <UserStatus />
          </Box>
          <Box flexBasis="70.00%" display="flex" marginTop="50px" alignItems="center" justifyContent="center">
            <EndedGames />
          </Box>
        </Box>
      </div>
    </widgetWrapper>
  );
};

export default GameComplete;
