import { Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import EndedGames from "./EndedGames";

const GameComplete = ({ userId }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Hello</h1>
      {/* Add any additional content or components here */}
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
      <EndedGames />
    </div>
  );
};

export default GameComplete;
