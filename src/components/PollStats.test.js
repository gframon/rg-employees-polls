import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PollStats from "./PollStats";

describe("PollStats", () => {
  const testVotes = 1;
  const testPercentage = 100;
  const testSelection = false;

  it("will render correctly", () => {
    const view = render(
      <PollStats
        votes={testVotes}
        percentage={testPercentage}
        userSelection={testSelection}
      />
    );
    const card = screen.getByTestId("pollStats");
    expect(card).toBeInTheDocument();
    expect(view).toMatchSnapshot();
  });

  it("will display the data", () => {
    render(
      <PollStats
        votes={testVotes}
        percentage={testPercentage}
        userSelection={testSelection}
      />
    );
    const card = screen.getByTestId("pollStats");
    expect(card).toHaveTextContent("Votes received");
    expect(card).toHaveTextContent("Percentage received");
    expect(card).toHaveTextContent("100.00%")
  });
});
