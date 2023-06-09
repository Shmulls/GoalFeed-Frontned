import { useState, UseContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Box } from "@mui/material";
//import { UserContext } from "gameComponents/UserContext";
import ValidGuessHistory from "./GuessHistory";
import EndedGames from "./EndedGames";
import NewGuess from "./NewGuess";
import WidgetWrapper from "components/WidgetWrapper";
import { UserProvider } from "./UserContext";

const gameManager = () => {
  const navigate = useNavigate();
//   const { loggedInUsername, loggedInToken } = useContext(UserContext);

  return (
    <WidgetWrapper>
      <UserProvider>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            navigate("/home");
            }}
        >
          home
        </Button>
        <h2>Welcome!</h2>
        <ValidGuessHistory />
        <NewGuess />
        <EndedGames />
      </UserProvider>
    </WidgetWrapper>
  );
};

export default gameManager;
