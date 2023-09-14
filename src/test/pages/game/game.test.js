import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "../../../pages/game";

jest.mock("../../../contexts/global", () => ({
  useGlobalContext: () => ({
    state: {
      user: "Pepe",
    },
    actions: {
      setUser: jest.fn(),
      logout: jest.fn(),
    },
  }),
}));

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Game", () => {
  test("renders a heading", () => {
    render(<Game />);
    expect(screen.getByTestId("game_title")).toHaveTextContent("Catch Moli");
  });
  test("the game button has the text start", () => {
    render(<Game />);
    expect(screen.getByTestId("game_button")).toHaveTextContent("START");
  });
  test("the game button after start has the text stop", async () => {
    render(<Game />);
    act(() => {
      userEvent.click(screen.getByTestId("game_button"));
    });
    await waitFor(() => expect(screen.getByTestId("game_button")).toHaveTextContent("STOP"));
  });
  test("the score inital is 0", async () => {
    render(<Game />);
    act(() => {
      userEvent.click(screen.getByTestId("game_button"));
    });
    await waitFor(() => expect(screen.getByTestId("game_button")).toHaveTextContent("STOP"));
    expect(screen.getByTestId("game_score")).toHaveTextContent("0");
  });
  test("the time inital is 20", async () => {
    render(<Game />);
    act(() => {
      userEvent.click(screen.getByTestId("game_button"));
    });
    await waitFor(() => expect(screen.getByTestId("game_button")).toHaveTextContent("STOP"));
    expect(screen.getByTestId("game_time")).toHaveTextContent("Time: 20 sec.");
  });
  test("finish the game when the user clicks on the stop button", async () => {
    render(<Game />);
    act(() => {
      userEvent.click(screen.getByTestId("game_button"));
    });
    await waitFor(() => expect(screen.getAllByTestId("game_board-cell")).toHaveLength(9));
    act(() => {
      userEvent.click(screen.getByTestId("game_button"));
    });
    await waitFor(() => expect(screen.getByTestId("game_button")).toHaveTextContent("START"));
    expect(screen.getByTestId("game_score")).toHaveTextContent("0");
    expect(screen.queryByTestId("game_board-cell")).not.toBeInTheDocument();
    expect(screen.getByTestId("game_button")).toHaveTextContent("START");
  });
  test("the user can logout", async () => {
    render(<Game />);
    act(() => {
      userEvent.click(screen.getByTestId("game-header-user"));
    });
    await waitFor(()=>expect(screen.getByTestId("menu-item--logout")).toBeInTheDocument());
    act(() => {
      userEvent.click(screen.getByTestId("menu-item--logout"));
    });
    expect(mockedNavigate).toHaveBeenCalledWith("/home");
  });
});
