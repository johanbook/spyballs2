import * as React from "react";

import Admin from "./pages/Admin";
import LandingPage from "./pages/LandingPage";
import CreateGame from "./pages/CreateGame";
import JoinGame from "./pages/JoinGame";
import Lobby from "./pages/Lobby";
import GameScreen from "./pages/GameScreen";
import HowToPlay from "./pages/HowToPlay";

export default function Router() {
  const [gameState, setGameState] = React.useState();
  const [createGame, setCreateGame] = React.useState(false);
  const [joinGame, setJoinGame] = React.useState(false);
  const [howToPlay, setHowToPlay] = React.useState(false);

  console.log("url", window.location.href);
  if (window.location.href.includes("?admin")) {
    return <Admin />;
  }

  if (createGame) {
    return (
      <CreateGame
        gameState={gameState}
        onCreateGame={() => setCreateGame(false)}
        setGameState={setGameState}
      />
    );
  }
  if (joinGame) {
    return (
      <JoinGame
        gameState={gameState}
        onJoinGame={() => setJoinGame(false)}
        setGameState={setGameState}
      />
    );
  }

  if (howToPlay) {
    return <HowToPlay onClosePage={() => setHowToPlay(false)} />;
  }

  if (gameState?.status === "LOBBY") {
    return <Lobby gameState={gameState} setGameState={setGameState} />;
  }
  if (gameState?.status === "RUNNING") {
    return <GameScreen gameState={gameState} setGameState={setGameState} />;
  }

  return (
    <LandingPage
      onCreateGame={() => setCreateGame(true)}
      onJoinGame={() => setJoinGame(true)}
      onShowHowToPlay={() => setHowToPlay(true)}
    />
  );
}
