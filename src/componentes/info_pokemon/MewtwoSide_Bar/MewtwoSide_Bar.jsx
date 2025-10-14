import React from "react";
import "./MewtwoSide_bar.css";

import MewtwoKanto from "../../../assets/Mewtwo_regions/Mewtwo_Kanto.jpeg";
import MewtwoJohto from "../../../assets/Mewtwo_regions/Mewtwo_Johto.jpeg";
import MewtwoHoenn from "../../../assets/Mewtwo_regions/Mewtwo_Hoenn.jpeg";
import MewtwoSinnoh from "../../../assets/Mewtwo_regions/Mewtwo_Sinnoh.jpeg";
import MewtwoUnova from "../../../assets/Mewtwo_regions/Mewtwo_Unova.jpeg";
import MewtwoKalos from "../../../assets/Mewtwo_regions/Mewtwo_Kalos.jpeg";
import MewtwoAlola from "../../../assets/Mewtwo_regions/Mewtwo_Alola.jpeg";
import MewtwoGalar from "../../../assets/Mewtwo_regions/Mewtwo_Galar.jpeg";

const MewtwoSidebar = ({ currentRegion }) => {
  const regionData = {
    kanto: {
      image: MewtwoKanto,
      phrase:
        "Los Pokémon legendarios de Kanto... Mew, el ancestro genético del que fui creado. Articuno, Zapdos y Moltres, guardianes elementales. Y los tres pájaros legendarios que pocos han visto.",
      legendaries: ["Mew", "Articuno", "Zapdos", "Moltres"],
    },
    johto: {
      image: MewtwoJohto,
      phrase:
        "Johto alberga a las bestias legendarias... Raikou, Entei y Suicune, renacidos de las llamas. Y Lugia, el guardián de los mares cuyo poder psíquico rivaliza con el mío.",
      legendaries: ["Raikou", "Entei", "Suicune", "Lugia", "Ho-Oh"],
    },
    hoenn: {
      image: MewtwoHoenn,
      phrase:
        "En Hoenn, los titanes Groudon y Kyogre moldean la tierra y el mar. Rayquaza, el guardián de los cielos. Una región donde el equilibrio cósmico es fundamental.",
      legendaries: [
        "Groudon",
        "Kyogre",
        "Rayquaza",
        "Regirock",
        "Regice",
        "Registeel",
      ],
    },
    sinnoh: {
      image: MewtwoSinnoh,
      phrase:
        "Sinnoh... donde Dialga y Palkia controlan el tiempo y el espacio. Giratina, el habitante del mundo distorsión. Una región que cuestiona la misma realidad.",
      legendaries: ["Dialga", "Palkia", "Giratina", "Heatran", "Regigigas"],
    },
    unova: {
      image: MewtwoUnova,
      phrase:
        "Unova presenta a Reshiram y Zekrom, representantes de la verdad e idealismo. Kyurem, el vacío que los completa. Una trinidad que refleja la naturaleza humana.",
      legendaries: [
        "Reshiram",
        "Zekrom",
        "Kyurem",
        "Cobalion",
        "Terrakion",
        "Virizion",
      ],
    },
    kalos: {
      image: MewtwoKalos,
      phrase:
        "Kalos y su misterioso Pokémon Xerneas e Yveltal, vida y destrucción. Zygarde, el guardián del equilibrio. Una región donde la megaevolución revela potencial oculto.",
      legendaries: ["Xerneas", "Yveltal", "Zygarde", "Diancie"],
    },
    alola: {
      image: MewtwoAlola,
      phrase:
        "Alola... los dioses guardianes, los Ultraentes, y Necrozma que devora la luz. Una región donde los límites entre dimensiones se desdibujan.",
      legendaries: [
        "Solgaleo",
        "Lunala",
        "Necrozma",
        "Tapu Koko",
        "Tapu Lele",
        "Tapu Bulu",
        "Tapu Fini",
      ],
    },
    galar: {
      image: MewtwoGalar,
      phrase:
        "Galar, donde Zacian y Zamazenta protegen la región. Eternatus, la fuente de la dinamax. Una nueva forma de poder que incluso yo encuentro... interesante.",
      legendaries: ["Zacian", "Zamazenta", "Eternatus", "Calyrex"],
    },
  };

  const data = regionData[currentRegion] || regionData.kanto;

  return (
    <div className="sidebar-mewtwo">
      <div className="mewtwo-sidebar-card">
        <div className="sidebar-mewtwo-image">
          <img
            src={data.image}
            alt={`Mewtwo en ${currentRegion}`}
            onError={(e) => {
              e.target.src = MewtwoDefault;
              console.log("Error cargando imagen de Mewtwo, usando default");
            }}
          />
        </div>

        <div className="sidebar-mewtwo-content">
          <div className="mewtwo-quote">
            <p>"{data.phrase}"</p>
            <div className="quote-decoration"></div>
          </div>

          <div className="region-legendaries-info">
            <h4>
              Legendarios de{" "}
              {currentRegion.charAt(0).toUpperCase() + currentRegion.slice(1)}:
            </h4>
            <div className="legendaries-container">
              {data.legendaries.map((legendary, index) => (
                <span key={index} className="legendary-item">
                  {legendary}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MewtwoSidebar;
