import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BASE_URL from "back_url";

const UserStatus = () => {
  const token = useSelector((state) => state.token);
  const { userId } = useParams();
  const [totalScore, setTotalScore] = useState(0);
  const [trophies, setTrophies] = useState([]);

  const getTrophy = (points) => {
    const earnedTrophies = [];

    if (points >= 150) {
      earnedTrophies.push("trophy150");
    }
    if (points >= 3) {
      earnedTrophies.push("trophy100");
    }
    if (points >= 1) {
      earnedTrophies.push("trophy50");
    }

    return earnedTrophies;
  };

  const fetchUserStatus = async () => {
    try {
      const response = await fetch(`${BASE_URL}/game/${userId}/getendedgame`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const endedGames = await response.json();
      const sumPoints = endedGames.reduce((sum, game) => sum + game.points, 0);
      setTotalScore(sumPoints);
      setTrophies(getTrophy(sumPoints));
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    fetchUserStatus();
  }, []);

  return (
    <div className="user-status-container">
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <h2>Total Score:</h2>
        <h2>{totalScore}</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {trophies.map((trophyName) => (
          <img src={`/assets/${trophyName}.png`} width="70px" height="98px" style={{ borderRadius: "50%" }} alt="Trophy" key={trophyName} />
        ))}
      </div>
    </div>
  );
};

export default UserStatus;
