import { useState, useEffect } from "react";
import Game from "./components/Game";
import GameOptions from "./components/GameOptions";
import Join from "./components/Join";
import {
  playersJoined,
  currentPlayerJoined,
  startGame,
  GameConfig,
  endGame,
  gameEnded,
  resetGame,
} from "./utils/socket";

function App() {
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [isRoomFull, setIsRoomFull] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);

  useEffect(() => {
    currentPlayerJoined(() => {
      setIsJoined(true);
    });

    playersJoined(() => {
      setIsRoomFull(true);
    });

    startGame((config) => {
      setGameStarted(true);
      setGameConfig(config);
    });

    gameEnded(() => {
      setIsJoined(false);
      setIsRoomFull(false);
      setGameStarted(false);
      setGameConfig(null);
    });
  }, []);
  return (
    <div className="container">
      {isJoined ? (
        <>
          {isRoomFull ? (
            gameStarted ? (
              <Game config={gameConfig} />
            ) : (
              <GameOptions />
            )
          ) : (
            <h2>Waiting for all the players to join...</h2>
          )}
          <div className="btn-group">
            {gameStarted ? (
              <button onClick={resetGame} className="text-btn">
                Reset game
              </button>
            ) : null}
            <button onClick={endGame} className="text-btn text-btn-secondary">
              Leave room
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="hero">
            <h1>Tic Tac Toe</h1>
            <p>
              Online Multiplayer along with <br /> being able to play on a 5x5
              grid!
            </p>
          </div>

          <Join />
        </>
      )}
    </div>
  );
}

export default App;
