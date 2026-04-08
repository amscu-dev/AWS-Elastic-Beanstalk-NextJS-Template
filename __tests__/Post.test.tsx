import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Post from "@/features/featureA/components/Post";
import { useGetPostById } from "@/features/featureA/services/post.hooks";

jest.mock("@/features/featureA/services/post.hooks", () => ({
  useGetPostById: jest.fn(),
}));

describe("Post", () => {
  test("renders post data correctly", () => {
    (useGetPostById as jest.Mock).mockReturnValue({
      data: {
        id: 1,
        title: "Test title",
        userId: 10,
        completed: true,
      },
    });

    render(<Post />);

    expect(screen.getByText("ID: 1")).toBeInTheDocument();
    expect(screen.getByText("Title: Test title")).toBeInTheDocument();
    expect(screen.getByText("User ID: 10")).toBeInTheDocument();
    expect(screen.getByText("Completed: Yes")).toBeInTheDocument();
  });
});
