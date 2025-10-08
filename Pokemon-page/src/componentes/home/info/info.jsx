import React from "react";
import PokemonCard from "./Card/Card";
// Importa las imágenes

import BulbasaurImg from "../../../assets/cards_info_home/Bulbasaur.webp";
import CharmanderImg from "../../../assets/cards_info_home/Charmander.webp";
import SquirtleImg from "../../../assets/cards_info_home/Squirtle.webp";
import "./info.css";

const InfoPokemon = () => {
  const pokemons = [
    {
      name: "Bulbasaur",
      number: "001",
      type: "Grass",
      height: "0.7 M",
      weight: "6.9 KG",
      description: "Semilla Pokémon que crece con el sol.",
      image: BulbasaurImg,
    },
    {
      name: "Charmander",
      number: "004",
      type: "Fire",
      height: "0.6 M",
      weight: "8.5 KG",
      description: "Lagarto Pokémon de cola flameante.",
      image: CharmanderImg,
    },
    {
      name: "Squirtle",
      number: "007",
      type: "Water",
      height: "0.5 M",
      weight: "9.0 KG",
      description: "Tortuga Pokémon con caparazón resistente.",
      image: SquirtleImg,
    },
  ];

  return (
    <div className="info-container">
      <div className="info-content">
        {/* Sección izquierda - Texto */}
        <div className="text-section">
          <h1>PokéExplorer</h1>
          <h2>Descubre el Mundo Pokémon</h2>
          <p>
            Sumérgete en un universo lleno de criaturas fascinantes y aventuras
            épicas. PokéExplorer es tu guía definitiva para explorar el vasto
            mundo de los Pokémon, desde los clásicos iniciales hasta las últimas
            generaciones.
          </p>

          <h2>Características Únicas</h2>
          <p>
            Nuestra plataforma te ofrece información detallada sobre cada
            Pokémon, incluyendo sus stats, evoluciones, movimientos y hábitats.
            Diseñada para entrenadores de todos los niveles, desde novatos hasta
            maestros Pokémon.
          </p>

          <h2>Comienza tu Aventura</h2>
          <p>
            Explora las cards interactivas a la derecha - cada una representa un
            Pokémon inicial con el que puedes comenzar tu journey. Haz hover
            sobre ellas para ver efectos especiales y descubre información única
            de cada criatura.
          </p>
        </div>

        {/* Sección derecha - Cards inclinadas */}
        <div className="cards-section">
          <div className="pokemon-grid">
            {pokemons.map((pokemon, index) => (
              <PokemonCard key={index} pokemon={pokemon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPokemon;
