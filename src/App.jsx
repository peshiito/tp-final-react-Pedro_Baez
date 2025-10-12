import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListPokemon from "./pages/ListPokemon";
import PokemonDescription from "./pages/PokemonDescription.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<ListPokemon />} />
          <Route path="/pokemon/:pokemonId" element={<PokemonDescription />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
