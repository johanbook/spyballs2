import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as ws from "../websocket";
import PlayerList from "../components/PlayerList";
import GameName from "../components/GameName";

export default function Lobby({ gameState }) {
  function onStartGame() {
    ws.startGame();
  }

  function onLeaveGame() {
    ws.leaveGame();
  }

  return (
    <React.Fragment>
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
        onClick={onStartGame}
        sx={{ marginBottom: 3 }}
        variant="outlined"
      >
        Start game
      </Button>
      <Button fullWidth onClick={onLeaveGame} variant="text">
        Leave game
      </Button>
    </React.Fragment>
  );
}
