import { expect, test } from "@playwright/test";

// The own handwriting font must load and fall back to the text font, not
// to `cursive` (brief, section 3).
test("margin note uses the own handwriting font", async ({ page }) => {
  await page.goto("/");
  const note = page.getByText("still sketching");
  await expect(note).toBeVisible();

  const family = await note.evaluate((el) => getComputedStyle(el).fontFamily);
  expect(family).toMatch(/^sahanHand, Geist/);
  expect(family).not.toContain("cursive");

  const loaded = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts].some(
      (font) => font.family === "sahanHand" && font.status === "loaded",
    );
  });
  expect(loaded).toBe(true);
});

test("creative outlet heading is handwritten and large", async ({ page }) => {
  await page.goto("/creative");
  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toHaveCSS("font-family", /^sahanHand/);
  const size = await heading.evaluate((el) =>
    parseFloat(getComputedStyle(el).fontSize),
  );
  expect(size).toBeGreaterThanOrEqual(32);
});
