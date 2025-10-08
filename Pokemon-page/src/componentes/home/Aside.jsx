import React from "react";
import "./Aside.css";

const Aside = () => {
  return (
    <aside className="project-aside">
      <div className="aside-content">
        <h2>Acerca del Proyecto</h2>

        <div className="project-card">
          <h3>🚀 PokéExplore</h3>
          <p>
            Una aplicación web moderna desarrollada con React que te permite
            explorar y descubrir información detallada sobre tus Pokémon
            favoritos.
          </p>
        </div>

        <div className="project-card">
          <h3>✨ Características</h3>
          <ul>
            <li>• Catálogo completo de Pokémon</li>
            <li>• Información detallada de stats</li>
            <li>• Diseño responsive y moderno</li>
            <li>• Interfaz intuitiva y amigable</li>
            <li>• Navegación fluida</li>
          </ul>
        </div>

        <div className="project-card">
          <h3>🛠 Tecnologías</h3>
          <div className="tech-tags">
            <span className="tech-tag">React</span>
            <span className="tech-tag">JavaScript</span>
            <span className="tech-tag">CSS3</span>
            <span className="tech-tag">HTML5</span>
            <span className="tech-tag">Vite</span>
          </div>
        </div>

        <div className="project-card">
          <h3>🎯 Objetivos</h3>
          <p>
            Crear una experiencia de usuario excepcional para los fans de
            Pokémon, combinando un diseño atractivo con funcionalidades útiles
            para explorar el mundo Pokémon.
          </p>
        </div>

        <div className="project-card stats-card">
          <h3>📊 Estadísticas</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">150+</span>
              <span className="stat-label">Pokémon</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">18</span>
              <span className="stat-label">Tipos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Generaciones</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
