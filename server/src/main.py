from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI

from src import exceptions
from src.routers import game, user_id, websockets

app = FastAPI()

app.include_router(game.router)
app.include_router(user_id.router)
app.include_router(websockets.router)

app.mount("/", StaticFiles(directory="dist", html=True), name="app")

exceptions.add_exception_handlers(app)
