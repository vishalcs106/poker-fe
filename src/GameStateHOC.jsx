import React from "react";
import GameStateContext from "./context/GameStateContext";

export function withGameState(Component) {
  return function GameStateComponent(props) {
    return (
      <GameStateContext.Consumer>
        {(gameState) => <Component {...props} gameState={gameState} />}
      </GameStateContext.Consumer>
    );
  };
}
