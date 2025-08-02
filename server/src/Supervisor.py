import logging

from src import exceptions, utils
from src.GameManager import GameManager


class Supervisor:
    """Class for maintaining all currently running games"""

    def __init__(self):
        self.games: Dict[str, GameManager] = {}

    def get_game(self, game_id: str):
        """Get game by id"""
        if game_id not in self.games:
            raise exceptions.GameNotFoundException(game_id)
        return self.games[game_id]

    def create_game(self):
        """Create a game"""
        game_id = utils.generate_game_id()
        self.games.update({game_id: GameManager(game_id)})
        logging.debug(f"Created game with id '{game_id}'")
        return game_id


SUPERVISOR = Supervisor()
