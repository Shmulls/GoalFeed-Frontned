import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Box, Divider, useMediaQuery, Popover, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ValidGuessHistory from "./GuessHistory";
import EndedGames from "./EndedGames";
import NewGuess from "./NewGuess";
import ActiveGamesPage from "./ActiveGamesPage";
import FriendGameWidget from "scenes/widgets/FriendListGame";
import GameComplete from "./GameComplete";
import UserStatus from "./UserStatus";
import WidgetWrapper from "components/WidgetWrapper";
import { UserProvider } from "./UserContext";

const GameManager = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [showGuessHistory, setShowGuessHistory] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "info-popover" : undefined;

  const toggleGuessHistory = () => {
    setShowGuessHistory(!showGuessHistory);
    navigate(`/${userId}/Game/GameComplete`);
  };

  return (
    <WidgetWrapper>
      <UserProvider>
        <Box display="flex" alignItems="center" justifyContent="flex-end" marginTop="20px" paddingRight="20px">
          <h2 style={{ fontSize: "2.0rem", fontWeight: "bold", marginBottom: "10px", paddingRight: "470px" }}>
            Welcome to Goal-Feed Game!
          </h2>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClick}
            startIcon={<InfoOutlinedIcon />}
          >
            Information
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            PaperProps={{
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(2px)",
                borderRadius: "10px",
                maxWidth: "35%",
              },
            }}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
          >
            <Box p="1rem">
              <Typography variant="h3" align="center">
                Game Rules and Points:
              </Typography>
              <Typography variant="subtitle1" align="center" mt="1rem">
                - Goal-Feed Game is a soccer prediction game where players guess scores of matches.
                <br />
                - Earn 3 points for an accurate guess, where both the home and away team scores are
                <br />
                correctly predicted.
                <br />
                - Earn 1 point for correctly predicting the winning team, regardless of the
                exact score.
                <br />
                - Accumulate points with each correct guess to climb up the leaderboard and compete
                <br />
                against other players.
                <br />
                - Use the guess history to track your prediction and improve your prediction skills.
                <Typography variant="h4" align="center" mt="0.5rem">
                  Enjoy the Goal-Feed Game and aim to earn the highest score by making accurate
                  predictions!
                </Typography>
              </Typography>
            </Box>
          </Popover>
        </Box>
        <Box display="flex" marginTop="50px" paddingRight="120px">
          <Box flexBasis="30.00%" marginTop="50px" marginLeft="2rem" alignItems="center" display="flex" flexDirection="column" justifyContent="left">
            <UserStatus />
            <hr style={{ width: "70%", height: "1px", background: "gray", margin: "1rem 0" }} />
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

export default GameManager;
