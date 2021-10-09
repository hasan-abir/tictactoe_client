import { useState } from "react";
import Game from "./components/Game";
import Join from "./components/Join";

function App() {
  const [isJoined, setIsJoined] = useState<boolean>(false);

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <p>
        Online Multiplayer along with <br /> being able to play on a 5x5 grid!
      </p>

      {isJoined ? <Game /> : <Join setIsJoined={setIsJoined} />}
    </div>
  );
}

export default App;
