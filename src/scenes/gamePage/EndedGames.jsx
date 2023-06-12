import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BASE_URL from "back_url";
import { useParams } from "react-router-dom";
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(3, endedGames.length)}, 1fr)`,
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {endedGames.map((game) => (
          <div
            key={game._id}
            style={{
              borderRadius: "15px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              padding: "1.5rem",
            }}
          >
            <EndedGameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EndedGames;
