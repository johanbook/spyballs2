import json
import logging
import string
from typing import Optional
import traceback

from fastapi import (
    Cookie,
    FastAPI,
    HTTPException,
    Response,
    WebSocket,
    WebSocketDisconnect,
)

from src import SUPERVISOR, exceptions, utils
from src.routers import game

app = FastAPI()
app.include_router(game.router)
exceptions.add_exception_handlers(app)


@app.get("/api/ping")
def ping():
    return "Pong"


@app.get("/api/ensure_user_id")
def create_cookie(response: Response, user_id: Optional[str] = Cookie(None)):
    if not user_id:
        response.set_cookie(key="user_id", value=utils.generate_user_id())
    return None


@app.websocket("/api/ws/join")
async def join_game(
    game_id: str,
    player_name: str,
    websocket: WebSocket,
    user_id: str = Cookie(None),
):
    await websocket.accept()

    try:
        game_id = game_id.upper()
        game_manager = SUPERVISOR.get_game(game_id)
        await game_manager.connect(user_id, websocket)
        game_manager.game.add_player(user_id, player_name)
        await game_manager.broadcast_individual_gamestates(
            f"{player_name} joined the game"
        )

        while True:
            data = await websocket.receive_text()
            logging.debug(f"Received message '{data}' from user id '{user_id}'")
            if data == "START_GAME":
                game_manager.game.start()
                await game_manager.broadcast_individual_gamestates(
                    f"OBOY, Game started!"
                )

            if data == "LEAVE_GAME":
                await game_manager.send_json(
                    user_id,
                    {
                        "game_state": None,
                        "message": "You have left the game.",
                    },
                )
                await game_manager.remove_websocket(user_id)
                game_manager.game.remove_player(user_id)
                await game_manager.broadcast_individual_gamestates(
                    f"{player_name} left the game."
                )
                return None
    except WebSocketDisconnect:
        logging.debug(f"Websocket disconnected: {user_id}")
        game_manager.game.set_player_status(user_id, "disconnected")
        await game_manager.remove_websocket(user_id)
        await game_manager.broadcast_individual_gamestates(
            f"{player_name} disconnected."
        )
    except Exception as exception:
        # traceback.print_exception()
        if hasattr(exception, "message"):
            await websocket.send_text(json.dumps({"error": exception.message}))  # type: ignore
        else:
            await websocket.send_text(json.dumps({"error": "Something went wrong"}))


@app.websocket("api/ws/reconnect")
async def reconnect(
    websocket: WebSocket,
    user_id: str = Cookie(None),
):
    await websocket.accept()

    pass
