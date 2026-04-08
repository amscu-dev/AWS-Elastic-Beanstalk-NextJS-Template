import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";

jest.mock("@/components/FeatureTest", () => ({
  __esModule: true,
  default: () => <div>This is a feature flag</div>,
}));

jest.mock("@/components/ui/Loader", () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

jest.mock("@/features/featureA/components/PostSuspense", () => ({
  __esModule: true,
  default: () => <div>Mocked PostSuspense</div>,
}));

describe("Home Page", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    render(Home());
  });

  test("1. renders the Next.js logo with correct alt text", () => {
    const logo = screen.getByAltText("Next.js logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/next.svg");
  });

  test("2. renders the correct heading", () => {
    const heading = screen.getByRole("heading", {
      name: "To get started, edit the page.tsx file.",
    });
    expect(heading).toBeInTheDocument();
  });

  test("3. renders the Templates and Learning links with correct hrefs", () => {
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
    const deployLink = screen.getByRole("link", { name: /Deploy Now/i });
    const vercelLogo = screen.getByAltText("Vercel logomark");

    expect(deployLink).toHaveAttribute(
      "href",
      expect.stringContaining("vercel.com/new"),
    );
    expect(vercelLogo).toBeInTheDocument();
  });

  test("5. renders external links with target _blank and noopener noreferrer", () => {
    const externalLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("target") === "_blank");

    expect(externalLinks.length).toBeGreaterThan(0);
    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
