import { Button, Typography, useTheme } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import BASE_URL from "back_url";

const AdvertWidget = ({ userId }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper style={{ justifyContent: "space-between" }}>
      <FlexBetween>
        <Typography
          color={dark}
          variant="h3"
          fontWeight="500"
          sx={{ mx: "auto" }}
        >
          NEXT MATCHES
        </Typography>
      </FlexBetween>
      <br></br>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          width="70%"
          height="auto"
          alt="next matches"
          src={`${BASE_URL}/assets/nextmatches.png`}
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        />
      </div>
      <br></br>
      <FlexBetween>
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          sx={{ mx: "auto" }}
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/${userId}/Game`);
          }}
        >
          To the GoalFeed game
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
