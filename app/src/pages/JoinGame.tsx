import { SyntheticEvent, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { IGameState, createWebsocketByJoiningGame } from "../api";
import Header from "../components/Header";

interface IJoinGamePageProps {
  onJoinGame: () => void;
  setGameState: (gameState: IGameState) => void;
}

export default function JoinGamePage({
  onJoinGame,
  setGameState,
}: IJoinGamePageProps) {
  const [playerName, setPlayerName] = useState("");
  const [gameId, setGameId] = useState("");

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    createWebsocketByJoiningGame(gameId, playerName, setGameState);
    onJoinGame();
  }
  return (
    <>
      <Header />
      <form>
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Game name"
          onChange={(event) => setGameId(event.target.value)}
          sx={{ marginBottom: 3 }}
          variant="outlined"
        />
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Player name"
          onChange={(event) => setPlayerName(event.target.value)}
          sx={{ marginBottom: 3 }}
          variant="outlined"
        />
        <Button
          fullWidth
          disabled={!playerName || !gameId}
          onClick={handleSubmit}
          sx={{ marginBottom: 3 }}
          type="submit"
          variant="outlined"
        >
          Join game
        </Button>
        <Button fullWidth onClick={onJoinGame} variant="text">
          Back
        </Button>
      </form>
    </>
  );
}
