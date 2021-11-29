import { io } from "socket.io-client";
import { SquareVal } from "../components/Game";

const apiHost: string =
  process.env.REACT_APP_API_HOST || "http://localhost:5000";

const socket = io(apiHost);

export const joinRoom = (roomID: string) => {
  socket.emit("join_room", roomID);
};

export const playersJoined = (callback: () => void) => {
  socket.on("players_joined", callback);
};

export const currentPlayerJoined = (callback: () => void) => {
  socket.on("current_player_joined", callback);
};

export const roomOccupied = (callback: (msg: string) => void) => {
  socket.on("room_occupied", callback);
};

export const setGameOptions = (dimension: 3 | 5) => {
  const options = { dimension };

  socket.emit("set_game_options", options);
};

export interface GameConfig {
  start: boolean;
  player: "x" | "o";
  dimension: 3 | 5;
}

export const startGame = (callback: (config: GameConfig) => void) => {
  socket.on("game_started", callback);
};

export const updateGame = (squares: SquareVal[]) => {
  socket.emit("update_game", squares);
};

export const gameUpdated = (callback: (squares: SquareVal[]) => void) => {
  socket.on("game_updated", callback);
};

export const endGame = () => {
  socket.emit("end_game");
};

export const gameEnded = (callback: () => void) => {
  socket.on("game_ended", callback);
};

export const resetGame = () => {
  socket.emit("reset_game");
};

export const gameResetted = (callback: () => void) => {
  socket.on("game_resetted", callback);
};

export default socket;
