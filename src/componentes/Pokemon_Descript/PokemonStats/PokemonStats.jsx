import React, { useState, useEffect } from "react";
import "./PokemonStats.css";

const PokemonStats = ({ pokemonId }) => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalStats, setTotalStats] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
        );
        const data = await response.json();

        const processedStats = data.stats.map((stat) => ({
          id: stat.stat.name,
          name: getStatSpanishName(stat.stat.name),
          base_stat: stat.base_stat,
          effort: stat.effort,
          max_stat: getMaxStat(stat.stat.name, stat.base_stat),
        }));

        setStats(processedStats);

        const total = processedStats.reduce(
          (sum, stat) => sum + stat.base_stat,
          0
        );
        setTotalStats(total);
      } catch (err) {
        setError("Error al cargar las estadísticas");
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (pokemonId) {
      fetchStats();
    }
  }, [pokemonId]);

  const getStatSpanishName = (statName) => {
    const statNames = {
      hp: "PS",
      attack: "Ataque",
      defense: "Defensa",
      "special-attack": "Ataque Especial",
      "special-defense": "Defensa Especial",
      speed: "Velocidad",
    };
    return statNames[statName] || statName;
  };

  const getMaxStat = (statName, baseStat) => {
    const maxStats = {
      hp: 255,
      attack: 190,
      defense: 230,
      "special-attack": 194,
      "special-defense": 230,
      speed: 180,
    };
    return maxStats[statName] || 255;
  };

  const getStatPercentage = (baseStat, maxStat) => {
    return (baseStat / maxStat) * 100;
  };

  const getStatColor = (percentage) => {
    if (percentage >= 80) return "#4cd964";
    if (percentage >= 60) return "#5ac8fa";
    if (percentage >= 40) return "#ffcc00";
    if (percentage >= 20) return "#ff9500";
    return "#ff3b30";
  };

  const getStatEmoji = (statName, percentage) => {
    if (statName === "PS") return "❤️";
    if (statName === "Ataque") return "⚔️";
    if (statName === "Defensa") return "🛡️";
    if (statName === "Ataque Especial") return "🔮";
    if (statName === "Defensa Especial") return "🌟";
    if (statName === "Velocidad") return "💨";
    return "📊";
  };

  const getStatDescription = (statName, value) => {
    const descriptions = {
      PS: {
        high: "Alta vitalidad y resistencia en batalla",
        medium: "Resistencia equilibrada",
        low: "Baja resistencia, requiere cuidado estratégico",
      },
      Ataque: {
        high: "Gran poder ofensivo físico",
        medium: "Ataque físico equilibrado",
        low: "Bajo poder ofensivo físico",
      },
      Defensa: {
        high: "Excelente defensa contra ataques físicos",
        medium: "Defensa física equilibrada",
        low: "Vulnerable a ataques físicos",
      },
      "Ataque Especial": {
        high: "Poder ofensivo especial devastador",
        medium: "Ataque especial equilibrado",
        low: "Bajo poder ofensivo especial",
      },
      "Defensa Especial": {
        high: "Gran resistencia a ataques especiales",
        medium: "Defensa especial equilibrada",
        low: "Vulnerable a ataques especiales",
      },
      Velocidad: {
        high: "Alta velocidad, suele atacar primero",
        medium: "Velocidad promedio",
        low: "Baja velocidad, suele atacar último",
      },
    };

    const desc = descriptions[statName];
    if (!desc) return "Estadística estándar";

    if (value >= 100) return desc.high;
    if (value >= 60) return desc.medium;
    return desc.low;
  };

  if (loading) {
    return (
      <div className="stats-loading">
        <div className="loading-spinner"></div>
        <p>Analizando estadísticas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-error">
        <i className="fas fa-exclamation-triangle"></i>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="pokemon-stats">
      <div className="stats-header">
        <h3>Estadísticas Base</h3>
        <div className="stats-total">
          <span className="total-label">Total:</span>
          <span className="total-value">{totalStats}</span>
        </div>
      </div>

      <div className="total-progress">
        <div className="total-progress-bar">
          <div
            className="total-progress-fill"
            style={{
              width: `${(totalStats / 720) * 100}%`,
              background: getStatColor((totalStats / 720) * 100),
            }}
          ></div>
        </div>
        <div className="total-progress-labels">
          <span>0</span>
          <span>720</span>
        </div>
      </div>

      <div className="stats-list">
        {stats.map((stat) => {
          const percentage = getStatPercentage(stat.base_stat, stat.max_stat);
          const color = getStatColor(percentage);

          return (
            <div key={stat.id} className="stat-item">
              <div className="stat-info">
                <div className="stat-name-emoji">
                  <span className="stat-emoji">{getStatEmoji(stat.name)}</span>
                  <div className="stat-name-container">
                    <span className="stat-name">{stat.name}</span>
                    <span className="stat-description">
                      {getStatDescription(stat.name, stat.base_stat)}
                    </span>
                  </div>
                </div>
                <div className="stat-values">
                  <span className="stat-value">{stat.base_stat}</span>
                  <span className="stat-max">/{stat.max_stat}</span>
                </div>
              </div>

              <div className="stat-bar-container">
                <div className="stat-bar">
                  <div
                    className="stat-bar-fill"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: color,
                    }}
                  ></div>
                </div>
                <span className="stat-percentage">
                  {Math.round(percentage)}%
                </span>
              </div>

              {stat.effort > 0 && (
                <div className="effort-points">
                  <i className="fas fa-star"></i>
                  <span>EV: {stat.effort}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="stats-summary">
        <h4>Resumen de Potencial</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Potencial Ofensivo</span>
            <div className="summary-value">
              {stats.find((s) => s.name === "Ataque")?.base_stat +
                stats.find((s) => s.name === "Ataque Especial")?.base_stat || 0}
            </div>
          </div>
          <div className="summary-item">
            <span className="summary-label">Potencial Defensivo</span>
            <div className="summary-value">
              {stats.find((s) => s.name === "Defensa")?.base_stat +
                stats.find((s) => s.name === "Defensa Especial")?.base_stat ||
                0}
            </div>
          </div>
          <div className="summary-item">
            <span className="summary-label">Estadística Más Alta</span>
            <div className="summary-value highlight">
              {Math.max(...stats.map((s) => s.base_stat))}
            </div>
          </div>
          <div className="summary-item">
            <span className="summary-label">Estadística Más Baja</span>
            <div className="summary-value lowlight">
              {Math.min(...stats.map((s) => s.base_stat))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonStats;
