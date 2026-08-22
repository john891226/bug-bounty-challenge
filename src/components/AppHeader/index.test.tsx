import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";

import "../../i18n";
import { osapiens } from "../../themes";
import { User } from "../../api/services/User/store";
import AppHeader from "./index";

const theme = osapiens.light;

const renderAppHeader = (user: User) =>
  render(
    <ThemeProvider theme={theme}>
      <AppHeader user={user} pageTitle="Home" />
    </ThemeProvider>
  );

describe("AppHeader", () => {
  it("renders the user avatar with their initials once the user is loaded", () => {
    const { container } = renderAppHeader({
      firstName: "Aria",
      lastName: "Test",
      eMail: "linda.bolt@osapiens.com"
    });

    expect(screen.getByText("AT")).toBeInTheDocument();
    expect(container.querySelector(".MuiAvatar-root")).toBeInTheDocument();
  });

  it("does not render an avatar before the user has been fetched", () => {
    const { container } = renderAppHeader({});

    expect(container.querySelector(".MuiAvatar-root")).not.toBeInTheDocument();
  });
});
