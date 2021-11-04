import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const joinRoom = (roomID: string) => {
  socket.emit("join_room", roomID);
};

export const playersJoined = (callback: (roomID: string) => void) => {
  socket.on("players_joined", callback);
};

export const currentPlayerJoined = (callback: () => void) => {
  socket.on("current_player_joined", callback);
};

export const roomOccupied = (callback: (msg: string) => void) => {
  socket.on("room_occupied", callback);
};

export const setGameOptions = (roomID: string, dimension: 3 | 5) => {
  const options = { dimension };

  socket.emit("set_game_options", roomID, options);
};

export interface GameConfig {
  start: boolean;
  player: "x" | "o";
  dimension: 3 | 5;
}

export const startGame = (callback: (config: GameConfig) => void) => {
  socket.on("game_started", callback);
};

export default socket;
