import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import axios from 'axios';
import BASE_URL from "back_url";
import { useParams } from "react-router-dom";
import "./EndedGames.css";
import EndedGameCard from "./EndedGameCard";

const EndedGames = () => {
  const token = useSelector((state) => state.token);
  const { userId } = useParams();
  const [endedGames, setEndedGames] = useState([]);

  const fetchEndedGames = async () => {
    try {
      const response = await fetch(`${BASE_URL}/game/${userId}/getendedgame`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      //const response = await axios.get('http://localhost:3001/api/ended-games');
      const endedGames = await response.json();
      console.log(endedGames);
      setEndedGames(endedGames);
    } catch (error) {
      console.error(error.response);
    }
  };
  useEffect(() => {
    fetchEndedGames();
  }, []);

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
