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
            <Link to="/" className="logo-link">
              <span>Diario de Mewtwo</span>
            </Link>
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
                <Link
                  to="/descripciones"
                  className={
                    location.pathname === "/descripciones" ? "active" : ""
                  }
                >
                  Descripciones
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
