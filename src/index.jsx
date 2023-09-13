import React from "react";
import ReactDOM from "react-dom/client";
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme, alpha } from "@mui/material/styles";
import GlobalContextProvider from "./contexts/global";
import Home from "./pages/home";
import Game from "./pages/game";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/home" exact element={<Home />} />
      <Route path="/game" exact element={<Game />} />
      <Route path="*" element={<Home />} />
    </>,
  ),
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#512603",
      light: alpha("#512603", 0.5),
      dark: alpha("#512603", 0.5),
    },
  },
  typography: {
    fontFamily: ["san-serif", "Gluten"],
  },
});

const App = () => {
  return (
    <GlobalContextProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </GlobalContextProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
