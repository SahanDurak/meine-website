import { expect, test } from "@playwright/test";

test.describe("creative outlet video", () => {
  test("plays muted in a loop without controls", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/creative");
    await expect(
      page.getByRole("heading", { level: 2, name: "The Ball" }),
    ).toBeVisible();

    const video = page.locator("video");
    await expect(video).toHaveJSProperty("muted", true);
    await expect(video).toHaveJSProperty("loop", true);
    await expect(video).toHaveJSProperty("controls", false);
    await expect(video).toHaveAttribute("src", "/creative/the-ball.mp4");

    await page.getByRole("button", { name: "Pause animation" }).click();
    await expect(video).toHaveJSProperty("paused", true);
    await expect(
      page.getByRole("button", { name: "Play animation" }),
    ).toBeVisible();
  });

  test("shows only the last-frame still under reduced motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/creative");
    const video = page.locator("video");
    await expect(video).toHaveAttribute(
      "poster",
      "/creative/the-ball-last-frame.webp",
    );
    await expect(video).not.toHaveAttribute("src");
    await expect(video).toHaveJSProperty("paused", true);
    await expect(page.getByRole("button", { name: /animation/ })).toHaveCount(
      0,
    );
  });
});
