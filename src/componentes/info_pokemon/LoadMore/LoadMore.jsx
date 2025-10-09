import React from "react";
import "./LoadMore.css";

const LoadMore = ({
  onLoadMore,
  hasMore,
  loading,
  currentCount,
  totalCount,
  region,
}) => {
  if (!hasMore) {
    return (
      <div className="load-more-complete">
        <i className="fas fa-check-circle complete-icon"></i>
        <p>¡Has visto todos los Pokémon de {region}!</p>
        <small>
          {currentCount} de {totalCount} Pokémon cargados
        </small>
      </div>
    );
  }

  return (
    <div className="load-more">
      <button onClick={onLoadMore} disabled={loading} className="load-more-btn">
        {loading ? (
          <>
            <div className="button-spinner"></div>
            Cargando...
          </>
        ) : (
          <>
            <i className="fas fa-chevron-down"></i>
            Cargar más Pokémon
            <span className="load-count">
              ({currentCount} de {totalCount})
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default LoadMore;
