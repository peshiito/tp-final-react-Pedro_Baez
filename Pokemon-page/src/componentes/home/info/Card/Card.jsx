import React from "react";
import "./Card.css";

const PokemonCard = ({ pokemon }) => {
  const { name, number, type, height, weight, description, image } = pokemon;

  return (
    <div className="pokemon-card">
      <div className="card-header">
        <span className="pokemon-number">#{number}</span>
        <h2 className="pokemon-name">{name}</h2>
      </div>

      <div className="pokemon-image-container">
        <img src={image} alt={name} className="pokemon-image" />
      </div>

      <div className="pokemon-type">
        <span className={`type-badge type-${type.toLowerCase()}`}>{type}</span>
      </div>

      <div className="pokemon-stats">
        <div className="stat">
          <span className="stat-label">Altura</span>
          <span className="stat-value">{height}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Peso</span>
          <span className="stat-value">{weight}</span>
        </div>
      </div>

      <p className="pokemon-description">{description}</p>

      <div className="gender-info">
        <span className="gender">♂ Male</span>
      </div>
    </div>
  );
};

export default PokemonCard;
