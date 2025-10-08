import React from "react";
import Carrusel from "./Carrusel/Carrusel.jsx";
import "./Hero.css";

function Hero() {
  return (
    <div className="heroContainer">
      <div className="hero_text">
        <h1>Bienvenido a PokeVerse</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem
          modi officiis nostrum itaque dolor quae cum at minima rerum facere
          voluptatibus, culpa ipsum nemo vero vitae quisquam molestiae eos!
        </p>
        <button>Más información</button>
        <button>Lista Pokémon</button>
      </div>
      <div className="hero_carrusel">
        <Carrusel />
      </div>
    </div>
  );
}

export default Hero;
