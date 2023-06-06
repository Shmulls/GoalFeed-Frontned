import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { ListGroup } from 'react-bootstrap';
import GameCard from './GameCard';

const GuessHistory = () => {
  const { userGuesses, setUserGuesses } = useContext(UserContext);

  useEffect(() => {
    fetchUserGuesses();
  }, []);

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
    <>
      <h3>Your Guesses that can be changed:</h3>
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

export default GuessHistory;
