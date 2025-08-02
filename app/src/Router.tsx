import { useState } from "react";

import { IGameState } from "./api";
import Admin from "./pages/Admin";
import CreateGame from "./pages/CreateGame";
import GameScreen from "./pages/GameScreen";
import HowToPlay from "./pages/HowToPlay";
import JoinGame from "./pages/JoinGame";
import LandingPage from "./pages/LandingPage";
import Lobby from "./pages/Lobby";

export default function Router() {
  const [gameState, setGameState] = useState<IGameState | undefined>();
  const [createGame, setCreateGame] = useState(false);
  const [joinGame, setJoinGame] = useState(false);
  const [howToPlay, setHowToPlay] = useState(false);

  if (window.location.href.includes("?admin")) {
    return <Admin />;
  }

  if (createGame) {
    return (
      <CreateGame
        onCreateGame={() => setCreateGame(false)}
        setGameState={setGameState}
      />
    );
  }
  if (joinGame) {
    return (
      <JoinGame
        onJoinGame={() => setJoinGame(false)}
        setGameState={setGameState}
      />
    );
  }

  if (howToPlay) {
    return <HowToPlay onClosePage={() => setHowToPlay(false)} />;
  }

  if (gameState?.status === "LOBBY") {
    return <Lobby gameState={gameState} />;
  }
  if (gameState?.status === "RUNNING") {
    return <GameScreen gameState={gameState} />;
  }

  return (
    <LandingPage
      onCreateGame={() => setCreateGame(true)}
      onJoinGame={() => setJoinGame(true)}
      onShowHowToPlay={() => setHowToPlay(true)}
    />
  );
}
