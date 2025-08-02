import * as React from "react";
import Button from "@mui/material/Button";
import Header from "../components/Header";

export default function LandingPage({
  onCreateGame,
  onJoinGame,
  onShowHowToPlay,
}) {
  return (
    <React.Fragment>
      <Header />
      <Button
        fullWidth
        onClick={onCreateGame}
        sx={{ marginBottom: 3 }}
        variant="outlined"
      >
        Create Game
      </Button>
      <Button
        fullWidth
        onClick={onJoinGame}
        sx={{ marginBottom: 3 }}
        variant="outlined"
      >
        Join Game
      </Button>
      <Button fullWidth onClick={onShowHowToPlay} variant="outlined">
        How to play
      </Button>
    </React.Fragment>
  );
}
