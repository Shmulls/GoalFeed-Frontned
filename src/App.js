import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Pages/navbar/navbar";
import Login from "./Pages/login/login";
import About from "./Pages/About/about";
import Home from "./Pages/home/home";
import Game from "./Pages/game/game";
import Register from "./Pages/register/register";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/game" element={<Game />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
