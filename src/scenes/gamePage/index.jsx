import { useState, UseContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
//import { UserContext } from "gameComponents/UserContext";
import ValidGuessHistory from "./GuessHistory";
import EndedGames from "./EndedGames";
import NewGuess from "./NewGuess";
import ActiveGamesPage from "./ActiveGamesPage";
import FriendGameWidget from "scenes/widgets/FriendListGame";
import GameComplete from "./GameComplete";
import WidgetWrapper from "components/WidgetWrapper";
import { UserProvider } from "./UserContext";
import { textAlign } from "@mui/system";

const gameManager = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [showGuessHistory, setShowGuessHistory] = useState(false);
  //   const { loggedInUsername, loggedInToken } = useContext(UserContext);
  const isAuth = Boolean(useSelector((state) => state.token));

  const toggleGuessHistory = () => {
    setShowGuessHistory(!showGuessHistory);
    navigate(`/${userId}/Game/GameComplete`);
  };

  return (
    <WidgetWrapper>
      <UserProvider>
        <h2 style={{ fontSize: "2.0rem", fontWeight: "bold", textAlign: "center", marginBottom: "10px", paddingRight: "120px" }}>
          Welcome to Goal-Feed Game!
        </h2>
        <Box display="flex" marginTop="50px" paddingRight="120px">
          <Box flexBasis="30.00%" marginTop="50px" marginLeft="2rem" display="flex" justifyContent="left">
            <FriendGameWidget userId={userId} />
          </Box>
          <Box flexBasis="70.00%" display="flex" justifyContent="left">
            <ActiveGamesPage />
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" marginTop="120px">
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={(event) => { event.stopPropagation(); navigate("/home"); }}
            style={{ marginRight: "10px" }}
          >
            home
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={toggleGuessHistory}
            style={{ marginLeft: "10px" }}
          >
            Guess History
          </Button>
        </Box>
        {/* <ValidGuessHistory /> */}
        {/* <NewGuess /> */}
      </UserProvider>
    </WidgetWrapper>
  );
};

export default gameManager;
