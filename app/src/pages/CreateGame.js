import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createWebsocketByJoiningGame } from "../websocket";
import { createGame } from "../api";
import Header from "../components/Header";

export default function CreateGame({ setGameState, onCreateGame }) {
  const [playerName, setPlayerName] = React.useState();

  async function handleSubmit(event) {
    event.preventDefault();
    const json = await createGame();
    createWebsocketByJoiningGame(json.game_id, playerName, setGameState);
    onCreateGame();
  }
  return (
    <React.Fragment>
      <Header />
      <form>
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
          disabled={!playerName}
          onClick={handleSubmit}
          sx={{ marginBottom: 3 }}
          type="submit"
          variant="outlined"
        >
          Create game
        </Button>
        <Button fullWidth onClick={onCreateGame} variant="text">
          Back
        </Button>
      </form>
    </React.Fragment>
  );
}
