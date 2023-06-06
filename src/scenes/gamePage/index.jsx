import { useState, UseContext } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { UserContext } from "gameComponents/UserContext";
import WidgetWrapper from "components/WidgetWrapper";
import GuessHistory from "gameComponents/GuessHistory";
import NewGuess from "gameComponents/NewGuess";
import EndedGames from "gameComponents/EndedGames";

const gameManager = () => {
  const { loggedInUsername, loggedInToken } = useContext(UserContext);

  return (
    <WidgetWrapper>
      <h2>Welcome!</h2>
      <GuessHistory />
      <NewGuess />
      <EndedGames />
    </WidgetWrapper>
  );
};

export default gameManager;
