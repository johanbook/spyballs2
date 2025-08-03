import logging
import os

import yaml

CONFIG_PATH = os.environ.get("CONFIG_PATH", "./src/settings.yaml")
Config = yaml.load(open(CONFIG_PATH, "r"), Loader=yaml.Loader)

logging.basicConfig(format="%(levelname)s:\t%(message)s", level=logging.DEBUG)
logging.debug(f"Configurations loaded from file '{CONFIG_PATH}'")
