import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import * as ws from "../websocket";
import LocationList from "../components/LocationList";
import PlayerList from "../components/PlayerList";
import PlayerIdentity from "../components/PlayerIdentity";

export default function GameScreen({ gameState }) {
  function onLeaveGame() {
    ws.leaveGame();
  }

  return (
    <React.Fragment>
      <PlayerIdentity
        location={gameState.location}
        role={gameState.current_player.role}
      />

      <Typography>Players</Typography>
      <PlayerList players={gameState.players} />

      <Typography>Available locations</Typography>
      <LocationList locations={gameState.available_locations} />

      <Button fullWidth onClick={onLeaveGame} variant="outlined">
        Leave Game
      </Button>
    </React.Fragment>
  );
}
