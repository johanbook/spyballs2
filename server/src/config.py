import json
import logging
import os
import sys
from typing import List

from pydantic import BaseModel, ValidationError

logging.basicConfig(format="%(levelname)s:\t%(message)s", level=logging.DEBUG)


class Location(BaseModel):
    name: str
    unique_roles: List[str]
    nonunique_roles: List[str]


class Settings(BaseModel):
    locations: List[Location]


SETTINGS_PATH = os.environ.get("SETTINGS_PATH", "./settings.json")

try:
    with open(SETTINGS_PATH, "r", encoding="utf-8") as file:
        config_data = json.load(file)
        SETTINGS = Settings.parse_obj(config_data)
except FileNotFoundError:
    logging.critical(f"Settings file not found at '{SETTINGS_PATH}'")
    sys.exit()
except ValidationError as error:
    logging.critical(f"Invalid settings in file '{SETTINGS_PATH}':\n{error}")
    sys.exit()


logging.debug(f"Settings loaded from file '{SETTINGS_PATH}'")
