import React from "react";
import ReactDOM from "react-dom/client";
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from "react-router-dom";
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

const App = () => {
  return (
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
