import * as React from "react";
import { Toaster } from "react-hot-toast";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Router from "./Router";

export default function App() {
  const theme = createTheme({
    palette: { primary: { main: "rgb(255,255,255)" }, mode: "dark" },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Router />
        <Toaster position="top-center" />
      </Container>
    </ThemeProvider>
  );
}
