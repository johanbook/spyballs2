import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AccessibleIcon from "@mui/icons-material/Accessible";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";

function PlayerIcon({ name }) {
  switch (name.toLowerCase()) {
    case "babyface":
    case "erik & agnes":
    case "erik och agnes":
    case "erik agnes":
      return <ChildFriendlyIcon />;
    case "jennie":
    case "mama":
      return <PregnantWomanIcon />;
    case "jacob":
    case "wheelchair mc.wheelie boy":
      return <AccessibleIcon />;
    default:
      return <AccessibilityNewIcon />;
  }
}

function PlayerListItem({ player }) {
  const [marked, setMarked] = React.useState(false);
  return (
    <ListItem key={player} disablePadding>
      <ListItemButton onClick={() => setMarked(!marked)}>
        <ListItemIcon>
          <PlayerIcon name={player} />
        </ListItemIcon>
        <ListItemText
          primary={player}
          sx={{ textDecoration: marked ? "line-through" : "none" }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default function PlayerList({ players }) {
  return (
    <React.Fragment>
      <List>
        {players.map((player) => (
          <PlayerListItem key={player} player={player} />
        ))}
      </List>
    </React.Fragment>
  );
}
