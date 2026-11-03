import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", navLabel: "Home", heading: "Hi, I'm Sahan." },
  { path: "/about", navLabel: "About", heading: "About" },
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
  const nav = browserPage.getByRole("navigation", { name: "Main navigation" });

  for (const page of pages) {
    await nav.getByRole("link", { name: page.navLabel, exact: true }).click();
    await expect(browserPage).toHaveURL(page.path);
    await expect(
      browserPage.getByRole("heading", { level: 1, name: page.heading }),
    ).toBeVisible();
  }
});

test("home links to every section", async ({ page: browserPage }) => {
  const sections = [
    { label: /^About/, path: "/about", heading: "About" },
    { label: /^Blog/, path: "/blog", heading: "Blog" },
    {
      label: /^Creative Outlet/,
      path: "/creative",
      heading: "Creative Outlet",
    },
  ] as const;

  for (const section of sections) {
    await browserPage.goto("/");
    await browserPage
      .getByRole("main")
      .getByRole("link", { name: section.label })
      .click();
    await expect(browserPage).toHaveURL(section.path);
    await expect(
      browserPage.getByRole("heading", { level: 1, name: section.heading }),
    ).toBeVisible();
  }
});
