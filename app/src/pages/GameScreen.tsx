import * as React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { IGameState, leaveGame } from "../api";
import LocationList from "../components/LocationList";
import PlayerIdentity from "../components/PlayerIdentity";
import PlayerList from "../components/PlayerList";

interface IGameScreenProps {
  gameState: IGameState;
}

export default function GameScreen({ gameState }: IGameScreenProps) {
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

      <Button fullWidth onClick={leaveGame} variant="outlined">
        Leave Game
      </Button>
    </React.Fragment>
  );
}
