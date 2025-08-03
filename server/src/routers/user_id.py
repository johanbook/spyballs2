from typing import Optional

from fastapi import APIRouter, Cookie, Response

from src import utils

router = APIRouter(prefix="/api")


@router.get("/ensure_user_id")
def create_cookie(response: Response, user_id: Optional[str] = Cookie(None)):
    if not user_id:
        response.set_cookie(key="user_id", value=utils.generate_user_id())
    return None
