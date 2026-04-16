import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import AppVersion from "@/components/app-version";

jest.mock("../package.json", () => ({
  version: "1.0.0",
}));

describe("AppVersion", () => {
  test("renders correct version from package.json", () => {
    render(<AppVersion />);
    expect(screen.getByText("app-version@1.0.0")).toBeInTheDocument();
  });

  test("renders link with correct href", () => {
    render(<AppVersion />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD",
    );
  });
});
