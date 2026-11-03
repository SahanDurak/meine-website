import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", navLabel: "Home", heading: "Hallo, ich bin Sahan." },
  { path: "/about", navLabel: "Über mich", heading: "Über mich" },
  { path: "/blog", navLabel: "Blog", heading: "Blog" },
  { path: "/creative", navLabel: "Creative", heading: "Creative Outlet" },
] as const;

test.describe("pages load", () => {
  for (const page of pages) {
    test(`${page.path} renders its heading`, async ({ page: browserPage }) => {
      const response = await browserPage.goto(page.path);
      expect(response?.status()).toBe(200);
      await expect(
        browserPage.getByRole("heading", { level: 1, name: page.heading }),
      ).toBeVisible();
    });
  }
});

test("navigation links reach every page", async ({ page: browserPage }) => {
  await browserPage.goto("/");
  const nav = browserPage.getByRole("navigation", { name: "Hauptnavigation" });

  for (const page of pages) {
    await nav.getByRole("link", { name: page.navLabel, exact: true }).click();
    await expect(browserPage).toHaveURL(page.path);
    await expect(
      browserPage.getByRole("heading", { level: 1, name: page.heading }),
    ).toBeVisible();
  }
});
