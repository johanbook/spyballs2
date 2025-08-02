import React from "react";
import Typography from "@mui/material/Typography";

export default function GameName({ gameName }) {
  return (
    <div style={{ marginBottom: 20, marginTop: 15, textAlign: "center" }}>
      <Typography color="textSecondary" variant="body2">
        Use the code <b>{gameName}</b> to join this game!
      </Typography>
    </div>
  );
}
