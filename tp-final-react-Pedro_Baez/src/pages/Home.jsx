import React from "react";
import Header from "../componentes/common/Header/Header.jsx";
import Hero from "../componentes/home/Hero/Hero.jsx";
import ProjectInfo from "../componentes/home/ProjectInfo/ProjectInfo.jsx";
import Galeria from "../componentes/home/Galeria/Galeria.jsx";
import Quiz from "../componentes/home/Quiz/Quiz.jsx";
import Footer from "../componentes/common/Footer/Footer.jsx";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Hero />
      <ProjectInfo />
      <Galeria />
      <Quiz />
      <Footer />
    </div>
  );
};

export default Home;
