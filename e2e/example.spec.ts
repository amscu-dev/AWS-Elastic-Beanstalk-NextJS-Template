import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("1. displays the Next.js logo", async ({ page }) => {
    const logo = page.getByAltText("Next.js logo");
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("src", /next\.svg/);
  });

  test("2. displays the correct heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "To get started, edit the page.tsx file.",
      }),
    ).toBeVisible();
  });

  test("3. Templates link points to the correct URL", async ({ page }) => {
    const templatesLink = page.getByRole("link", { name: "Templates" });
    await expect(templatesLink).toBeVisible();
    await expect(templatesLink).toHaveAttribute(
      "href",
      /vercel\.com\/templates/,
    );
  });

  test("4. Deploy Now button is visible and has the correct link", async ({
    page,
  }) => {
    const deployLink = page.getByRole("link", { name: /Deploy Now/i });
    await expect(deployLink).toBeVisible();
    await expect(deployLink).toHaveAttribute("href", /vercel\.com\/new/);
  });

  test("5. Documentation link opens in a new tab", async ({ page }) => {
    const docsLink = page.getByRole("link", { name: "Documentation" });
    await expect(docsLink).toBeVisible();
    await expect(docsLink).toHaveAttribute("href", /nextjs\.org\/docs/);
    await expect(docsLink).toHaveAttribute("target", "_blank");
    await expect(docsLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
