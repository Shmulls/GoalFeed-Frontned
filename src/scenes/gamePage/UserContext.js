import React, { createContext, useState, useMemo } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [loggedInToken, setLoggedInToken] = useState("");
  const [userGuesses, setUserGuesses] = useState([]);

  const contextValue = useMemo(
    () => ({
      loggedInUsername,
      setLoggedInUsername,
      loggedInToken,
      setLoggedInToken,
      userGuesses,
      setUserGuesses,
    }),
    [
      loggedInUsername,
      setLoggedInUsername,
      loggedInToken,
      setLoggedInToken,
      userGuesses,
      setUserGuesses,
    ]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
