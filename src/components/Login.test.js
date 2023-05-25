import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import Login from "./Login";

describe("Login", () => {
  it("will match the snapshot", () => {
    const view = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );

    let submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(screen.getByTestId("alert")).toBeInTheDocument();
    expect(view).toMatchSnapshot();
  });
});
