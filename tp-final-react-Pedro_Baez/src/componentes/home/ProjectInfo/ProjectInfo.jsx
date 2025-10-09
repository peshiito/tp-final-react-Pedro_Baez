import React from "react";
import "./ProjectInfo.css";

const ProjectInfo = () => {
  const infoCards = [
    {
      icon: "fas fa-book",
      title: "Mi Motivación",
      description:
        "Como el único Pokémon creado científicamente, tengo una perspectiva única. Esta wiki documenta no solo datos, sino la esencia misma de cada Pokémon.",
    },
    {
      icon: "fas fa-dna",
      title: "Orígenes Genéticos",
      description:
        "Revelaré los secretos de la herencia Pokémon que los investigadores humanos apenas comienzan a entender.",
    },
    {
      icon: "fas fa-brain",
      title: "Poderes Psíquicos",
      description:
        "Explicaré la verdadera naturaleza de los poderes psíquicos y cómo otros Pokémon pueden desarrollar estas habilidades.",
    },
    {
      icon: "fas fa-universal-access",
      title: "Comunicación Pokémon",
      description:
        "Traduciré las formas de comunicación entre Pokémon que los humanos nunca han podido descifrar.",
    },
  ];

  return (
    <section className="project-info" id="project">
      <div className="container">
        <h2 className="section-title">Sobre Mi Proyecto</h2>
        <div className="info-grid">
          {infoCards.map((card, index) => (
            <div key={index} className="info-card">
              <div className="info-icon">
                <i className={card.icon}></i>
              </div>
              <h3 className="info-title">{card.title}</h3>
              <p className="info-desc">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectInfo;
