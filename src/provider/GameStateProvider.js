import React from "react";
import GameStateContext from "../context/GameStateContext";

const GameStateProvider = ({ children, gameState }) => {
  return (
    <GameStateContext.Provider value={gameState}>
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;
