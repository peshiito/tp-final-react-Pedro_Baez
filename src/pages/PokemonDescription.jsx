import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../componentes/common/Header/Header.jsx";
import MewComentarioAsider from "../componentes/Pokemon_Descript/MewComentarioAsider/MewComentarioAsider.jsx";
import PokemonEvolutions from "../componentes/Pokemon_Descript/PokemonEvolutions/PokemonEvolution.jsx";
import PokemonMovimientos from "../componentes/Pokemon_Descript/PokemonMovimientos/PokemonMovimientos.jsx";
import PokemonStats from "../componentes/Pokemon_Descript/PokemonStats/PokemonStats.jsx";
import AudioPlayer from "../componentes/Pokemon_Descript/PokemonAudio/PokemonAudio.jsx";
import SearchBar from "../componentes/info_pokemon/SearchBar/SearchBar.jsx";
import "./PokemonDescription.css";

const PokemonDescription = () => {
  const { pokemonId } = useParams();
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (pokemonId) {
      fetchPokemonData(pokemonId);
      setSearchInput("");
    } else {
      setPokemonData(null);
    }
  }, [pokemonId]);

  const fetchPokemonData = async (idOrName) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${idOrName.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Pokémon no encontrado");
      }

      const data = await response.json();
      setPokemonData(data);

      if (!pokemonId) {
        navigate(`/pokemon/${data.id}`, { replace: true });
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setPokemonData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      fetchPokemonData(searchTerm.trim());
    }
  };

  const handleClearSearch = () => {
    setPokemonData(null);
    setSearchInput("");
    navigate("/descripciones", { replace: true });
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

  if (!pokemonId && !pokemonData) {
    return (
      <div className="pokemon-description">
        <Header />

        <div className="pokemon-description-container">
          <main className="pokemon-main-content">
            {/* Sección de búsqueda cuando no hay Pokémon */}
            <section className="no-pokemon-section">
              <div className="search-container-large">
                <h2>Buscar Pokémon</h2>
                <p>
                  Ingresa el nombre o ID de un Pokémon para ver su información
                  detallada
                </p>

                <div className="search-bar-container">
                  <SearchBar
                    onSearch={handleSearch}
                    currentRegion="all"
                    placeholder="Ej: pikachu, 25, charizard..."
                  />
                </div>

                <div className="search-examples">
                  <h4>Ejemplos populares:</h4>
                  <div className="example-buttons">
                    {[1, 4, 7, 25, 150, 151].map((id) => (
                      <button
                        key={id}
                        className="example-btn"
                        onClick={() => fetchPokemonData(id.toString())}
                      >
                        #{id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <div className="pokemon-details-grid">
              <div className="placeholder-section">
                <h3>Estadísticas</h3>
                <div className="placeholder-content">
                  <i className="fas fa-chart-bar"></i>
                  <p>
                    Las estadísticas aparecerán aquí cuando busques un Pokémon
                  </p>
                </div>
              </div>

              <div className="placeholder-section">
                <h3>Habilidades</h3>
                <div className="placeholder-content">
                  <i className="fas fa-fire"></i>
                  <p>
                    Las habilidades aparecerán aquí cuando busques un Pokémon
                  </p>
                </div>
              </div>
            </div>

            <section className="evolution-section">
              <h2 className="section-title">Línea Evolutiva</h2>
              <div className="placeholder-content">
                <i className="fas fa-code-branch"></i>
                <p>
                  La línea evolutiva aparecerá aquí cuando busques un Pokémon
                </p>
              </div>
            </section>
          </main>

          <aside className="pokemon-aside">
            <div className="mew-placeholder">
              <h3>Análisis de Mew</h3>
              <div className="placeholder-content">
                <i className="fas fa-dna"></i>
                <p>Mew espera pacientemente para analizar un Pokémon...</p>
                <small>
                  "Mew mew mew (¡Busca un Pokémon para comenzar el análisis!)"
                </small>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pokemon-description">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p>Buscando información del Pokémon...</p>
        </div>
      </div>
    );
  }

  if (!pokemonData) {
    return (
      <div className="pokemon-description">
        <Header />

        <div className="pokemon-description-container">
          <main className="pokemon-main-content">
            <section className="error-section">
              <div className="error-content">
                <i className="fas fa-exclamation-triangle"></i>
                <h2>Pokémon no encontrado</h2>
                <p>
                  No se pudo encontrar el Pokémon "{pokemonId}". Verifica el
                  nombre o ID e intenta nuevamente.
                </p>

                <div className="search-bar-container">
                  <SearchBar
                    onSearch={handleSearch}
                    currentRegion="all"
                    placeholder="Buscar otro Pokémon..."
                  />
                </div>

                <button
                  className="clear-search-btn"
                  onClick={handleClearSearch}
                >
                  <i className="fas fa-arrow-left"></i>
                  Volver al buscador
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-description">
      <Header />

      <div className="pokemon-description-container">
        <main className="pokemon-main-content">
          <section className="search-section">
            <div className="search-bar-compact">
              <SearchBar
                onSearch={handleSearch}
                currentRegion="all"
                placeholder="Buscar otro Pokémon..."
                compact={true}
              />
            </div>
          </section>

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
                  <button
                    className="clear-current-btn"
                    onClick={handleClearSearch}
                    title="Buscar otro Pokémon"
                  >
                    <i className="fas fa-times"></i>
                  </button>
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

                <AudioPlayer pokemonId={pokemonData.id} />
              </div>
            </div>
          </section>

          <div className="pokemon-details-grid">
            <PokemonStats pokemonId={pokemonData.id} />
            <PokemonMovimientos pokemonId={pokemonData.id} />
          </div>

          <section className="evolution-section">
            <h2 className="section-title">Línea Evolutiva</h2>
            <PokemonEvolutions pokemonId={pokemonData.id} />
          </section>
        </main>

        <aside className="pokemon-aside">
          <MewComentarioAsider pokemonId={pokemonData.id} />
        </aside>
      </div>
    </div>
  );
};

export default PokemonDescription;
