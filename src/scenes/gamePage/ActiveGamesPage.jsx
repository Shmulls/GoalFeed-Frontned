import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BASE_URL from "back_url";
import { useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import "./ActiveGamesPage.css";
import EndedGameCard from "./EndedGameCard";

const ActiveGamesPage = () => {
  const token = useSelector((state) => state.token);
  const { userId } = useParams();
  const [activeGames, setActiveGames] = useState([]);
  const [userGuesses, setUserGuesses] = useState([]);
  const [homeTeamResults, setHomeTeamResults] = useState({});
  const [awayTeamResults, setAwayTeamResults] = useState({});

  const fetchActiveGames = async () => {
    try {
      const response = await fetch(`${BASE_URL}/game/${userId}/activegame`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const activeGames = await response.json();
      setActiveGames(activeGames);
    } catch (error) {
      console.error(error.response);
    }
  };

  const fetchUserGuesses = async () => {
    try {
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

  useEffect(() => {
    fetchActiveGames();
    fetchUserGuesses();
  }, []);

  const handleResultChange = (event, gameId, team) => {
    const { value } = event.target;

    // Validate input value to allow only positive whole numbers
    const regex = /^[0-9]\d*$/;
    if (value === "" || regex.test(value)) {
      if (team === "homeTeamScore") {
        setHomeTeamResults((prevResults) => ({
          ...prevResults,
          [gameId]: value,
        }));
      } else if (team === "awayTeamScore") {
        setAwayTeamResults((prevResults) => ({
          ...prevResults,
          [gameId]: value,
        }));
      }
    } else {
      alert("Please enter only positive whole numbers.");
    }
  };

  const handleMakeGuess = async (gameId) => {
    const homeTeamResult = homeTeamResults[gameId] || "";
    const awayTeamResult = awayTeamResults[gameId] || "";
    console.log("just try");
    console.log(homeTeamResult, awayTeamResult);

    try {
      await fetch(`${BASE_URL}/game/${userId}/makeguess`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gameId,
          homeTeamScore: homeTeamResult,
          awayTeamScore: awayTeamResult,
        }),
      });

      // Update the userGuesses state with the new guess
      const newGuess = {
        gameId: { _id: gameId },
        homeTeamScore: homeTeamResult,
        awayTeamScore: awayTeamResult,
      };
      setUserGuesses((prevGuesses) => [...prevGuesses, newGuess]);
    } catch (error) {
      console.error(error.response);
    }
  };

  const getUserGuess = (gameId, team) => {
    const userGuess = userGuesses.find((guess) => guess.gameId._id === gameId);
    if (userGuess) {
      return userGuess[team];
    }
    return "";
  };

  return (
    <div className="active-games-page">
      <div className="hd-text">Active Games</div>
      {activeGames.map((game) => {
        const homeTeamGuess = getUserGuess(game._id, "homeTeamScore");
        const awayTeamGuess = getUserGuess(game._id, "awayTeamScore");

        return (
          <div key={game._id} className="active-game-line">
            <div className="team-logo">
              <img src={`/assets/${game.homeTeam}.png`} alt={game.homeTeam} />
            </div>
            <div className="result-input">
              <TextField
                label="Enter your guess"
                variant="outlined"
                value={homeTeamResults[game._id] || homeTeamGuess}
                onChange={(event) =>
                  handleResultChange(event, game._id, "homeTeamScore")
                }
              />
            </div>
            <div className="vs-text">VS</div>
            <div className="result-input">
              <TextField
                label="Enter your guess"
                variant="outlined"
                value={awayTeamResults[game._id] || awayTeamGuess}
                onChange={(event) =>
                  handleResultChange(event, game._id, "awayTeamScore")
                }
              />
            </div>
            <div className="team-logo">
              <img src={`/assets/${game.awayTeam}.png`} alt={game.awayTeam} />
            </div>
            <div className="make-guess-button">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleMakeGuess(game._id)}
              >
                Make Guess
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveGamesPage;
