import { SquareVal } from "./Game";

interface PropTypes {
  value: SquareVal;
  handleClick: () => void;
}

function Square({ value, handleClick }: PropTypes) {
  return (
    <button className="square" onClick={() => handleClick()}>
      {value}
    </button>
  );
}

export default Square;
