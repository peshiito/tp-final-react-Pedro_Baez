import { useState, useEffect } from "react";

const usePokemonData = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentRegion, setCurrentRegion] = useState("kanto");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ types: [], sortBy: "id" });

  const regions = {
    kanto: { start: 1, end: 151, name: "Kanto" },
    johto: { start: 152, end: 251, name: "Johto" },
    hoenn: { start: 252, end: 386, name: "Hoenn" },
    sinnoh: { start: 387, end: 493, name: "Sinnoh" },
    unova: { start: 494, end: 649, name: "Unova" },
    kalos: { start: 650, end: 721, name: "Kalos" },
    alola: { start: 722, end: 809, name: "Alola" },
    galar: { start: 810, end: 898, name: "Galar" },
  };

  const fetchPokemon = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) throw new Error("Pokémon not found");
      return await response.json();
    } catch (error) {
      console.error(`Error fetching Pokémon ${id}:`, error);
      return null;
    }
  };

  const loadPokemons = async (region, limit = 50) => {
    setLoading(true);
    const regionData = regions[region];
    const totalPokemon = regionData.end - regionData.start + 1;
    const pokemonIds = Array.from(
      { length: Math.min(limit, totalPokemon) },
      (_, i) => regionData.start + i
    );

    try {
      const pokemonPromises = pokemonIds.map((id) => fetchPokemon(id));
      const pokemonData = (await Promise.all(pokemonPromises)).filter(Boolean);
      setPokemons(pokemonData);
    } catch (error) {
      console.error("Error loading Pokémon:", error);
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  const searchPokemon = async (search) => {
    setLoading(true);
    try {
      // Intentar buscar por ID primero
      if (!isNaN(search)) {
        const pokemon = await fetchPokemon(parseInt(search));
        setPokemons(pokemon ? [pokemon] : []);
      } else {
        // Buscar por nombre
        const pokemon = await fetchPokemon(search.toLowerCase());
        setPokemons(pokemon ? [pokemon] : []);
      }
    } catch (error) {
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  const changeRegion = (region) => {
    setCurrentRegion(region.id);
    setSearchTerm("");
    setFilters({ types: [], sortBy: "id" });
    loadPokemons(region.id);
  };

  useEffect(() => {
    loadPokemons(currentRegion);
  }, []);

  return {
    pokemons,
    loading,
    currentRegion,
    searchTerm,
    filters,
    regions,
    setSearchTerm,
    setFilters,
    changeRegion,
    loadPokemons,
    searchPokemon,
  };
};

export default usePokemonData;
