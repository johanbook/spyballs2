import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createWebsocketByJoiningGame } from "../websocket";
import Header from "../components/Header";

export default function JoinGame({ onJoinGame, setGameState }) {
  const [playerName, setPlayerName] = React.useState();
  const [gameId, setGameId] = React.useState();

  async function handleSubmit(event) {
    event.preventDefault();
    createWebsocketByJoiningGame(gameId, playerName, setGameState);
    onJoinGame();
  }
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
