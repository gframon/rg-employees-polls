import { render } from "@testing-library/react";
import React from "react";
import NotFound from "./NotFound";

describe("NotFound", () => {
  it("matches the snapshot", () => {
    var view = render(<NotFound />);

    expect(view).toMatchSnapshot();
  });
});
