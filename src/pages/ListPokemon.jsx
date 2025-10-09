import React, { useState, useMemo } from "react";
import Header from "../componentes/common/Header/Header.jsx";
import Footer from "../componentes/common/Footer/Footer.jsx";
import RegionSelector from "../components/info_pokemon/regionSelector/RegionSelector";
import SearchBar from "../components/info_pokemon/SearchBar/SearchBar";
import PokemonGrid from "../components/info_pokemon/PokemonGrid/PokemonGrid";
import LoadMore from "../components/info_pokemon/LoadMore/LoadMore";
import PokemonFiltros from "../components/info_pokemon/PokemonFiltros/PokemonFiltros";
import usePokemonData from "../hooks/usePokemonData";
import "./ListPokemon.css";

const ListPokemon = () => {
  const [displayCount, setDisplayCount] = useState(50);
  const [favorites, setFavorites] = useState(new Set());

  const {
    pokemons,
    loading,
    currentRegion,
    searchTerm,
    filters,
    regions,
    setSearchTerm,
    setFilters,
    changeRegion,
    loadPokemons,
    searchPokemon,
  } = usePokemonData();

  // Filtrar y ordenar Pokémon
  const filteredAndSortedPokemons = useMemo(() => {
    let filtered = [...pokemons];

    // Aplicar filtros de tipo
    if (filters.types.length > 0) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((typeInfo) =>
          filters.types.includes(typeInfo.type.name)
        )
      );
    }

    // Aplicar ordenamiento
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "type":
          return a.types[0].type.name.localeCompare(b.types[0].type.name);
        case "id":
        default:
          return a.id - b.id;
      }
    });

    return filtered;
  }, [pokemons, filters]);

  // Pokémon para mostrar (con límite)
  const displayedPokemons = useMemo(() => {
    return filteredAndSortedPokemons.slice(0, displayCount);
  }, [filteredAndSortedPokemons, displayCount]);

  const handleLoadMore = () => {
    const regionData = regions[currentRegion];
    const newCount = Math.min(
      displayCount + 50,
      regionData.end - regionData.start + 1
    );
    setDisplayCount(newCount);

    // Si necesitamos cargar más datos
    if (newCount > pokemons.length) {
      loadPokemons(currentRegion, newCount);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      searchPokemon(term);
      setDisplayCount(50);
    } else {
      loadPokemons(currentRegion);
      setDisplayCount(50);
    }
  };

  const handleRegionChange = (region) => {
    changeRegion(region);
    setDisplayCount(50);
    setFilters({ types: [], sortBy: "id" });
  };

  const handleToggleFavorite = (pokemonId, isFavorite) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (isFavorite) {
        newFavorites.add(pokemonId);
      } else {
        newFavorites.delete(pokemonId);
      }
      return newFavorites;
    });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setDisplayCount(50);
  };

  const currentRegionData = regions[currentRegion];
  const hasMore =
    displayCount < filteredAndSortedPokemons.length &&
    displayCount < currentRegionData.end - currentRegionData.start + 1;

  return (
    <div className="list-pokemon-page">
      <Header />

      <div className="container">
        {/* Encabezado con mensaje de Mewtwo */}
        <div className="mewtwo-header">
          <div className="mewtwo-message-main">
            <i className="fas fa-dna mewtwo-icon"></i>
            <div>
              <h1>Pokédex - Análisis Pokémon</h1>
              <p>
                "Como el Pokémon creado por la ciencia, poseo un entendimiento
                único de la esencia de cada criatura. Explora esta Pokédex con
                mi perspectiva."
              </p>
              <small>- Mewtwo</small>
            </div>
          </div>
        </div>

        {/* Controles principales */}
        <div className="pokedex-controls">
          <RegionSelector
            currentRegion={currentRegion}
            onRegionChange={handleRegionChange}
          />

          <SearchBar onSearch={handleSearch} currentRegion={currentRegion} />

          <PokemonFiltros
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />
        </div>

        {/* Estadísticas */}
        <div className="pokedex-stats">
          <div className="stat-card">
            <i className="fas fa-list"></i>
            <div>
              <span className="stat-number">{displayedPokemons.length}</span>
              <span className="stat-label">Pokémon mostrados</span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-filter"></i>
            <div>
              <span className="stat-number">
                {filteredAndSortedPokemons.length}
              </span>
              <span className="stat-label">Coinciden con filtros</span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-heart"></i>
            <div>
              <span className="stat-number">{favorites.size}</span>
              <span className="stat-label">Favoritos</span>
            </div>
          </div>
        </div>

        {/* Grid de Pokémon */}
        <PokemonGrid
          pokemons={displayedPokemons}
          onToggleFavorite={handleToggleFavorite}
          loading={loading}
        />

        {/* Botón Load More */}
        {!searchTerm && (
          <LoadMore
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            loading={loading}
            currentCount={displayedPokemons.length}
            totalCount={currentRegionData.end - currentRegionData.start + 1}
            region={currentRegion}
          />
        )}

        {/* Mensaje de búsqueda */}
        {searchTerm && (
          <div className="search-results-info">
            <p>
              Resultados para: <strong>"{searchTerm}"</strong>
              {displayedPokemons.length === 0 && " - No se encontraron Pokémon"}
            </p>
            <button
              className="clear-search-btn"
              onClick={() => handleSearch("")}
            >
              <i className="fas fa-times"></i>
              Limpiar búsqueda
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ListPokemon;
