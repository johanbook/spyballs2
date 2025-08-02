import random
import string


def generate_game_id():
    return "".join(random.choices(string.ascii_uppercase, k=4))


def generate_user_id():
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=10))
