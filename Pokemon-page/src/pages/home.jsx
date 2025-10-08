import InfoPokemon from "../componentes/home/info/info";
import Hero from "../componentes/home/Hero/hero";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="home-center-container">
        <Hero />
        <InfoPokemon />
      </div>
    </div>
  );
}

export default Home;
