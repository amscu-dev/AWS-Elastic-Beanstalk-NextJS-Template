import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useGetPostById } from "@/features/featureA/services/post.hooks";
import Post from "@/features/featureA/components/Post";

jest.mock("@/features/featureA/services/post.hooks", () => ({
  useGetPostById: jest.fn(),
}));

jest.mock("@uidotdev/usehooks", () => ({
  useIsClient: () => true,
}));

describe("Post", () => {
  test("renders post data correctly", () => {
    (useGetPostById as jest.Mock).mockReturnValue({
      data: {
        title: "Test title",
        completed: true,
        userId: 10,
        id: 1,
      },
    });

    render(<Post id={1} />);

    expect(screen.getByText("ID: 1")).toBeInTheDocument();
    expect(screen.getByText("Title: Test title")).toBeInTheDocument();
    expect(screen.getByText("User ID: 10")).toBeInTheDocument();
    expect(screen.getByText("Completed: Yes")).toBeInTheDocument();
  });
});
