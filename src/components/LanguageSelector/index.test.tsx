import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import i18n, { FALLBACK_LANGUAGE, defaultLanguages } from "../../i18n";
import LanguageSelector from "./index";

describe("LanguageSelector", () => {
  afterEach(async () => {
    await act(async () => {
      await i18n.changeLanguage(FALLBACK_LANGUAGE);
    });
  });

  it("renders a button showing the currently selected language", () => {
    render(<LanguageSelector />);

    expect(
      screen.getByRole("button", { name: i18n.language })
    ).toBeInTheDocument();
  });

  it("lists every available language when the menu is opened", () => {
    render(<LanguageSelector />);

    userEvent.click(screen.getByRole("button", { name: i18n.language }));

    const options = screen.getAllByRole("menuitem");

    expect(options).toHaveLength(defaultLanguages.length);
    defaultLanguages.forEach((language) => {
      expect(
        screen.getByRole("menuitem", { name: i18n.t(`languages.${language}`) })
      ).toBeInTheDocument();
    });
  });

  it("marks the currently selected language as selected in the menu", () => {
    render(<LanguageSelector />);

    userEvent.click(screen.getByRole("button", { name: i18n.language }));

    const otherLanguage = defaultLanguages.find(
      (language) => language !== i18n.language
    ) as string;

    const selectedOption = screen.getByRole("menuitem", {
      name: i18n.t(`languages.${i18n.language}`)
    });
    const otherOption = screen.getByRole("menuitem", {
      name: i18n.t(`languages.${otherLanguage}`)
    });

    expect(selectedOption).toHaveClass("Mui-selected");
    expect(otherOption).not.toHaveClass("Mui-selected");
  });

  it("changes the i18n language when a menu item is selected", async () => {
    render(<LanguageSelector />);

    userEvent.click(screen.getByRole("button", { name: i18n.language }));
    userEvent.click(
      screen.getByRole("menuitem", { name: i18n.t("languages.de") })
    );

    await screen.findByRole("button", { name: "de" });
    expect(i18n.language).toBe("de");
  });
});
