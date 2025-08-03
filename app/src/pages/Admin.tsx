import { useEffect, useState } from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { IGame, getGameList } from "../api";
import PlayerList from "../components/PlayerList";

function Game({ game }: { game: IGame }) {
  return (
    <>
      <ListItem>
        <ListItemText
          primary={`${game.id} (${game.status})`}
          secondary={game.location?.name}
        />
      </ListItem>
      <List disablePadding>
        <PlayerList players={game.players} />
      </List>
      <Divider />
    </>
  );
}

export default function Admin() {
  const [games, setGames] = useState<IGame[]>([]);

  async function getGames() {
    const games = await getGameList();
    setGames(games);
  }

  useEffect(() => {
    getGames();
  }, []);

  return (
    <>
      <Typography
        align="center"
        mx={{ marginBottom: "1vh", marginTop: "6vh" }}
        variant="h3"
      >
        Admin page
      </Typography>
      {games.length === 0 && <Typography>No active games</Typography>}

      <List>
        {games.map((game) => (
          <Game game={game} key={game.id} />
        ))}
      </List>
    </>
  );
}
