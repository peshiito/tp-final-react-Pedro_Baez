import React, { useState, useEffect } from "react";
import "./PokemonMovimientos.css";

const PokemonMovimientos = ({ pokemonId }) => {
  const [abilities, setAbilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAbility, setSelectedAbility] = useState(null);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
        );
        const data = await response.json();

        const abilitiesData = await Promise.all(
          data.abilities.map(async (abilitySlot) => {
            const abilityResponse = await fetch(abilitySlot.ability.url);
            const abilityData = await abilityResponse.json();

            const spanishEffect = abilityData.effect_entries.find(
              (entry) => entry.language.name === "es"
            );

            const spanishFlavor = abilityData.flavor_text_entries.find(
              (entry) => entry.language.name === "es"
            );

            return {
              id: abilityData.id,
              name: abilityData.name,
              is_hidden: abilitySlot.is_hidden,
              effect: spanishEffect
                ? spanishEffect.effect
                : abilityData.effect_entries[0]?.effect ||
                  "Sin descripción disponible",
              short_effect: spanishEffect
                ? spanishEffect.short_effect
                : abilityData.effect_entries[0]?.short_effect ||
                  "Sin descripción corta",
              flavor_text: spanishFlavor
                ? spanishFlavor.flavor_text
                : abilityData.flavor_text_entries[0]?.flavor_text ||
                  "Sin descripción",
              generation: abilityData.generation.name,
            };
          })
        );

        setAbilities(abilitiesData);
      } catch (err) {
        setError("Error al cargar las habilidades");
        console.error("Error fetching abilities:", err);
      } finally {
        setLoading(false);
      }
    };

    if (pokemonId) {
      fetchAbilities();
    }
  }, [pokemonId]);

  const getAbilityTypeColor = (isHidden) => {
    return isHidden ? "#ff9ff3" : "#6c5ce7";
  };

  const getAbilityTypeText = (isHidden) => {
    return isHidden ? "Oculta" : "Normal";
  };

  const handleAbilityClick = (ability) => {
    setSelectedAbility(selectedAbility?.id === ability.id ? null : ability);
  };

  if (loading) {
    return (
      <div className="abilities-loading">
        <div className="loading-spinner"></div>
        <p>Cargando habilidades...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="abilities-error">
        <i className="fas fa-exclamation-triangle"></i>
        <p>{error}</p>
      </div>
    );
  }

  if (!abilities || abilities.length === 0) {
    return (
      <div className="no-abilities">
        <i className="fas fa-info-circle"></i>
        <p>Este Pokémon no tiene habilidades registradas</p>
      </div>
    );
  }

  return (
    <div className="pokemon-movimientos">
      <div className="abilities-header">
        <h3>Habilidades</h3>
        <div className="abilities-count">
          {abilities.length} habilidad{abilities.length !== 1 ? "es" : ""}
        </div>
      </div>

      <div className="abilities-list">
        {abilities.map((ability) => (
          <div
            key={ability.id}
            className={`ability-card ${
              selectedAbility?.id === ability.id ? "expanded" : ""
            } ${ability.is_hidden ? "hidden-ability" : "normal-ability"}`}
            onClick={() => handleAbilityClick(ability)}
          >
            <div className="ability-header">
              <div className="ability-name-type">
                <h4 className="ability-name">
                  {ability.name.replace("-", " ")}
                </h4>
                <span
                  className="ability-type"
                  style={{
                    backgroundColor: getAbilityTypeColor(ability.is_hidden),
                  }}
                >
                  {getAbilityTypeText(ability.is_hidden)}
                  {ability.is_hidden && <i className="fas fa-eye-slash"></i>}
                </span>
              </div>

              <div className="ability-toggle">
                <i
                  className={`fas fa-chevron-${
                    selectedAbility?.id === ability.id ? "up" : "down"
                  }`}
                ></i>
              </div>
            </div>

            <div className="ability-flavor">
              <p>{ability.flavor_text}</p>
            </div>

            {selectedAbility?.id === ability.id && (
              <div className="ability-details">
                <div className="ability-effect">
                  <h5>Efecto:</h5>
                  <p>{ability.effect}</p>
                </div>

                <div className="ability-meta">
                  <div className="meta-item">
                    <span className="meta-label">Generación:</span>
                    <span className="meta-value">{ability.generation}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Tipo:</span>
                    <span
                      className="meta-value type-badge"
                      style={{
                        backgroundColor: getAbilityTypeColor(ability.is_hidden),
                      }}
                    >
                      {getAbilityTypeText(ability.is_hidden)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="abilities-legend">
        <div className="legend-item">
          <div className="legend-color normal-color"></div>
          <span>Habilidad Normal</span>
        </div>
        <div className="legend-item">
          <div className="legend-color hidden-color"></div>
          <span>Habilidad Oculta</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonMovimientos;
