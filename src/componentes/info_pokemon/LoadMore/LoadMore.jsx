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
  const remaining = totalCount - currentCount;
  const loadAmount = Math.min(50, remaining);

  const handleLoadMoreClick = () => {
    if (hasMore && !loading) {
      onLoadMore(loadAmount);
    }
  };

  return (
    <div className="load-more-section">
      {hasMore ? (
        <>
          <button
            onClick={handleLoadMoreClick}
            disabled={loading}
            className="load-more-action-btn"
          >
            {loading ? (
              <>
                <div className="load-spinner"></div>
                Cargando {loadAmount} Pokémon...
              </>
            ) : (
              <>
                <i className="fas fa-chevron-down"></i>
                Cargar {loadAmount} Pokémon más
              </>
            )}
          </button>

          <div className="load-progress">
            <span className="progress-text">
              {currentCount} de {totalCount} Pokémon cargados
            </span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(currentCount / totalCount) * 100}%` }}
              ></div>
            </div>
            <span className="remaining-text">
              {remaining} Pokémon restantes en {region}
            </span>
          </div>
        </>
      ) : (
        <div className="load-complete">
          <i className="fas fa-check-circle complete-icon"></i>
          <div className="complete-message">
            <h4>¡Pokédex Completa!</h4>
            <p>
              Has cargado todos los {totalCount} Pokémon de {region}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadMore;
