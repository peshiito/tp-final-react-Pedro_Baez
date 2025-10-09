import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <i className="logo-icon fas fa-dna"></i>
            <span>Diario de Mewtwo</span>
          </div>
          <nav className="nav">
            <ul>
              <li>
                <Link
                  to="/"
                  className={location.pathname === "/" ? "active" : ""}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/pokedex"
                  className={location.pathname === "/pokedex" ? "active" : ""}
                >
                  Pokédex
                </Link>
              </li>
              <li>
                <a href="#project">El Proyecto</a>
              </li>
              <li>
                <a href="#quiz">Quiz</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
