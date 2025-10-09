import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListPokemon from "./pages/ListPokemon";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<ListPokemon />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
