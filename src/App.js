import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Pages/navbar/navbar";
import Login from "./Pages/login/login";

function App() {
  return (
    <Router>
      <Navbar />
      <Login />
    </Router>
  );
}

export default App;
