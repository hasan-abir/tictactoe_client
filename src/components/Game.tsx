import { useEffect, useState } from "react";
import Board from "./Board";
import calculateWinner from "../utils/calculateWinner";
import {
  GameConfig,
  updateGame,
  gameUpdated,
  gameResetted,
} from "../utils/socket";

interface PropTypes {
  config: GameConfig | null;
}

interface Player {
  symbol: "x" | "o";
  turn: boolean;
}

export type SquareVal = "x" | "o" | null;

function Game({ config }: PropTypes) {
  const [dimension, setDimension] = useState<3 | 5>(3);
  const [squares, setSquares] = useState<SquareVal[]>(
    Array(dimension * dimension).fill(null)
  );
  const [player, setPlayer] = useState<Player>({ symbol: "x", turn: false });
  const [winner, setWinner] = useState<SquareVal>(null);

  const updateSquare = (i: number) => {
    const tempSquares = [...squares];

    if (tempSquares[i] || !player.turn || winner) return null;

    tempSquares[i] = player.symbol;

    setSquares(tempSquares);

    setPlayer((val) => {
      const tempPlayer = { ...val, turn: false };
      return tempPlayer;
    });

    updateGame(tempSquares);

    setWinner(calculateWinner(tempSquares, dimension));
  };

  useEffect(() => {
    if (config) {
      setDimension(config.dimension);
      setSquares(Array(config.dimension * config.dimension).fill(null));

      setPlayer((val) => {
        const tempPlayer = {
          ...val,
          turn: config.start,
          symbol: config.player,
        };
        return tempPlayer;
      });
    }

    gameUpdated((newSquares) => {
      setSquares(newSquares);
      setPlayer((val) => {
        const tempPlayer = { ...val, turn: true };
        return tempPlayer;
      });

      setWinner(calculateWinner(newSquares, dimension));
    });

    gameResetted(() => {
      setSquares(Array(dimension * dimension).fill(null));

      setWinner(null);
    });
  }, [config, dimension]);

  return (
    <div>
      <div className="hero">
        {winner ? (
          <h2>
            Winner is <span className="capitalize">{winner}</span>
          </h2>
        ) : !squares.includes(null) ? (
          <h2>It is a TIE!</h2>
        ) : !player.turn ? (
          <h2>Waiting on next move...</h2>
        ) : (
          <h2>
            You are - <span className="capitalize">{player.symbol}</span>
          </h2>
        )}
      </div>

      <Board
        squares={squares}
        dimension={dimension}
        handleClick={updateSquare}
      />
    </div>
  );
}

export default Game;
