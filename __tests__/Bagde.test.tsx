import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Badge from "@/components/Bagde";

describe("Badge", () => {
  test("renders label", () => {
    render(<Badge label="New" />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });
});
