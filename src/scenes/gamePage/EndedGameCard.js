import React from "react";
import "./EndedGameCard.css";

const EndedGameCard = ({ game }) => {
  return (
    <div className="ended-game-card">
      <div className="ended-game-info">
        <h4 className="ended-game-id">Game ID: {game.gameId}</h4>
        <div className="ended-teams">
          <p className="ended-team">Home Team: {game.homeTeam}</p>
          <span className="ended-vs">vs</span>
          <p className="ended-team">Away Team: {game.awayTeam}</p>
        </div>
        <div className="ended-scores">
          <p className="ended-home-score">End Game Home Team Score: {game.endGameHomeTeamScore}</p>
          <p className="ended-away-score">End Game Away Team Score: {game.endGameAwayTeamScore}</p>
        </div>
        <p>Your Guess for Home Team Score: {game.userHomeTeamScore}</p>
        <p>Your Guess for Away Team Score: {game.userAwayTeamScore}</p>
        <p>Points: {game.points}</p>
      </div>
    </div>
  );
};

export default EndedGameCard;
