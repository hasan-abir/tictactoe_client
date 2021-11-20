import { setGameOptions } from "../utils/socket";

function GameOptions() {
  const handleClick = (dimension: 3 | 5) => {
    setGameOptions(dimension);
  };

  return (
    <div>
      <div className="hero">
        <h1>Pick a grid</h1>
        <p>
          Whichever player picks the grid first,
          <br /> that grid will be chosen for the match
        </p>
      </div>
      <div className="choose-grid">
        <button onClick={() => handleClick(3)} className="cta">
          3 x 3
        </button>
        <button onClick={() => handleClick(5)} className="cta">
          5 x 5
        </button>
      </div>
    </div>
  );
}

export default GameOptions;
