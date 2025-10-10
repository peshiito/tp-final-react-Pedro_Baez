import React, { useState } from "react";
import "./PokeCard.css";

const PokeCard = ({ pokemon, onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite(pokemon.id, !isFavorite);
  };

  const getTypeColor = (type) => {
    const typeColors = {
      normal: "#A8A878",
      fire: "#F08030",
      water: "#6890F0",
      electric: "#F8D030",
      grass: "#78C850",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      fairy: "#EE99AC",
    };
    return typeColors[type] || "#68A090";
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="poke-card">
      <div className="card-header">
        <span className="pokemon-id">
          #{pokemon.id.toString().padStart(3, "0")}
        </span>
        <button
          className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <i className={`fas ${isFavorite ? "fa-heart" : "fa-heart"}`}></i>
        </button>
      </div>

      <div className="pokemon-image-container">
        <div className="pokemon-image">
          {!imageError ? (
            <img
              src={
                pokemon.sprites.other["official-artwork"]?.front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="image-placeholder">
              <i className="fas fa-question"></i>
            </div>
          )}
        </div>
      </div>

      <div className="pokemon-info">
        <h3 className="pokemon-name">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>

        <div className="pokemon-types">
          {pokemon.types.map((typeInfo, index) => (
            <span
              key={index}
              className="type-badge"
              style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>

        <div className="pokemon-stats">
          <div className="stat">
            <span className="stat-label">HP</span>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{
                  width: `${(pokemon.stats[0].base_stat / 255) * 100}%`,
                  backgroundColor: getTypeColor(pokemon.types[0].type.name),
                }}
              ></div>
            </div>
            <span className="stat-value">{pokemon.stats[0].base_stat}</span>
          </div>

          <div className="stat">
            <span className="stat-label">ATK</span>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{
                  width: `${(pokemon.stats[1].base_stat / 255) * 100}%`,
                  backgroundColor: getTypeColor(pokemon.types[0].type.name),
                }}
              ></div>
            </div>
            <span className="stat-value">{pokemon.stats[1].base_stat}</span>
          </div>

          <div className="stat">
            <span className="stat-label">DEF</span>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{
                  width: `${(pokemon.stats[2].base_stat / 255) * 100}%`,
                  backgroundColor: getTypeColor(pokemon.types[0].type.name),
                }}
              ></div>
            </div>
            <span className="stat-value">{pokemon.stats[2].base_stat}</span>
          </div>
        </div>

        <div className="pokemon-abilities">
          <span className="abilities-label">Habilidades:</span>
          <div className="abilities-list">
            {pokemon.abilities.slice(0, 2).map((ability, index) => (
              <span key={index} className="ability">
                {ability.ability.name.replace("-", " ")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
