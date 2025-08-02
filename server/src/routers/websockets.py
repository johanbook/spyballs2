from fastapi import (
    APIRouter,
    Cookie,
    WebSocket,
    WebSocketDisconnect,
)
import json
import logging

from src import SUPERVISOR

router = APIRouter(prefix="/api/ws")


@router.websocket("/join")
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
        if hasattr(exception, "message"):
            await websocket.send_text(json.dumps({"error": exception.message}))  # type: ignore
        else:
            await websocket.send_text(json.dumps({"error": "Something went wrong"}))
