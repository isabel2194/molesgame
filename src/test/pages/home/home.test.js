import React from "react";
import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../../../pages/home";

jest.mock("../../../contexts/global", () => ({
  useGlobalContext: () => ({
    state: {
      user: "Pepe",
    },
    actions: {
      setUser: jest.fn(),
    },
  }),
}));

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const clickHomeButton = () => {
  act(() => {
    userEvent.click(screen.getByTestId("home_button"));
  });
};

describe("Home", () => {
  test("renders a heading", () => {
    render(<Home />);
    expect(screen.getByTestId("home_title")).toHaveTextContent("Catch Moli");
  });
  test("inserts the user name", () => {
    render(<Home />);
    expect(screen.getByTestId("home_username")).toBeEmptyDOMElement();
    act(() => {
      userEvent.type(screen.getByTestId("home_username"), "Pepe");
    });
    expect(screen.getByTestId("home_username")).toHaveValue("Pepe");
  });
  test("if the user name is not empty, and click in the join button, navigate to the game page", async () => {
    render(<Home />);
    act(() => {
      userEvent.type(screen.getByTestId("home_username"), "Pepe");
    });
    expect(screen.getByTestId("home_username")).toHaveValue("Pepe");
    clickHomeButton();
    expect(mockedNavigate).toHaveBeenCalledWith("/game");
  });
  test("if the user name is not empty, and press the enter key, navigate to the game page", async () => {
    render(<Home />);
    act(() => {
      userEvent.type(screen.getByTestId("home_username"), "Pepe");
    });
    expect(screen.getByTestId("home_username")).toHaveValue("Pepe");
    act(() => {
      userEvent.type(screen.getByTestId("home_username"), "{enter}");
    });
    expect(mockedNavigate).toHaveBeenCalledWith("/game");
  });
});
