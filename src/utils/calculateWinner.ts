import { SquareVal } from "../components/Game";

const lines3x3: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const lines5x5: number[][] = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

const calculateWinner = (squares: SquareVal[], dimension: 3 | 5): SquareVal => {
  let lines: number[][] = [];

  switch (dimension) {
    case 3:
      lines = lines3x3;
      break;
    case 5:
      lines = lines5x5;
      break;
    default:
      lines = lines3x3;
  }

  for (let i = 0; i < lines.length; i++) {
    let condition: boolean | null = false;
    const [a, b, c, d, e] = lines[i];

    switch (dimension) {
      case 3:
        condition =
          squares[a] && squares[a] === squares[b] && squares[a] === squares[c];
        break;
      case 5:
        condition =
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c] &&
          squares[a] === squares[d] &&
          squares[a] === squares[e];
        break;
      default:
        condition =
          squares[a] && squares[a] === squares[b] && squares[a] === squares[c];
    }

    if (condition) {
      return squares[a];
    }
  }
  return null;
};

export default calculateWinner;
