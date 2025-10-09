import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, currentRegion }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Buscar Pokémon en ${currentRegion}...`}
            className="search-input"
          />
          {searchTerm && (
            <button type="button" onClick={handleClear} className="clear-btn">
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        <button type="submit" className="search-btn">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
