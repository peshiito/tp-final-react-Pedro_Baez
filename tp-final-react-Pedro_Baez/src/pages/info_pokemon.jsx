import React from "react";
import { useParams } from "react-router-dom";

import Header from "../componentes/common/Header/Header.jsx";
import Footer from "../componentes/common/Footer/Footer.jsx";

const InfoPokemon = () => {
  const { id } = useParams();

  return (
    <div className="pokemon-info-page">
      <Header />
      <div className="container">
        <div className="pokemon-info-header">
          <h1 className="section-title">Información del Pokémon</h1>
          <p>Detalles únicos revelados por Mewtwo</p>
        </div>
        <div className="pokemon-info-content">
          <div className="coming-soon">
            <i className="fas fa-dna coming-soon-icon"></i>
            <h2>Análisis en Progreso</h2>
            <p>
              Mewtwo está analizando la estructura genética del Pokémon #{id}.
              Esta información estará disponible pronto.
            </p>
            <div className="mewtwo-message">
              <p>
                "Los humanos solo ven la superficie. Yo veo el código genético
                que define a cada Pokémon."
              </p>
              <small>- Mewtwo</small>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InfoPokemon; // ← ESTA LÍNEA ES CRUCIAL
