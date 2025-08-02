import { SyntheticEvent, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { IGameState, createGame } from "../api";
import { createWebsocketByJoiningGame } from "../api";
import Header from "../components/Header";

interface ICreateGameProps {
  setGameState: (gameState: IGameState) => void;
  onCreateGame: () => void;
}

export default function CreateGame({
  setGameState,
  onCreateGame,
}: ICreateGameProps) {
  const [playerName, setPlayerName] = useState("");

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const json = await createGame();
    createWebsocketByJoiningGame(json.game_id, playerName, setGameState);
    onCreateGame();
  }
  return (
    <>
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
    </>
  );
}
