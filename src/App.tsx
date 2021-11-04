import { useState, useEffect } from "react";
import Game from "./components/Game";
import GameOptions from "./components/GameOptions";
import Join from "./components/Join";
import {
  playersJoined,
  currentPlayerJoined,
  startGame,
  GameConfig,
} from "./utils/socket";

function App() {
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [isRoomFull, setIsRoomFull] = useState<boolean>(false);
  const [currentRoomID, setCurrentRoomID] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);

  useEffect(() => {
    currentPlayerJoined(() => {
      setIsJoined(true);
    });

    playersJoined((roomID) => {
      setIsRoomFull(true);
      setCurrentRoomID(roomID);
    });

    startGame((config) => {
      setGameStarted(true);
      setGameConfig(config);
    });
  }, []);
  return (
    <div className="container">
      {isJoined ? (
        isRoomFull ? (
          gameStarted ? (
            <Game config={gameConfig} />
          ) : (
            <GameOptions roomID={currentRoomID} />
          )
        ) : (
          <h2>Waiting for all the players to join...</h2>
        )
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
