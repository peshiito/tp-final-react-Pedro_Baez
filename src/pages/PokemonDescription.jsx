import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../componentes/common/Header/Header.jsx";
import Footer from "../componentes/common/Footer/Footer.jsx";
import PokemonHeader from "../componentes/pokemon_descript/PokemonHeader/PokemonHeader.jsx";
import PokemonStats from "../componentes/pokemon_descript/PokemonStats/PokemonStats.jsx";
import PokemonEvolutions from "../componentes/pokemon_descript/PokemonEvolutions/PokemonEvolutions.jsx";
import PokemonMoves from "../componentes/pokemon_descript/PokemonMoves/PokemonMoves.jsx";
import MewComments from "../componentes/pokemon_descript/MewComments/MewComments.jsx";
import "./Pokemon_Descript.css";

const Pokemon_Descript = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        setError(null);

        const pokemonResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        if (!pokemonResponse.ok) throw new Error("Pokémon no encontrado");
        const pokemonData = await pokemonResponse.json();

        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();

        setPokemon(pokemonData);
        setSpecies(speciesData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching Pokémon:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPokemonData();
    }
  }, [id]);

  const handlePreviousPokemon = () => {
    const previousId = Math.max(1, parseInt(id) - 1);
    navigate(`/pokemon/${previousId}`);
  };

  const handleNextPokemon = () => {
    const nextId = parseInt(id) + 1;
    navigate(`/pokemon/${nextId}`);
  };

  if (loading) {
    return (
      <div className="pokemon-descript-page">
        <Header /> {/* MISMO HEADER */}
        <div className="container">
          <div className="loading-container">
            <div className="mew-loading">
              <i className="fas fa-dna"></i>
              <p>Mew está analizando el Pokémon...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="pokemon-descript-page">
        <Header /> {/* MISMO HEADER */}
        <div className="container">
          <div className="error-container">
            <i className="fas fa-exclamation-triangle"></i>
            <h2>Pokémon no encontrado</h2>
            <p>{error || "El Pokémon solicitado no existe."}</p>
            <Link to="/pokedex" className="btn btn-primary">
              Volver a la Pokédex
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pokemon-descript-page">
      <Header />
      <div className="container">
        <div className="pokemon-descript-layout">
          {/* Contenido principal */}
          <div className="pokemon-main-content">
            {/* Navegación */}
            <div className="pokemon-navigation">
              <button
                onClick={handlePreviousPokemon}
                className="nav-btn prev-btn"
                disabled={parseInt(id) <= 1}
              >
                <i className="fas fa-chevron-left"></i>#
                {String(parseInt(id) - 1).padStart(3, "0")}
              </button>

              <Link to="/pokedex" className="pokedex-link">
                <i className="fas fa-th-list"></i>
                Volver a Pokédex
              </Link>

              <button onClick={handleNextPokemon} className="nav-btn next-btn">
                #{String(parseInt(id) + 1).padStart(3, "0")}
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            <PokemonHeader pokemon={pokemon} species={species} />

            <PokemonStats pokemon={pokemon} species={species} />

            <PokemonEvolutions species={species} />

            <PokemonMoves pokemon={pokemon} />
          </div>

          <MewComments pokemon={pokemon} species={species} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pokemon_Descript;
