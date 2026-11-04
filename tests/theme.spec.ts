import { expect, test } from "@playwright/test";

const paperLight = "rgb(251, 246, 234)";
const paperDark = "rgb(39, 34, 29)";

test.describe("theme toggle", () => {
  test.use({ colorScheme: "light" });

  test("follows the system, switches, persists and returns to system", async ({
    page,
  }) => {
    await page.goto("/");
    const html = page.locator("html");
    const body = page.locator("body");
    await expect(html).not.toHaveAttribute("data-theme");
    await expect(body).toHaveCSS("background-color", paperLight);
    await expect(page.locator('[data-icon="moon"]')).toBeVisible();
    await expect(page.locator('[data-icon="sun"]')).toBeHidden();

    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await expect(page.locator('[data-icon="sun"]')).toBeVisible();
    await expect(page.locator('[data-icon="moon"]')).toBeHidden();
    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect(body).toHaveCSS("background-color", paperDark);

    // The choice survives a reload and is applied before hydration.
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect(
      page.getByRole("button", { name: "Switch to light mode" }),
    ).toBeVisible();

    // Choosing the system theme again removes the override.
    await page.getByRole("button", { name: "Switch to light mode" }).click();
    await expect(html).not.toHaveAttribute("data-theme");
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBeNull();
    await expect(body).toHaveCSS("background-color", paperLight);
  });

  test("stored theme is applied before first paint", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "dark"));
    // Block all scripts except inline ones: the inline theme script alone
    // must set the theme.
    await page.route("**/*.js", (route) => route.abort());
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("body")).toHaveCSS("background-color", paperDark);
  });
});

test.describe("system dark mode", () => {
  test.use({ colorScheme: "dark" });

  test("uses dark colors without a stored choice", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).toHaveCSS("background-color", paperDark);
    await expect(
      page.getByRole("button", { name: "Switch to light mode" }),
    ).toBeVisible();
    await expect(page.locator('[data-icon="sun"]')).toBeVisible();
    await expect(page.locator('[data-icon="moon"]')).toBeHidden();
  });
});
