from fastapi import Request
from fastapi.responses import JSONResponse


class BaseException(Exception):
    def __init__(self, message: str):
        self.message = message


class GameNotFoundException(BaseException):
    def __init__(self, game_id: str):
        self.game_id = game_id
        self.message = f"No game found with the name '{game_id}'."


class PlayerNotFoundException(BaseException):
    def __init__(self, game_id: str, user_id: str):
        self.game_id = game_id
        self.user_id = user_id
        self.message = f"No user found with id '{user_id}' within game '{game_id}'"


class PlayerNameAlreadyExistsException(BaseException):
    def __init__(self, game_id: str, player_name: str):
        self.game_id = game_id
        self.player_name = player_name
        self.message = f"A player by the name '{player_name}' already exists within game '{game_id}'"


def add_exception_handlers(app):
    @app.exception_handler(PlayerNotFoundException)
    @app.exception_handler(GameNotFoundException)
    def not_found_exception_handler(_, exc: BaseException):
        return JSONResponse(
            status_code=404,
            content={"message": exc.message},
        )

    @app.exception_handler(PlayerNameAlreadyExistsException)
    def player_name_already_exists_exception_handler(_, exc: BaseException):
        return JSONResponse(
            status_code=409,
            content={"message": exc.message},
        )
