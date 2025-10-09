import { useState, useEffect } from "react";

const usePokemonQuiz = () => {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [options, setOptions] = useState([]);
  const [attempts, setAttempts] = useState(3);
  const [score, setScore] = useState(0);
  const [quizActive, setQuizActive] = useState(true);
  const [usedPokemonIds, setUsedPokemonIds] = useState(new Set());
  const [feedback, setFeedback] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const loadNewPokemon = async () => {
    try {
      let pokemonId;
      do {
        pokemonId = Math.floor(Math.random() * 151) + 1;
      } while (usedPokemonIds.has(pokemonId) && usedPokemonIds.size < 151);

      setUsedPokemonIds((prev) => new Set(prev).add(pokemonId));

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const data = await response.json();

      const pokemon = {
        id: data.id,
        name: data.name,
        image:
          data.sprites.other["official-artwork"].front_default ||
          data.sprites.front_default,
      };

      setCurrentPokemon(pokemon);
      await generateOptions(pokemon.id);
      setAttempts(3);
      setQuizActive(true);
      setFeedback("");
      setIsRevealed(false);
    } catch (error) {
      console.error("Error loading Pokémon:", error);
      setFeedback("Error al cargar el Pokémon. Intenta de nuevo.");
    }
  };

  const generateOptions = async (correctId) => {
    const optionIds = new Set([correctId]);
    while (optionIds.size < 4) {
      const randomId = Math.floor(Math.random() * 151) + 1;
      optionIds.add(randomId);
    }

    const optionIdsArray = Array.from(optionIds);
    shuffleArray(optionIdsArray);

    const optionsData = [];
    for (const id of optionIdsArray) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        optionsData.push({
          id: data.id,
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        });
      } catch (error) {
        console.error("Error loading option:", error);
      }
    }

    setOptions(optionsData);
  };

  const handleAnswer = (selectedId) => {
    if (!quizActive) return;

    const isCorrect = selectedId === currentPokemon.id;

    if (isCorrect) {
      setFeedback(
        `¡Correcto! Es ${
          currentPokemon.name.charAt(0).toUpperCase() +
          currentPokemon.name.slice(1)
        }.`
      );
      setScore((prev) => prev + 1);
      setQuizActive(false);
      setIsRevealed(true);
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);

      if (newAttempts <= 0) {
        setFeedback(
          `¡Has agotado tus intentos! Era ${
            currentPokemon.name.charAt(0).toUpperCase() +
            currentPokemon.name.slice(1)
          }.`
        );
        setQuizActive(false);
        setIsRevealed(true);
      } else {
        setFeedback("Incorrecto. Intenta de nuevo.");
      }
    }
  };

  useEffect(() => {
    loadNewPokemon();
  }, []);

  return {
    currentPokemon,
    options,
    attempts,
    score,
    quizActive,
    feedback,
    isRevealed,
    handleAnswer,
    loadNewPokemon,
  };
};

export default usePokemonQuiz;
