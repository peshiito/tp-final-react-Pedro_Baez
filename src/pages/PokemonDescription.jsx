import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../componentes/common/Header/Header.jsx";
import MewComentarioAsider from "../componentes/Pokemon_Descript/MewComentarioAsider/MewComentarioAsider.jsx";
import PokemonEvolutions from "../componentes/Pokemon_Descript/PokemonEvolutions/PokemonEvolution.jsx";
import PokemonMovimientos from "../componentes/Pokemon_Descript/PokemonMovimientos/PokemonMovimientos.jsx";
import PokemonStats from "../componentes/Pokemon_Descript/PokemonStats/PokemonStats.jsx";
import AudioPlayer from "../componentes/Pokemon_Descript/PokemonAudio/PokemonAudio.jsx";
import "./PokemonDescription.css";

const PokemonDescription = () => {
  const { pokemonId } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (pokemonId) {
      fetchPokemonData();
    }
  }, [pokemonId]);

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

  if (loading) {
    return (
      <div className="pokemon-description">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p>Cargando información del Pokémon...</p>
        </div>
      </div>
    );
  }

  if (!pokemonData) {
    return (
      <div className="pokemon-description">
        <Header />
        <div className="error-container">
          <i className="fas fa-exclamation-triangle"></i>
          <p>Error al cargar el Pokémon</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-description">
      <Header />

      <div className="pokemon-description-container">
        <main className="pokemon-main-content">
          <section className="pokemon-hero">
            <div className="pokemon-visual">
              <div className="pokemon-image-large">
                <img
                  src={
                    pokemonData.sprites.other["official-artwork"]
                      ?.front_default || pokemonData.sprites.front_default
                  }
                  alt={pokemonData.name}
                  className="main-pokemon-img"
                />
              </div>
              <div className="pokemon-basic-info">
                <div className="pokemon-header">
                  <span className="pokemon-id-large">
                    #{pokemonData.id.toString().padStart(3, "0")}
                  </span>
                  <h1 className="pokemon-title">
                    {pokemonData.name.charAt(0).toUpperCase() +
                      pokemonData.name.slice(1)}
                  </h1>
                </div>

                <div className="pokemon-types">
                  {pokemonData.types.map((typeInfo, index) => (
                    <span
                      key={index}
                      className="type-badge-large"
                      style={{
                        backgroundColor: getTypeColor(typeInfo.type.name),
                      }}
                    >
                      {typeInfo.type.name.toUpperCase()}
                    </span>
                  ))}
                </div>

                <div className="pokemon-physical">
                  <div className="physical-item">
                    <i className="fas fa-ruler-vertical"></i>
                    <span>Altura: {(pokemonData.height / 10).toFixed(1)}m</span>
                  </div>
                  <div className="physical-item">
                    <i className="fas fa-weight"></i>
                    <span>Peso: {(pokemonData.weight / 10).toFixed(1)}kg</span>
                  </div>
                  <div className="physical-item">
                    <i className="fas fa-star"></i>
                    <span>Exp Base: {pokemonData.base_experience}</span>
                  </div>
                </div>

                <AudioPlayer pokemonId={pokemonId} />
              </div>
            </div>
          </section>

          <div className="pokemon-details-grid">
            <PokemonStats pokemonId={pokemonId} />
            <PokemonMovimientos pokemonId={pokemonId} />
          </div>

          <section className="evolution-section">
            <h2 className="section-title">Línea Evolutiva</h2>
            <PokemonEvolutions pokemonId={pokemonId} />
          </section>
        </main>

        <aside className="pokemon-aside">
          <MewComentarioAsider pokemonId={pokemonId} />
        </aside>
      </div>
    </div>
  );
};

export default PokemonDescription;
