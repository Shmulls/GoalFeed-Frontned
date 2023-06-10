import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import BASE_URL from "back_url";
import { useParams } from "react-router-dom";
//import axios from 'axios';
import { UserContext } from "./UserContext";
import { ListGroup } from "react-bootstrap";
import GameCard from "./GameCard";

const validGuessHistory = () => {
  const token = useSelector((state) => state.token);
  const { userId } = useParams();
  const { userGuesses, setUserGuesses } = useContext(UserContext);

  const fetchUserGuesses = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/game/${userId}/getactivegameiguess`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      //const response = await axios.get('http://localhost:3001/api/guessing-history-valid');
      const userGuessesData = await response.json(); // Parse the response as JSON
      console.log(userGuessesData);
      const userGuessesArray = Array.isArray(userGuessesData)
        ? userGuessesData
        : Object.values(userGuessesData);
      setUserGuesses(userGuessesArray);
    } catch (error) {
      console.error(error.response);
    }
  };
  useEffect(() => {
    fetchUserGuesses();
  }, []);
  return (
    <>
      <h3>Active games guesses (can be modified):</h3>
      <ListGroup>
        {userGuesses.map((guess) => (
          <ListGroup.Item key={guess._id}>
            <GameCard game={guess} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default validGuessHistory;
