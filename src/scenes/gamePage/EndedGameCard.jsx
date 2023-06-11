import React from "react";
import { useTheme } from "@mui/material";
import { ArrowUpward, CheckCircleOutline, Clear } from "@mui/icons-material";

import "./EndedGameCard.css";

const EndedGameCard = ({ game }) => {
  const { palette } = useTheme();
  const getPointIcon = () => {
    if (game.points === 3) {
      return <CheckCircleOutline className="point-icon green" />;
    } if (game.points === 1) {
      return <ArrowUpward className="point-icon orange" />;
    }
      return <Clear className="point-icon red" />;
  };

  return (
    <div className="ended-game-card">
      <div className="teams-container">
        <div className="team-logo">
          <img src={`/assets/${game.homeTeam}.png`} alt={game.homeTeam} />
          <p>{game.endGameHomeTeamScore}</p>
        </div>
        <div className="vs-container">
          <span className="ended-vs">vs</span>
        </div>
        <div className="team-logo">
          <img src={`/assets/${game.awayTeam}.png`} alt={game.awayTeam} />
          <p>{game.endGameAwayTeamScore}</p>
        </div>
      </div>
      <div className="game-info-container">
        <div className="info-row">
          <p>Week: {game.week}</p>
        </div>
        <div className="guess-row">
          <div className="guess-label">Your Guess</div>
        </div>
        <div className="guess-numbers">
          <p>{game.userHomeTeamScore}</p>
          <span>:</span>
          <p>{game.userAwayTeamScore}</p>
        </div>
        <div className="info-row">
          <p>Points: {game.points}</p>
        </div>
        <div className="points-icon">{getPointIcon()}</div>
      </div>
    </div>
  );
};

export default EndedGameCard;
