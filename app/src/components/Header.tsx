import React from "react";

import Typography from "@mui/material/Typography";

export default function Header(props) {
  return (
    <Typography
      align="center"
      mx={{ marginBottom: "8vh", marginTop: "15vh" }}
      variant="h3"
      {...props}
    >
      Spyballs
    </Typography>
  );
}
