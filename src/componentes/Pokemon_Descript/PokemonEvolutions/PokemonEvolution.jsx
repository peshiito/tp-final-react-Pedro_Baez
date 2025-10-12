import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PokemonEvolution.css";

const PokemonEvolutions = ({ pokemonId }) => {
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        setLoading(true);
        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`
        );
        const speciesData = await speciesResponse.json();

        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();

        const chain = processEvolutionChain(evolutionData.chain);
        setEvolutionChain(chain);
      } catch (err) {
        console.error("Error fetching evolution chain:", err);
      } finally {
        setLoading(false);
      }
    };

    if (pokemonId) {
      fetchEvolutionChain();
    }
  }, [pokemonId]);

  const processEvolutionChain = (chain) => {
    const evolutionChain = [];

    const traverseChain = (node) => {
      const pokemonId = node.species.url.split("/").filter(Boolean).pop();

      evolutionChain.push({
        id: parseInt(pokemonId),
        name: node.species.name,
        details: node.evolution_details[0] || null,
      });

      node.evolves_to.forEach((evolution) => {
        traverseChain(evolution);
      });
    };

    traverseChain(chain);
    return evolutionChain;
  };

  const getEvolutionDetails = (details) => {
    if (!details) return "Forma Base";

    const triggers = [];
    if (details.min_level) triggers.push(`Nv. ${details.min_level}`);
    if (details.item) triggers.push(details.item.name);
    if (details.trigger?.name === "trade") triggers.push("Intercambio");
    if (details.time_of_day) triggers.push(details.time_of_day);
    if (details.min_happiness) triggers.push("Felicidad");

    return triggers.length > 0 ? triggers.join(" + ") : "Evolución";
  };

  if (loading) {
    return (
      <div className="evolutions-loading">
        <div className="loading-spinner"></div>
        <p>Buscando evoluciones...</p>
      </div>
    );
  }

  if (!evolutionChain || evolutionChain.length <= 1) {
    return (
      <div className="no-evolutions">
        <i className="fas fa-info-circle"></i>
        <p>No se encontraron evoluciones</p>
      </div>
    );
  }

  return (
    <div className="pokemon-evolutions">
      <div className="evolution-chain-container">
        {evolutionChain.map((pokemon, index) => (
          <div key={pokemon.id} className="evolution-item">
            {index > 0 && (
              <div className="evolution-arrow">
                <i className="fas fa-arrow-right"></i>
                <span className="evolution-condition">
                  {getEvolutionDetails(pokemon.details)}
                </span>
              </div>
            )}

            <Link
              to={`/pokemon/${pokemon.id}`}
              className={`evolution-pokemon ${
                pokemon.id === parseInt(pokemonId) ? "current" : ""
              }`}
            >
              <div className="evolution-sprite">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  className="pixel-sprite"
                />
              </div>
              <div className="evolution-info">
                <span className="evolution-id">
                  #{pokemon.id.toString().padStart(3, "0")}
                </span>
                <span className="evolution-name">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </span>
                {pokemon.id === parseInt(pokemonId) && (
                  <div className="current-badge">
                    <i className="fas fa-star"></i>
                    Actual
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonEvolutions;
