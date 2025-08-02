import * as notifications from "../services/notifications";

export interface IGameState {
  available_locations: string[];
  current_player: { role: string };
  location: string;
  id: string;
  players: string[];
  status: string;
}

export async function createGame() {
  const response = await fetch(`/api/game/create`, {
    method: "POST",
  });

  if (!response.ok) {
    alert("Failed to create game");
    return;
  }

  const json = await response.json();
  return json;
}

const PROTOCOL = window.location.protocol === "https" ? "wss" : "ws";

export let WEBSOCKET = null;

export function createWebsocket(
  url: string,
  setGameState: (state: IGameState) => void,
) {
  WEBSOCKET = new WebSocket(url);

  WEBSOCKET.onclose = function () {
    setGameState(null);
    //notifications.error("Lost connection to server");
  };

  WEBSOCKET.onerror = function (event) {
    if (event.message) {
      notifications.error(`Encountered error: ${event.message}`);
    } else {
      notifications.error(`Something went wrong :(`);
    }
  };

  WEBSOCKET.onmessage = function (event) {
    const json = JSON.parse(event.data);
    console.log(json);

    if (json.error) {
      notifications.error(json.error);
    }

    if (json.message) {
      notifications.info(json.message);
    }

    if (json.game_state !== undefined) {
      setGameState(json.game_state);
    }
  };
  return WEBSOCKET;
}

export function createWebsocketByJoiningGame(
  gameId: string,
  playerName: string,
  setGameState: (state: IGameState) => void,
) {
  createWebsocket(
    `${PROTOCOL}://${window.location.host}/api/ws/join?game_id=${gameId}&player_name=${playerName}`,
    setGameState,
  );
}

export function leaveGame() {
  WEBSOCKET.send("LEAVE_GAME");
}

export function startGame() {
  WEBSOCKET.send("START_GAME");
}
