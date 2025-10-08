import React, { useEffect, useState } from "react";
import CarruselItem from "./CarruselItem";
import img1 from "../../../../assets/carrusel_img/img1.jpeg";
import img2 from "../../../../assets/carrusel_img/img2.jpeg";
import img3 from "../../../../assets/carrusel_img/img3.jpeg";
import img4 from "../../../../assets/carrusel_img/img4.jpeg";
import img5 from "../../../../assets/carrusel_img/img5.jpeg";
import "./Carrusel.css";

const Carrusel = () => {
  const imagenes = [img1, img2, img3, img4, img5];
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  return (
    <div className="carrusel">
      {imagenes.map((imagen, index) => (
        <CarruselItem
          key={index}
          src={imagen}
          alt={`Imagen ${index + 1}`}
          isActive={index === indice}
        />
      ))}

      {}
      <div className="carrusel-progress">
        {imagenes.map((_, index) => (
          <div
            key={index}
            className={`progress-dot ${index === indice ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carrusel;
