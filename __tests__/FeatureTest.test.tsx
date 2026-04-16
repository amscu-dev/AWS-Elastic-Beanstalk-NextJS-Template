import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import FeatureTest from "@/components/FeatureTest";
import flagsmithInstance from "@/lib/flagsmith";

jest.mock("@/lib/flagsmith", () => ({
  default: {
    getEnvironmentFlags: jest.fn(),
  },
  __esModule: true,
}));

describe("FeatureTest", () => {
  test("renders feature text when enabled", async () => {
    (flagsmithInstance.getEnvironmentFlags as jest.Mock).mockResolvedValue({
      isFeatureEnabled: jest.fn().mockReturnValue(true),
    });

    render(await FeatureTest());

    expect(screen.getByText("This is a feature flag")).toBeInTheDocument();
  });

  test("does not render feature text when disabled", async () => {
    (flagsmithInstance.getEnvironmentFlags as jest.Mock).mockResolvedValue({
      isFeatureEnabled: jest.fn().mockReturnValue(false),
    });

    render(await FeatureTest());

    expect(
      screen.queryByText("This is a feature flag"),
    ).not.toBeInTheDocument();
  });
});
