import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EndedGames.css";
import EndedGameCard from "./EndedGameCard";

const EndedGames = () => {
  const [endedGames, setEndedGames] = useState([]);

  useEffect(() => {
    fetchEndedGames();
  }, []);

  const fetchEndedGames = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/ended-games");
      const endedGames = response.data;
      console.log(endedGames);
      setEndedGames(endedGames);
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div className="ended-games-container">
      <h3 className="ended-games-title">Your Ended Games:</h3>
      {endedGames.map((game) => (
        <EndedGameCard key={game._id} game={game} />
      ))}
    </div>
  );
};

export default EndedGames;
