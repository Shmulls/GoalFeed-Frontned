import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import './NewGuess.css'; 

const NewGuess = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');
  const [homeTeamScore, setHomeTeamScore] = useState('');
  const [awayTeamScore, setAwayTeamScore] = useState('');

  const { setUserGuesses } = useContext(UserContext);

  useEffect(() => {
    fetchActiveGames();
  }, []);

  const fetchActiveGames = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/active-games');
      setGames(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
  };

  const handleHomeTeamScoreChange = (event) => {
    setHomeTeamScore(event.target.value);
  };

  const handleAwayTeamScoreChange = (event) => {
    setAwayTeamScore(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/make-guess', {
        gameId: selectedGame,
        homeTeamScore: homeTeamScore,
        awayTeamScore: awayTeamScore,
      });

      console.log(response.data);
      fetchUserGuesses();
    } catch (error) {
      console.error(error.response);
    }
  };

  const fetchUserGuesses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/guessing-history-valid');
      const userGuessesData = response.data;
      const userGuessesArray = Array.isArray(userGuessesData)
        ? userGuessesData
        : Object.values(userGuessesData);
      setUserGuesses(userGuessesArray);
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div className="new-guess">
      <h3 className="new-guess-title">Create New Guess:</h3>
      <form className="new-guess-form" onSubmit={handleSubmit}>
        <label className="new-guess-label">
          Select a Game:
          <select className="new-guess-select" value={selectedGame} onChange={handleGameChange}>
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
          <input className="new-guess-input" type="number" value={homeTeamScore} onChange={handleHomeTeamScoreChange} />
        </label>
        <br />
        <label className="new-guess-label">
          Away Team Score:
          <input className="new-guess-input" type="number" value={awayTeamScore} onChange={handleAwayTeamScoreChange} />
        </label>
        <br />
        <button className="new-guess-button" type="submit">Submit Guess</button>
      </form>
    </div>
  );
};

export default NewGuess;
