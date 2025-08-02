import * as React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { IGameState, leaveGame, startGame } from "../api";
import GameName from "../components/GameName";
import PlayerList from "../components/PlayerList";

interface ILobbyPageProps {
  gameState: IGameState;
}

export default function LobbyPage({ gameState }: ILobbyPageProps) {
  return (
    <>
      <Typography
        align="center"
        mx={{ marginBottom: "1vh", marginTop: "6vh" }}
        variant="h3"
      >
        Lobby
      </Typography>
      <GameName gameName={gameState.id} />
      <Typography variant="h5">Players</Typography>
      <PlayerList players={gameState.players} />
      <Button
        fullWidth
        onClick={startGame}
        sx={{ marginBottom: 3 }}
        variant="outlined"
      >
        Start game
      </Button>
      <Button fullWidth onClick={leaveGame} variant="text">
        Leave game
      </Button>
    </>
  );
}
