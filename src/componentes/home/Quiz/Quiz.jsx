import React from "react";
import usePokemonQuiz from "../../../hooks/usePokemonQuiz"; // Ruta correcta
import "./Quiz.css";

const Quiz = () => {
  const {
    currentPokemon,
    options,
    attempts,
    score,
    quizActive,
    feedback,
    isRevealed,
    handleAnswer,
    loadNewPokemon,
  } = usePokemonQuiz();

  return (
    <section className="quiz" id="quiz">
      <div className="container">
        <h2 className="section-title">Quiz Pokémon</h2>
        <div className="quiz-container">
          <h3 className="quiz-title">Adivina el Pokémon</h3>
          <p className="quiz-description">
            Tienes 3 intentos para adivinar este Pokémon basado en su silueta.
          </p>

          <div className="quiz-image-container">
            <div className="quiz-image">
              {currentPokemon && (
                <img
                  src={currentPokemon.image}
                  alt="Pokémon a adivinar"
                  className={isRevealed ? "revealed" : "silhouette"}
                />
              )}
            </div>
          </div>

          <div className="quiz-stats">
            <div>
              Intentos restantes: <span>{attempts}</span>
            </div>
            <div>
              Puntuación: <span>{score}</span>
            </div>
          </div>

          <div className="quiz-feedback">{feedback}</div>

          <div className="quiz-options">
            {options.map((option) => (
              <div
                key={option.id}
                className="quiz-option"
                onClick={() => handleAnswer(option.id)}
              >
                {option.name}
              </div>
            ))}
          </div>

          <button
            className="quiz-next"
            onClick={loadNewPokemon}
            disabled={quizActive}
          >
            Siguiente Pokémon
          </button>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
