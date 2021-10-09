import React, { useState } from "react";

interface PropTypes {
  setIsJoined: (isJoined: boolean) => void;
}

function Join({ setIsJoined }: PropTypes) {
  const [roomToJoin, setRoomJoin] = useState<string>("");
  const [roomToCreate, setRoomCreate] = useState<string>("");
  const [dimension, setDimension] = useState<number>(3);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();

    setIsJoined(true);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    setIsJoined(true);
  };

  return (
    <div>
      <form onSubmit={handleJoin}>
        <label>Join a room</label>
        <input
          type="text"
          placeholder="Room ID"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRoomJoin(e.target.value)
          }
        />
        <button type="submit">Join</button>
      </form>
      <hr />
      <form onSubmit={handleCreate}>
        <label>Create a room</label>
        <input
          type="text"
          placeholder="Room ID"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRoomCreate(e.target.value)
          }
        />
        <label>Board dimension</label>
        <select
          value={dimension}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setDimension(parseInt(e.target.value))
          }
        >
          <option value="3">3x3</option>
          <option value="5">5x5</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Join;
