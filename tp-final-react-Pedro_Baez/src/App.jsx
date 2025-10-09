import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListPokemon from "./pages/list_pokemon";
import InfoPokemon from "./pages/info_pokemon";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<ListPokemon />} />
          <Route path="/pokemon/:id" element={<InfoPokemon />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
