import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PokeCard from "../../info_pokemon/PokeCard/PokeCard.jsx";
import "./Favoritos.css";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarFavoritos();

    const handleStorageChange = () => {
      cargarFavoritos();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const cargarFavoritos = () => {
    try {
      const favoritosGuardados =
        JSON.parse(localStorage.getItem("favoritos")) || [];
      setFavoritos(favoritosGuardados);
    } catch (error) {
      console.error("Error cargando favoritos:", error);
      setFavoritos([]);
    }
  };

  const verMasFavoritos = () => {
    navigate("/pokedex");
  };

  const eliminarFavorito = (pokemonId, e) => {
    e.stopPropagation();
    const nuevosFavoritos = favoritos.filter(
      (pokemon) => pokemon.id !== pokemonId
    );
    setFavoritos(nuevosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  const limpiarFavoritos = () => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres eliminar todos tus Pokémon favoritos?"
      )
    ) {
      localStorage.removeItem("favoritos");
      setFavoritos([]);
    }
  };

  return (
    <section className="favoritos-section">
      <div className="container">
        <div className="favoritos-header">
          <div className="favoritos-title">
            <i className="fas fa-heart heart-icon"></i>
            <h2>Mis Pokémon Favoritos</h2>
          </div>
          <p className="favoritos-subtitle">
            Los Pokémon que has elegido con el corazón. Cada uno representa una
            conexión especial en tu journey.
          </p>
        </div>

        {favoritos.length === 0 ? (
          <div className="no-favoritos">
            <div className="no-favoritos-content">
              <i className="fas fa-heart-broken"></i>
              <h3>No tienes Pokémon favoritos aún</h3>
              <p>
                ¡Haz click en el corazón de cualquier Pokémon en la Pokédex para
                agregarlo aquí!
              </p>
              <button
                className="explore-button"
                onClick={() => navigate("/pokedex")}
              >
                <i className="fas fa-compass"></i>
                Explorar Pokédex
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="favoritos-stats">
              <div className="favorito-stat">
                <span className="stat-number">{favoritos.length}</span>
                <span className="stat-label">Pokémon Favoritos</span>
              </div>
              <div className="favorito-stat">
                <span className="stat-number">
                  {
                    [
                      ...new Set(
                        favoritos.flatMap((p) =>
                          p.types.map((t) => t.type.name)
                        )
                      ),
                    ].length
                  }
                </span>
                <span className="stat-label">Tipos Diferentes</span>
              </div>
              <button
                className="clear-favorites-btn"
                onClick={limpiarFavoritos}
              >
                <i className="fas fa-trash"></i>
                Limpiar Todos
              </button>
            </div>

            <div className="favoritos-grid">
              {favoritos.slice(0, 6).map((pokemon) => (
                <div key={pokemon.id} className="favorite-card-wrapper">
                  <PokeCard pokemon={pokemon} />
                  <button
                    className="remove-favorite-btn"
                    onClick={(e) => eliminarFavorito(pokemon.id, e)}
                    title="Eliminar de favoritos"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>

            {favoritos.length > 6 && (
              <div className="favoritos-footer">
                <p>Y {favoritos.length - 6} Pokémon favorito más...</p>
                <button className="ver-mas-btn" onClick={verMasFavoritos}>
                  <i className="fas fa-arrow-right"></i>
                  Ver Todos los Favoritos
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Favoritos;
