import React from "react";

const CarruselItem = ({ src, alt, isActive }) => {
  return (
    <div className={`carrusel-item ${isActive ? "active" : ""}`}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default CarruselItem;
