import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Badge from "@/components/Badge";

describe("Badge", () => {
  test("renders label", () => {
    render(<Badge label="New" />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  test("renders with default variant", () => {
    render(<Badge label="Default" />);
    expect(screen.getByTestId("badge")).toHaveClass(
      "bg-gray-100",
      "text-gray-800",
    );
  });

  test("renders with success variant", () => {
    render(<Badge label="Active" variant="success" />);
    expect(screen.getByTestId("badge")).toHaveClass(
      "bg-green-100",
      "text-green-800",
    );
  });

  test("renders with warning variant", () => {
    render(<Badge label="Pending" variant="warning" />);
    expect(screen.getByTestId("badge")).toHaveClass(
      "bg-yellow-100",
      "text-yellow-800",
    );
  });

  test("renders with danger variant", () => {
    render(<Badge label="Error" variant="danger" />);
    expect(screen.getByTestId("badge")).toHaveClass(
      "bg-red-100",
      "text-red-800",
    );
  });
});
