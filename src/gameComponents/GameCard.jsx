import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import './GameCard.css';

const GameCard = ({ game }) => {
  return (
    <Card className="game-card">
      <Card.Body>
        <div className="game-info">
          <Card.Title className="game-id">Game ID: {game.gameId._id}</Card.Title>
          <div className="teams">
            <span className="team home-team">{game.gameId.homeTeam}</span>
            <span className="vs">vs</span>
            <span className="team away-team">{game.gameId.awayTeam}</span>
          </div>
          <div className="scores">
            <Badge pill variant="primary" className="home-score">
              {game.homeTeamScore}
            </Badge>
            <Badge pill variant="primary" className="away-score">
              {game.awayTeamScore}
            </Badge>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
