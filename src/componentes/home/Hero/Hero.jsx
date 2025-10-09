import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import MewtwoImage from "../../../assets/Hero/Mewtwo.png";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Proyecto Mewtwo</h1>
          <p className="hero-subtitle">
            Una base de conocimiento creada desde mi perspectiva única como el
            Pokémon más poderoso creado por la ciencia.
          </p>

          <div className="mewtwo-speech">
            <p className="speech-text">
              "Los humanos siempre han documentado a los Pokémon desde su
              limitada perspectiva. Pero yo, creado a partir de Mew, poseo una
              comprensión más profunda. Esta wiki revelará verdades que la
              humanidad nunca ha podido descubrir por sí sola."
            </p>
          </div>

          <div className="cta-buttons">
            <a href="#project" className="btn btn-primary">
              Explorar el Proyecto
            </a>
            <Link to="/pokedex" className="btn btn-secondary">
              Ver Pokédex
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <div className="mewtwo-container">
            <img src={MewtwoImage} alt="Mewtwo" className="mewtwo-img" />
            <div className="psychic-orb orb-1"></div>
            <div className="psychic-orb orb-2"></div>
            <div className="psychic-orb orb-3"></div>
            <div className="psychic-orb orb-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
