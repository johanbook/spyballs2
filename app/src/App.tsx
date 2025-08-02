import * as React from "react";
import { Toaster } from "react-hot-toast";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
