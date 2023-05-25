import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import Nav from "./Nav";


describe("Nav", () => {
  it("will render properly", () => {
    const view = render(
      <MemoryRouter>
        <Provider store={store}>
          <Nav />
        </Provider>
      </MemoryRouter>
    );
    expect(view).toMatchSnapshot();
  });

  it("will have expected options", async () => {
    const { findByText } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Nav />
        </Provider>
      </MemoryRouter>
    );

    expect(await findByText("Home")).toBeInTheDocument();
    expect(await findByText("Leaderboard")).toBeInTheDocument();
    expect(await findByText("New")).toBeInTheDocument();
    expect(await findByText("Logout")).toBeInTheDocument();
  });
});
