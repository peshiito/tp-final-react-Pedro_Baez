import React, { useState, useRef } from "react";
import "./PokemonAudio.css";

const AudioPlayer = ({ pokemonId }) => {
  const [playCount, setPlayCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      setPlayCount((prev) => prev + 1);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  const getAudioUrl = () => {
    return `https://play.pokemonshowdown.com/audio/cries/${pokemonId}.mp3`;
  };

  return (
    <div className="audio-player">
      <button
        className={`play-button ${isPlaying ? "playing" : ""}`}
        onClick={playAudio}
        disabled={isPlaying}
      >
        <i className={`fas ${isPlaying ? "fa-volume-up" : "fa-play"}`}></i>
        {isPlaying ? "Reproduciendo..." : "Reproducir Audio"}
      </button>

      <div className="play-count">
        <i className="fas fa-headphones"></i>
        Reproducido: {playCount} veces
      </div>

      <audio
        ref={audioRef}
        src={getAudioUrl()}
        onEnded={handleAudioEnd}
        preload="auto"
      />
    </div>
  );
};

export default AudioPlayer;
