import { useState, UseContext } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
//import { UserContext } from "gameComponents/UserContext";
import ValidGuessHistory from "./GuessHistory";
import NewGuess from "./NewGuess";
import WidgetWrapper from "components/WidgetWrapper";
import { UserProvider } from "./UserContext";

const gameManager = () => {
//   const { loggedInUsername, loggedInToken } = useContext(UserContext);

  return (
    <WidgetWrapper>
      <UserProvider>
        <h2>Welcome!</h2>
        <ValidGuessHistory />
        <NewGuess />
        {/* <EndedGames /> */}
      </UserProvider>
    </WidgetWrapper>
  );
};

export default gameManager;
