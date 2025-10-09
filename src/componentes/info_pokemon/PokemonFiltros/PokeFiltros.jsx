import React, { useState } from "react";
import "./PokeFiltros.css";

const PokemonFiltros = ({
  onFilterChange,
  currentFilters,
  availableTypes = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

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

  const handleTypeToggle = (type) => {
    const newTypes = currentFilters.types.includes(type)
      ? currentFilters.types.filter((t) => t !== type)
      : [...currentFilters.types, type];

    onFilterChange({ ...currentFilters, types: newTypes });
  };

  const handleSortChange = (sortBy) => {
    onFilterChange({ ...currentFilters, sortBy });
  };

  const clearFilters = () => {
    onFilterChange({ types: [], sortBy: "id" });
  };

  const hasActiveFilters =
    currentFilters.types.length > 0 || currentFilters.sortBy !== "id";

  return (
    <div className="pokemon-filtros">
      <div className="filtros-header">
        <button className="filtros-toggle" onClick={() => setIsOpen(!isOpen)}>
          <i
            className={`fas fa-filter ${hasActiveFilters ? "has-filters" : ""}`}
          ></i>
          Filtros {hasActiveFilters && `(${currentFilters.types.length})`}
          <i className={`fas fa-chevron-${isOpen ? "up" : "down"}`}></i>
        </button>

        {hasActiveFilters && (
          <button className="clear-filters" onClick={clearFilters}>
            <i className="fas fa-times"></i>
            Limpiar
          </button>
        )}
      </div>

      {isOpen && (
        <div className="filtros-content">
          <div className="filter-section">
            <h4>Ordenar por:</h4>
            <div className="sort-options">
              <button
                className={`sort-btn ${
                  currentFilters.sortBy === "id" ? "active" : ""
                }`}
                onClick={() => handleSortChange("id")}
              >
                <i className="fas fa-sort-numeric-down"></i>
                Número
              </button>
              <button
                className={`sort-btn ${
                  currentFilters.sortBy === "name" ? "active" : ""
                }`}
                onClick={() => handleSortChange("name")}
              >
                <i className="fas fa-sort-alpha-down"></i>
                Nombre
              </button>
              <button
                className={`sort-btn ${
                  currentFilters.sortBy === "type" ? "active" : ""
                }`}
                onClick={() => handleSortChange("type")}
              >
                <i className="fas fa-layer-group"></i>
                Tipo
              </button>
            </div>
          </div>

          <div className="filter-section">
            <h4>Filtrar por tipo:</h4>
            <div className="type-filters">
              {Object.entries(typeColors).map(([type, color]) => (
                <button
                  key={type}
                  className={`type-filter-btn ${
                    currentFilters.types.includes(type) ? "active" : ""
                  }`}
                  onClick={() => handleTypeToggle(type)}
                  style={{
                    backgroundColor: currentFilters.types.includes(type)
                      ? color
                      : "transparent",
                    borderColor: color,
                    color: currentFilters.types.includes(type)
                      ? "white"
                      : color,
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonFiltros;
