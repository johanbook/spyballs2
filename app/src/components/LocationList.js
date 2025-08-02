import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RoomIcon from "@mui/icons-material/Room";

function LocationListItem({ location }) {
  const [marked, setMarked] = React.useState(false);
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => setMarked(!marked)}>
        <ListItemIcon>
          <RoomIcon />
        </ListItemIcon>
        <ListItemText
          primary={location}
          sx={{ textDecoration: marked ? "line-through" : "none" }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default function LocationList({ locations }) {
  return (
    <React.Fragment>
      <List>
        {locations.map((location) => (
          <LocationListItem key={location} location={location} />
        ))}
      </List>
    </React.Fragment>
  );
}
