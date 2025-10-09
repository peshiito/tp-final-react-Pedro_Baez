import React from "react";
import PokeCard from "../PokeCard/PokeCard";
import "./PokeGrid.css";

const PokemonGrid = ({ pokemons, onToggleFavorite, loading }) => {
  if (loading) {
    return (
      <div className="pokemon-grid-loading">
        <div className="loading-spinner"></div>
        <p>Mewtwo está analizando los Pokémon...</p>
      </div>
    );
  }

  if (!pokemons || pokemons.length === 0) {
    return (
      <div className="pokemon-grid-empty">
        <i className="fas fa-search empty-icon"></i>
        <h3>No se encontraron Pokémon</h3>
        <p>Intenta con otra búsqueda o cambia de región</p>
      </div>
    );
  }

  return (
    <div className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokeCard
          key={pokemon.id}
          pokemon={pokemon}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default PokemonGrid;
