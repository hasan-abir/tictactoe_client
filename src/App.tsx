import Game from "./components/Game";

function App() {
  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <p>
        Online Multiplayer along with <br /> being able to play on a 5x5 grid!
      </p>

      <Game />
    </div>
  );
}

export default App;
