import { Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EndedGames from "./EndedGames";

const GameComplete = () => {
  const navigate = useNavigate();
  const { _id, picturePath } = useSelector((state) => state.user);
  const { userId } = useParams();

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
          navigate(`/${_id}/Game`);
        }}
      >
        To the GoalFeed game
      </Button>
      <EndedGames />
    </div>
  );
};

export default GameComplete;
