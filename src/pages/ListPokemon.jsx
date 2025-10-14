import React, { useState, useMemo } from "react";
import Header from "../componentes/common/Header/Header.jsx";
import Footer from "../componentes/common/Footer/Footer.jsx";
import RegionSelector from "../componentes/info_pokemon/regionSelector/RegionSelector.jsx";
import SearchBar from "../componentes/info_pokemon/SearchBar/SearchBar.jsx";
import PokemonGrid from "../componentes/info_pokemon/PokemonGrid/PokeGrid.jsx";
import LoadMore from "../componentes/info_pokemon/LoadMore/LoadMore.jsx";
import PokemonFiltros from "../componentes/info_pokemon/PokemonFiltros/PokeFiltros.jsx";
import MewtwoSidebar from "../componentes/info_pokemon/MewtwoSide_Bar/MewtwoSide_Bar.jsx";
import usePokemonData from "../hooks/usePokemonData.js";
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
    if (filters.types.length > 0) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((typeInfo) =>
          filters.types.includes(typeInfo.type.name)
        )
      );
    }
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

  const displayedPokemons = useMemo(() => {
    return filteredAndSortedPokemons.slice(0, displayCount);
  }, [filteredAndSortedPokemons, displayCount]);

  // ✅ CORREGIDO: Función que SI funciona
  const handleLoadMore = (amount = 50) => {
    const regionData = regions[currentRegion];
    const totalPokemonInRegion = regionData.end - regionData.start + 1;

    // Calcular nuevo count
    const newCount = Math.min(displayCount + amount, totalPokemonInRegion);

    console.log(
      `Cargando más Pokémon: ${displayCount} -> ${newCount} (total: ${totalPokemonInRegion})`
    );

    // Actualizar el contador de visualización
    setDisplayCount(newCount);

    // Si necesitamos cargar más datos de la API
    if (newCount > pokemons.length) {
      console.log(`Necesitamos cargar de la API: ${newCount} Pokémon`);
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
  const totalPokemonInRegion =
    currentRegionData.end - currentRegionData.start + 1;

  // ✅ CORREGIDO: Cálculo correcto de hasMore
  const hasMore = displayCount < totalPokemonInRegion;

  const remainingPokemon = totalPokemonInRegion - displayCount;
  const nextLoadAmount = Math.min(50, remainingPokemon);

  return (
    <div className="list-pokemon-page">
      <Header />

      <div className="container">
        <div className="pokedex-layout">
          {/* Contenido principal */}
          <div className="pokedex-main">
            {/* Encabezado */}
            <div className="mewtwo-header">
              <div className="mewtwo-message-main">
                <i className="fas fa-dna mewtwo-icon"></i>
                <div>
                  <h1>Pokédex - Análisis Pokémon</h1>
                  <p>
                    "Como el Pokémon creado por la ciencia, poseo un
                    entendimiento único de la esencia de cada criatura. Explora
                    esta Pokédex con mi perspectiva."
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

              <SearchBar
                onSearch={handleSearch}
                currentRegion={currentRegion}
              />

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
                  <span className="stat-number">
                    {displayedPokemons.length}
                  </span>
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
              <div className="stat-card">
                <i className="fas fa-sync"></i>
                <div>
                  <span className="stat-number">{remainingPokemon}</span>
                  <span className="stat-label">Pokémon restantes</span>
                </div>
              </div>
            </div>

            {/* Grid de Pokémon */}
            <PokemonGrid
              pokemons={displayedPokemons}
              onToggleFavorite={handleToggleFavorite}
              loading={loading}
            />

            {/* ✅ BOTÓN LOAD MORE FUNCIONAL */}
            {!searchTerm && hasMore && (
              <div className="manual-load-section">
                <button
                  className="load-more-manual-btn"
                  onClick={() => handleLoadMore(50)}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner-small"></div>
                      Cargando {nextLoadAmount} Pokémon...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-chevron-down"></i>
                      Cargar {nextLoadAmount} Pokémon más de {currentRegion}
                    </>
                  )}
                </button>
                <div className="load-info">
                  <span>
                    Mostrando {displayedPokemons.length} de{" "}
                    {totalPokemonInRegion} Pokémon
                  </span>
                  <div className="progress-bar-mini">
                    <div
                      className="progress-fill-mini"
                      style={{
                        width: `${
                          (displayedPokemons.length / totalPokemonInRegion) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="remaining-info">
                    {remainingPokemon} Pokémon restantes en {currentRegion}
                  </span>
                </div>
              </div>
            )}

            {/* Mensaje cuando se completan todos */}
            {!searchTerm && !hasMore && displayedPokemons.length > 0 && (
              <div className="completion-message">
                <i className="fas fa-check-circle"></i>
                <h3>¡Has visto todos los Pokémon de {currentRegion}!</h3>
                <p>Total: {displayedPokemons.length} Pokémon cargados</p>
              </div>
            )}

            {/* Mensaje de búsqueda */}
            {searchTerm && (
              <div className="search-results-info">
                <p>
                  Resultados para: <strong>"{searchTerm}"</strong>
                  {displayedPokemons.length === 0 &&
                    " - No se encontraron Pokémon"}
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

          {/* Sidebar de Mewtwo */}
          <MewtwoSidebar currentRegion={currentRegion} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListPokemon;
