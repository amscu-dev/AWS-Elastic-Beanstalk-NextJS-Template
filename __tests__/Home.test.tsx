import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "@/app/page";

jest.mock("@/components/FeatureTest", () => ({
  default: () => <div>This is a feature flag</div>,
  __esModule: true,
}));

jest.mock("@/components/ui/Loader", () => ({
  default: () => <div>Loading...</div>,
  __esModule: true,
}));

const setup = () => {
  jest.clearAllMocks();
  render(<Home />);
};

describe("Home Page", () => {
  beforeEach(() => {});

  test("1. renders the Next.js logo with correct alt text", () => {
    setup();
    const logo = screen.getByAltText("Next.js logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/next.svg");
  });

  test("2. renders the correct heading", () => {
    setup();
    const heading = screen.getByRole("heading", {
      name: "To get started, edit the page.tsx file.",
    });
    expect(heading).toBeInTheDocument();
  });

  test("3. renders the Templates and Learning links with correct hrefs", () => {
    setup();
    const templatesLink = screen.getByRole("link", { name: "Templates" });
    const learningLink = screen.getByRole("link", { name: "Learning" });

    expect(templatesLink).toHaveAttribute(
      "href",
      expect.stringContaining("vercel.com/templates"),
    );
    expect(learningLink).toHaveAttribute(
      "href",
      expect.stringContaining("nextjs.org/learn"),
    );
  });

  test("4. renders the Deploy Now link with correct href and Vercel logo", () => {
    setup();
    const deployLink = screen.getByRole("link", { name: /Deploy Now/i });
    const vercelLogo = screen.getByAltText("Vercel logomark");

    expect(deployLink).toHaveAttribute(
      "href",
      expect.stringContaining("vercel.com/new"),
    );
    expect(vercelLogo).toBeInTheDocument();
  });

  test("5. renders external links with target _blank and noopener noreferrer", () => {
    setup();
    const externalLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("target") === "_blank");

    expect(externalLinks.length).toBeGreaterThan(0);
    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
