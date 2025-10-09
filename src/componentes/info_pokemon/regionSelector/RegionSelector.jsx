import React from "react";
import "./RegionSelector.css";

const RegionSelector = ({ currentRegion, onRegionChange }) => {
  const regions = [
    { id: "kanto", name: "Kanto", start: 1, end: 151, color: "#EF5350" },
    { id: "johto", name: "Johto", start: 152, end: 251, color: "#42A5F5" },
    { id: "hoenn", name: "Hoenn", start: 252, end: 386, color: "#66BB6A" },
    { id: "sinnoh", name: "Sinnoh", start: 387, end: 493, color: "#AB47BC" },
    { id: "unova", name: "Unova", start: 494, end: 649, color: "#FFA726" },
    { id: "kalos", name: "Kalos", start: 650, end: 721, color: "#26C6DA" },
    { id: "alola", name: "Alola", start: 722, end: 809, color: "#FF7043" },
    { id: "galar", name: "Galar", start: 810, end: 898, color: "#78909C" },
  ];

  return (
    <div className="region-selector">
      <h3 className="region-title">Selecciona una Región</h3>
      <div className="region-buttons">
        {regions.map((region) => (
          <button
            key={region.id}
            className={`region-btn ${
              currentRegion === region.id ? "active" : ""
            }`}
            onClick={() => onRegionChange(region)}
            style={{
              borderColor: region.color,
              background:
                currentRegion === region.id
                  ? `linear-gradient(135deg, ${region.color}40, ${region.color}20)`
                  : "transparent",
            }}
          >
            <span className="region-name">{region.name}</span>
            <span className="region-range">
              {region.start}-{region.end}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RegionSelector;
