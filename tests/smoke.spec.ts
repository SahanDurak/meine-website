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

test.describe("about page", () => {
  test("shows every section", async ({ page }) => {
    await page.goto("/about");
    for (const name of [
      "Projects",
      "Career",
      "Education",
      "Interests",
      "Contact",
    ]) {
      await expect(
        page.getByRole("heading", { level: 2, name, exact: true }),
      ).toBeAttached();
    }
  });

  test("external links open safely in a new tab", async ({ page }) => {
    await page.goto("/about");
    const github = page
      .getByRole("main")
      .getByRole("link", { name: /github\.com\/SahanDurak/ });
    await expect(github).toHaveAttribute(
      "href",
      "https://github.com/SahanDurak",
    );
    await expect(github).toHaveAttribute("target", "_blank");
    await expect(github).toHaveAttribute("rel", "noopener noreferrer");

    const external = page.locator('main a[target="_blank"]');
    for (const link of await external.all()) {
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  test("shows no placeholders", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("main")).not.toContainText(
      /TODO|example\.com/i,
    );
  });

  test("e-mail can be opened and copied", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/about");
    const mail = page.locator('main a[href^="mailto:"]');
    await expect(mail).toHaveCount(1);
    const address = (await mail.getAttribute("href"))!.replace("mailto:", "");

    await page.getByRole("button", { name: "Copy e-mail address" }).click();
    await expect(page.getByText("Copied", { exact: true })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      address,
    );
  });

  test("links to The Ball in the creative outlet", async ({ page }) => {
    await page.goto("/about");
    await page
      .getByRole("main")
      .getByRole("link", { name: /Creative Outlet/ })
      .click();
    await expect(page).toHaveURL("/creative");
  });
});

test.describe("home underline under robotics", () => {
  for (const width of [375, 768, 1280]) {
    test(`sits right under the word at ${width} px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
      const box = await page
        .getByRole("main")
        .getByText("robotics", { exact: true })
        .evaluate((el) => {
          const range = document.createRange();
          range.selectNodeContents(el.firstChild!);
          const text = range.getBoundingClientRect();
          const line = el.querySelector("svg")!.getBoundingClientRect();
          return {
            left: line.left - text.left,
            right: line.right - text.right,
            gap: line.top - text.bottom,
          };
        });
      expect(Math.abs(box.left)).toBeLessThanOrEqual(1);
      expect(Math.abs(box.right)).toBeLessThanOrEqual(1);
      // Directly under the letters, not drifted towards the next line.
      expect(box.gap).toBeGreaterThanOrEqual(-4);
      expect(box.gap).toBeLessThanOrEqual(4);
    });
  }
});

test.describe("home portrait", () => {
  for (const width of [375, 1280]) {
    test(`is loaded and fits the page at ${width} px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const photo = page
        .getByRole("main")
        .getByRole("img", { name: "Portrait of Sahan Durak" });
      await expect(photo).toBeVisible();
      // Loaded eagerly as the hero image, not lazily.
      await expect(photo).not.toHaveAttribute("loading", "lazy");
      await expect
        .poll(() => photo.evaluate((img: HTMLImageElement) => img.naturalWidth))
        .toBeGreaterThan(0);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflow).toBe(false);
    });
  }
});
