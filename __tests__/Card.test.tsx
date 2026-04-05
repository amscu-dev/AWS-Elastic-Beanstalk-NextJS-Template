// Card.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "@/components/Card";

describe("Card", () => {
  test("renders title", () => {
    render(<Card title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("renders description", () => {
    render(<Card title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  test("renders title inside an h2 element", () => {
    render(<Card title="Test Title" description="Test Description" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Test Title",
    );
  });

  test("renders description inside a paragraph element", () => {
    render(<Card title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Description").tagName).toBe("P");
  });

  test("renders correctly with special characters", () => {
    render(<Card title="Title & <Special>" description="Desc > 100%" />);
    expect(screen.getByText("Title & <Special>")).toBeInTheDocument();
    expect(screen.getByText("Desc > 100%")).toBeInTheDocument();
  });

  test("renders correctly with empty strings", () => {
    render(<Card title="" description="" />);
    expect(screen.getByRole("heading", { level: 2 })).toBeEmptyDOMElement();
  });
});
