import { Button, Typography, useTheme } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import BASE_URL from "back_url";
import "./AdvertWidget.css";

const AdvertWidget = ({ userId }) => {
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchActiveGames = async () => {
      try {
        const response = await fetch(`${BASE_URL}/game/${userId}/activegame`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching active games:", error);
      }
    };

    fetchActiveGames();
  }, []);

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
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          width="70%"
          height="auto"
          alt="next matches"
          src={`${BASE_URL}/assets/nextmatches.png`}
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        />
      </div> */}
      {games.map((game) => (
        <div key={game._id} style={{ display: "flex", justifyContent: "center" }} className="match-item">
          <img src={`/assets/${game.homeTeam}.png`} alt={game.homeTeam} />
          <h3>vs</h3>
          <img src={`/assets/${game.awayTeam}.png`} alt={game.awayTeam} />
        </div>
      ))}
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
