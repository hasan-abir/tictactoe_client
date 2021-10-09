import Square from "./Square";
import { SquareVal } from "./Game";

interface PropTypes {
  squares: SquareVal[];
  dimension: 3 | 5;
  handleClick: (i: number) => void;
}

function Board({ squares, dimension, handleClick }: PropTypes) {
  return (
    <div>
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
