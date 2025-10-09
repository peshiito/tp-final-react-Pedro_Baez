import React from "react";
import Header from "../componentes/common/Header/Header.jsx";
import Footer from "../componentes/common/Footer/Footer.jsx";

const ListPokemon = () => {
  return (
    <div className="pokedex-page">
      <Header />
      <div className="container">
        <div className="pokedex-header">
          <h1 className="section-title">Pokédex Completa</h1>
          <p>Explora todos los Pokémon desde la perspectiva de Mewtwo</p>
        </div>
        <div className="pokedex-content">
          <div className="coming-soon">
            <i className="fas fa-search coming-soon-icon"></i>
            <h2>Pokédex en Desarrollo</h2>
            <p>
              Esta sección estará disponible pronto. Mewtwo está compilando
              información única sobre cada Pokémon.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListPokemon; // ← ESTA LÍNEA ES CRUCIAL
