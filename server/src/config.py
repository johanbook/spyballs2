import json
import logging
import os

CONFIG_PATH = os.environ.get("CONFIG_PATH", "./settings.json")

with open(CONFIG_PATH, "r", encoding="utf-8") as file:
    Config = json.load(file)


logging.basicConfig(format="%(levelname)s:\t%(message)s", level=logging.DEBUG)
logging.debug(f"Configurations loaded from file '{CONFIG_PATH}'")
