import React, { useState, useEffect } from "react";
import "./MewCometarioAsider.css";

const MewComentarioAsider = ({ pokemonId }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [mewComment, setMewComment] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const [pokemonResponse, speciesResponse] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`),
        ]);

        const pokemonData = await pokemonResponse.json();
        const speciesData = await speciesResponse.json();

        setPokemonData(pokemonData);
        setSpeciesData(speciesData);
        generateMewComment(pokemonData, speciesData);

        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        setIsFavorite(favoritos.some((fav) => fav.id === pokemonData.id));
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    if (pokemonId) {
      fetchPokemonData();
    }
  }, [pokemonId]);

  const generateMewSpeech = () => {
    const mewWords = [
      "Mew",
      "Mewmew",
      "Mewww",
      "Meeeew",
      "Mewmewmew",
      "Mew!",
      "Mew?",
      "Mew...",
    ];
    const sentenceLength = Math.floor(Math.random() * 3) + 2;
    let speech = "";

    for (let i = 0; i < sentenceLength; i++) {
      speech += mewWords[Math.floor(Math.random() * mewWords.length)];
      if (i < sentenceLength - 1) speech += " ";
    }

    return speech;
  };

  const generateMewComment = (pokemon, species) => {
    const spanishFlavor = species.flavor_text_entries?.find(
      (entry) => entry.language.name === "es"
    );

    const cleanDescription = spanishFlavor
      ? spanishFlavor.flavor_text.replace(/\n/g, " ").replace(/\f/g, " ")
      : `Un Pokémon ${pokemon.types
          .map((t) => t.type.name)
          .join(" y ")} con características únicas.`;

    const mewSpeech = generateMewSpeech();
    const fullComment = `MEW: ${mewSpeech} (${cleanDescription})`;

    setMewComment(fullComment);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!pokemonData) return;

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    let actualizados;
    if (isFavorite) {
      actualizados = favoritos.filter((f) => f.id !== pokemonData.id);
    } else {
      actualizados = [...favoritos, pokemonData];
    }

    localStorage.setItem("favoritos", JSON.stringify(actualizados));
    setIsFavorite(!isFavorite);
  };

  const getStatAverage = () => {
    if (!pokemonData) return 0;
    const total = pokemonData.stats.reduce(
      (sum, stat) => sum + stat.base_stat,
      0
    );
    return Math.round(total / pokemonData.stats.length);
  };

  if (!pokemonData) {
    return (
      <div className="sidebar-mew">
        <div className="mew-sidebar-card">
          <div className="mew-loading">
            <div className="mew-loading-spinner"></div>
            <p>Mew está analizando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar-mew">
      <div className="mew-sidebar-card">
        <div className="mew-header">
          <div className="mew-visual">
            <div className="mew-image-container">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png"
                alt="Mew"
                className="mew-img"
              />
            </div>
            <div className="mew-title-content">
              <div className="mew-title">
                <i className="fas fa-dna mew-icon"></i>
                <h3>Análisis de Mew</h3>
              </div>
              <div className="mew-subtitle">Perspectiva Genética</div>
            </div>
          </div>
        </div>

        <div className="mew-comment-section">
          <div className="comment-bubble">
            <div className="mew-speech">
              <p>{mewComment}</p>
            </div>
          </div>
        </div>

        <div className="pokemon-analysis-grid">
          <div className="analysis-section">
            <h4>Características Físicas</h4>
            <div className="analysis-data">
              <div className="data-row">
                <span className="data-label">Altura</span>
                <span className="data-value">
                  {(pokemonData.height / 10).toFixed(1)} m
                </span>
              </div>
              <div className="data-row">
                <span className="data-label">Peso</span>
                <span className="data-value">
                  {(pokemonData.weight / 10).toFixed(1)} kg
                </span>
              </div>
              <div className="data-row">
                <span className="data-label">Experiencia Base</span>
                <span className="data-value">
                  {pokemonData.base_experience}
                </span>
              </div>
              <div className="data-row">
                <span className="data-label">Favorito</span>
                <button
                  className={`favorite-btn-mini ${
                    isFavorite ? "favorited" : ""
                  }`}
                  onClick={handleFavoriteClick}
                  title={
                    isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
                  }
                >
                  <i
                    className={`fas fa-heart ${
                      isFavorite ? "solid" : "regular"
                    }`}
                  ></i>
                  {isFavorite ? "Sí" : "No"}
                </button>
              </div>
            </div>
          </div>

          <div className="analysis-section">
            <h4>Estadísticas Promedio</h4>
            <div className="stats-overview">
              <div className="stat-circle">
                <div className="circle-value">{getStatAverage()}</div>
                <div className="circle-label">Promedio</div>
              </div>
              <div className="stats-breakdown">
                <div className="stat-mini">
                  <span>PS: {pokemonData.stats[0].base_stat}</span>
                </div>
                <div className="stat-mini">
                  <span>ATQ: {pokemonData.stats[1].base_stat}</span>
                </div>
                <div className="stat-mini">
                  <span>DEF: {pokemonData.stats[2].base_stat}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="analysis-section">
            <h4>Configuración de Batalla</h4>
            <div className="battle-info">
              <div className="ability-list">
                <strong>Habilidades:</strong>
                {pokemonData.abilities.slice(0, 2).map((ability, index) => (
                  <span key={index} className="ability-tag">
                    {ability.ability.name.replace("-", " ")}
                    {ability.is_hidden && " (Oculta)"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mew-footer">
          <div className="generation-info">
            <i className="fas fa-code-branch"></i>
            <span>
              Generación{" "}
              {speciesData?.generation?.name.split("-")[1]?.toUpperCase() ||
                "I"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MewComentarioAsider;
