import { useEffect, useState } from "react";
import Board from "./Board";
import calculateWinner from "../utils/calculateWinner";
import { GameConfig } from "../utils/socket";

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
      const tempPlayer = { ...val, turn: !val.turn };
      return tempPlayer;
    });

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
  }, [config]);

  return (
    <div>
      {winner ? (
        <h2>Winner is {winner}</h2>
      ) : !squares.includes(null) ? (
        <h2>It is a TIE!</h2>
      ) : null}

      <Board
        squares={squares}
        dimension={dimension}
        handleClick={updateSquare}
      />
    </div>
  );
}

export default Game;
