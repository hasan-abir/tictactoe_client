import { useState } from "react";
import Board from "./Board";
import calculateWinner from "../utils/calculateWinner";

export type SquareVal = "x" | "o" | null;

function Game() {
  const [dimension, setDimension] = useState<3 | 5>(3);
  const [squares, setSquares] = useState<SquareVal[]>(
    Array(dimension * dimension).fill(null)
  );
  const [nextTurn, setNextTurn] = useState<boolean>(false);
  const [winner, setWinner] = useState<SquareVal>(null);

  const updateSquare = (i: number) => {
    const tempSquares = [...squares];

    if (tempSquares[i] || winner) return null;

    const squareVal = nextTurn ? "o" : "x";

    tempSquares[i] = squareVal;

    setSquares(tempSquares);

    setNextTurn(!nextTurn);

    setWinner(calculateWinner(tempSquares, dimension));
  };

  return (
    <div>
      <Board
        squares={squares}
        dimension={dimension}
        winner={winner}
        handleClick={updateSquare}
      />
    </div>
  );
}

export default Game;