import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [loggedInToken, setLoggedInToken] = useState(""); // Add loggedInToken state
  const [userGuesses, setUserGuesses] = useState([]);
  return (
    <UserContext.Provider value={{
      loggedInUsername,
      setLoggedInUsername,
      loggedInToken,
      setLoggedInToken,
      userGuesses,
      setUserGuesses }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
