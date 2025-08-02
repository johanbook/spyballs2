import * as React from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import PlayerList from "../components/PlayerList";

function Game({ game }: { game: any }) {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default function Admin() {
  const [games, setGames] = React.useState([]);

  async function getGames() {
    const resp = await fetch("/api/game/list");
    const json = await resp.json();
    setGames(Object.values(json));
  }

  React.useEffect(() => {
    getGames();
  }, []);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
