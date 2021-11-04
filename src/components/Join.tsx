import React, { useState, useEffect } from "react";
import { joinRoom, roomOccupied } from "../utils/socket";

function Join() {
  const [roomID, setRoomID] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();

    joinRoom(roomID);
  };

  useEffect(() => {
    roomOccupied((msg) => {
      setError(msg);
    });
  }, []);

  return (
    <div>
      {error ? <p className="error">{error}</p> : null}

      <form onSubmit={handleJoin}>
        <label>Join/Create a room</label>
        <input
          type="text"
          placeholder="Room ID"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRoomID(e.target.value)
          }
        />
        <button type="submit" className="cta">
          Join
        </button>
      </form>
    </div>
  );
}

export default Join;
