import React from "react";
import "./game.css";

const teams = [
  { name: "Team 1", symbol: "Symbol 1" },
  { name: "Team 2", symbol: "Symbol 2" },
  // Add the remaining teams here
];

function Game() {
  const handleResultGuess = () => {
    // Implement the logic to handle the user's result guess
  };

  return (
    <div className="container">
      <h2>Points: 0</h2>

      <div className="game-table">
        {teams.map((team, index) => (
          <div key={team.name} className="match-info">
            <span className="team-name">{team.name}</span>
            <span className="score-guess-box">
              <input
                type="text"
                onChange={handleResultGuess}
                placeholder="Enter score guess"
              />
            </span>
            <span className="team-name">{teams[index + 1]?.name}</span>
            <div className="match-details">
              <span>[time]</span>
              <span>[date]</span>
              <button className="submit-guess-button" type="button">
                Submit Guess
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add the meter component here to show landmarks based on points */}
      {/* eslint-disable-next-line react/self-closing-comp */}
      <div className="meter">
        {/* eslint-disable-next-line react/self-closing-comp */}
        <div className="meter-progress" />
        {/* eslint-disable-next-line react/self-closing-comp */}
        <div className="landmark" />
      </div>
    </div>
  );
}

export default Game;
