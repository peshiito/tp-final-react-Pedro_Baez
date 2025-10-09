import React from "react";
import "./Galeria.css";

const Galeria = () => {
  return (
    <section className="galeria" id="galeria">
      <div className="container">
        <h2 className="section-title">Pokémon Destacados</h2>
        <div className="galeria-message">
          <p>Aquí se mostrarán tus Pokémon favoritos</p>
          <small>
            Esta sección está preparada para renderizar tus Pokémon favoritos
            cuando los selecciones
          </small>
        </div>
        <div className="galeria-grid"></div>
      </div>
    </section>
  );
};

export default Galeria;
