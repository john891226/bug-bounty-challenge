import { render, screen, within } from "@testing-library/react";

import "../../i18n";
import Home from "./index";

describe("Home", () => {
  it("renders the word 'known' in bold within the introduction text", () => {
    render(<Home />);

    const introText = screen.getByRole("heading", { level: 6 });
    const boldKnownWord = within(introText).getByText("known", {
      selector: "b"
    });

    expect(boldKnownWord).toBeInTheDocument();
  });
});
