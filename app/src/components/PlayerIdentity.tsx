import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface IPlayerIdentityProps {
  location: string;
  role: string;
}

export function Identity({ location, role }: IPlayerIdentityProps) {
  if (role === "Spy") {
    return (
      <React.Fragment>
        <Typography align="center" variant="h6">
          You are the
        </Typography>
        <Typography align="center" gutterBottom variant="h3">
          Spy
        </Typography>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Typography align="center" variant="h6">
        You are a <b>{role}</b>
      </Typography>
      <Typography align="center" gutterBottom variant="h3">
        {location}
      </Typography>
    </React.Fragment>
  );
}

export function Hidden() {
  return (
    <React.Fragment>
      <Typography align="center" gutterBottom variant="h3">
        ?
      </Typography>
    </React.Fragment>
  );
}

export default function PlayerIdentity({
  location,
  role,
}: IPlayerIdentityProps) {
  const [hidden, setHidden] = React.useState(true);
  return (
    <Box
      onClick={() => setHidden(!hidden)}
      sx={{ border: "1px solid white", margin: 1, padding: 2 }}
    >
      {hidden ? <Hidden /> : <Identity location={location} role={role} />}
      <Typography align="center" color="textSecondary" variant="h6">
        Tap to {hidden ? "reveal" : "hide"} identity
      </Typography>
    </Box>
  );
}
