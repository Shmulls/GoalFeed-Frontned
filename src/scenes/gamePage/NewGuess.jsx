import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import BASE_URL from "back_url";
import { UserContext } from "./UserContext";
import "./NewGuess.css";
import EndedGames from "./EndedGames";
import { Box, useMediaQuery, Button } from "@mui/material";
import UserWidget from "scenes/widgets/UserWidget";
import FriendGameWidget from "scenes/widgets/FriendListGame";

const NewGuess = () => {
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [homeTeamScore, setHomeTeamScore] = useState("");
  const [awayTeamScore, setAwayTeamScore] = useState("");
  const [showGuessHistory, setShowGuessHistory] = useState(false);
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [user, setUser] = useState(null);

  const { setUserGuesses } = useContext(UserContext);

  const fetchActiveGames = async () => {
    try {
      const response = await fetch(`${BASE_URL}/game/${userId}/activegame`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log(data);
      //const response = await axios.get('http://localhost:3001/api/active-games');
      setGames(data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const getUser = async () => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    fetchActiveGames();
  }, []);

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
  };

  const handleHomeTeamScoreChange = (event) => {
    setHomeTeamScore(event.target.value);
  };

  const handleAwayTeamScoreChange = (event) => {
    setAwayTeamScore(event.target.value);
  };

  const fetchUserGuesses = async () => {
    try {
      // const response = await axios.get('http://localhost:3001/api/guessing-history-valid');
      const response = await fetch(
        `${BASE_URL}/game/${userId}/getactivegameiguess`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userGuessesData = await response.json();
      const userGuessesArray = Array.isArray(userGuessesData)
        ? userGuessesData
        : Object.values(userGuessesData);
      setUserGuesses(userGuessesArray);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // const response = await axios.post('http://localhost:3001/api/make-guess'
      const response = await fetch(`${BASE_URL}/game/${userId}/makeguess`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gameId: selectedGame,
          homeTeamScore,
          awayTeamScore,
        }),
      });
      fetchUserGuesses();
    } catch (error) {
      console.error(error.response);
    }
  };

  const toggleGuessHistory = () => {
    setShowGuessHistory(!showGuessHistory);
    navigate(`/${userId}/Game/GameComplete`);
  };

  if (!user) return null;

  return (
    <div className="new-guess">
      <h3 className="new-guess-title">Create New Guess:</h3>
      <form className="new-guess-form" onSubmit={handleSubmit}>
        <label className="new-guess-label">
          Select a Game:
          <select
            className="new-guess-select"
            value={selectedGame}
            onChange={handleGameChange}
          >
            <option value="">Select a game</option>
            {games.map((game) => (
              <option key={game._id} value={game._id}>
                {game.homeTeam} vs {game.awayTeam}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label className="new-guess-label">
          Home Team Score:
          <input
            className="new-guess-input"
            type="number"
            value={homeTeamScore}
            onChange={handleHomeTeamScoreChange}
          />
        </label>
        <br />
        <label className="new-guess-label">
          Away Team Score:
          <input
            className="new-guess-input"
            type="number"
            value={awayTeamScore}
            onChange={handleAwayTeamScoreChange}
          />
        </label>
        <br />
        <button className="new-guess-button" type="submit">
          Submit Guess
        </button>
        <br />
        <button
          className="new-guess-button"
          type="button"
          onClick={toggleGuessHistory}
        >
          Guess History
        </button>
        {showGuessHistory && <EndedGames userId={_id} />}
      </form>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <Box m="2rem 0" />
          <FriendGameWidget userId={userId} />
        </Box>
      </Box>
    </div>
  );
};

export default NewGuess;
