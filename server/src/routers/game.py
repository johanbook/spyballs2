from fastapi import APIRouter

from src import SUPERVISOR

router = APIRouter(prefix="/api/game")


@router.post("/create", status_code=201)
def create_game():
    game_id = SUPERVISOR.create_game()
    return {"game_id": game_id}


@router.get("/list", status_code=201)
def list_games():
    games = {
        game_code: game_manager.game.export_all()
        for game_code, game_manager in SUPERVISOR.games.items()
    }
    return games
