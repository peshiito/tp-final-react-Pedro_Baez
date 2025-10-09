import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>El Proyecto Mewtwo</h3>
            <p>
              Una wiki Pokémon única, creada desde la perspectiva del Pokémon
              más poderoso jamás creado.
            </p>
            <div className="social-links">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#">
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Navegación</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/pokedex">Pokédex</Link>
              </li>
              <li>
                <a href="#project">El Proyecto</a>
              </li>
              <li>
                <a href="#quiz">Quiz Pokémon</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contacto</h3>
            <ul className="footer-links">
              <li>
                <i className="fas fa-map-marker-alt"></i> Isla Canela, Región de
                Kanto
              </li>
              <li>
                <i className="fas fa-envelope"></i> mewtwo@proyectopokemon.com
              </li>
              <li>
                <i className="fas fa-phone"></i> Comunicación Psíquica
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2023 Proyecto Mewtwo. Todos los derechos reservados. | Creado
            con poderes psíquicos
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
