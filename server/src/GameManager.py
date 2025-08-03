import json
import logging
from typing import Dict, Optional

from fastapi import WebSocket

from src.Game import Game


class GameManager:
    """GameManager is responsible for handling the connections of a game"""

    def __init__(self, game_id):
        self.game_id: str = game_id
        self.game: Game = Game(game_id)
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, user_id: str, websocket: WebSocket):
        """Connect a player to the game"""
        self.active_connections[user_id] = websocket
        logging.debug(
            f"User websocket added. List of active connections: {self.active_connections.keys()}"
        )

    async def remove_websocket(self, user_id: str):
        """Disconnect a player from a game"""
        logging.debug(f"Removing websocket for user_id '{user_id}'")
        del self.active_connections[user_id]

    async def send_message(self, user_id: str, message: str):
        """Send message to a connection by id"""
        logging.debug(f"Sending message to user_id '{user_id}'. \nMessage: {message}")
        await self.active_connections[user_id].send_text(message)

    async def send_json(self, user_id: str, data):
        """Send data as json to connection"""
        await self.send_message(user_id, json.dumps(data))

    async def broadcast(self, message: str):
        """Broadcast message to all connections"""
        for user_id in self.active_connections.keys():
            await self.send_message(user_id, message)

    async def broadcast_json(self, data):
        """Broadcast data as json to all connections"""
        await self.broadcast(json.dumps(data))

    async def broadcast_individual_gamestates(self, message: Optional[str] = None):
        """Broadcast current game state to all players"""
        for user_id in self.active_connections.keys():
            await self.send_json(
                user_id,
                {
                    "game_state": self.game.export(user_id),
                    "message": message,
                },
            )
