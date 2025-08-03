import random
import string
from datetime import datetime
from typing import Any, Dict, Optional

from src import exceptions
from src.config import Config


class Player:
    def __init__(
        self, name: str, role: Optional[str] = None, status: Optional[str] = None
    ):
        self.name = name
        self.role = role
        self.status = status


class Game:
    def __init__(self, game_id: str):
        self.id = game_id
        self.available_locations = Config["locations"]
        self.location: None | Any = None
        self.players: Dict[str, Player] = {}
        self.status = "LOBBY"
        self.start_time: None | str = None

    def export(self, user_id):
        available_location_names = [
            location["name"] for location in self.available_locations
        ]
        location_name = self.location.get("name") if self.location else None
        player_names = [player.name for player in self.players.values()]
        game_state = {
            "id": self.id,
            "available_locations": sorted(available_location_names),
            "location": location_name,
            "players": player_names,
            "status": self.status,
            "start_time": self.start_time,
            "current_player": self.players[user_id].__dict__,
        }

        if game_state["current_player"]["role"] == "Spy":  # type: ignore
            game_state["location"] = "?"

        return game_state

    def export_all(self):
        game_state = {
            "id": self.id,
            # "available_locations": self.available_locations,
            "location": self.location,
            "players": [player.name for player in self.players.values()],
            "status": self.status,
            "start_time": self.start_time,
        }
        return game_state

    def add_player(self, user_id: str, player_name: str):
        if self.player_name_exists(player_name):
            raise exceptions.PlayerNameAlreadyExistsException(self.id, player_name)
        self.players[user_id] = Player(player_name)

    def remove_player(self, user_id: str):
        if user_id not in self.players:
            raise exceptions.PlayerNotFoundException(self.id, user_id)
        # TODO Check if game is running and if player is spy, and notify players that spy left?
        del self.players[user_id]

    def player_name_exists(self, player_name: str):
        return any([player_name == player.name for player in self.players.values()])

    def set_player_status(self, user_id: str, status: str):
        if user_id not in self.players:
            raise exceptions.PlayerNotFoundException(self.id, user_id)
        self.players[user_id].status = status
        self.players[user_id].name = self.players[user_id].name + f" ({status})"

    def start(self):
        self.location = random.choice(self.available_locations)

        roles = self.location["unique_roles"] + self.location["nonunique_roles"]
        random.shuffle(roles)

        spy = random.choice(list(self.players.keys()))
        for player_id, values in self.players.items():
            if not roles:
                roles = self.location["nonunique_roles"]
                random.shuffle(roles)
            if player_id == spy:
                values.role = "Spy"
            else:
                values.role = roles.pop(0)

        self.start_time = str(datetime.now())
        self.status = "RUNNING"
