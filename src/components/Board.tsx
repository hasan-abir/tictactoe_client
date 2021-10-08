import Square from "./Square";
import { SquareVal } from "./Game";

interface PropTypes {
  squares: SquareVal[];
  winner: SquareVal;
  dimension: 3 | 5;
  handleClick: (i: number) => void;
}

function Board({ squares, winner, dimension, handleClick }: PropTypes) {
  return (
    <div>
      {winner ? (
        <h3>Winner is {winner}</h3>
      ) : !squares.includes(null) ? (
        <h3>It is a TIE!</h3>
      ) : null}

      <div className={`board board-${dimension}x${dimension}`}>
        {squares.map((square, index) => {
          return (
            <Square
              key={index}
              value={square}
              handleClick={() => handleClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Board;
