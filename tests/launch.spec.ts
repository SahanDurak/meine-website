import { expect, test } from "@playwright/test";

const siteUrl = "https://www.sahandurak.com";

const pages = [
  "/",
  "/about",
  "/blog",
  "/creative",
  "/impressum",
  "/datenschutz",
];

test.describe("legal pages", () => {
  test("impressum lists name, address and e-mail", async ({ page }) => {
    const response = await page.goto("/impressum");
    expect(response?.status()).toBe(200);
    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", { level: 1, name: "Impressum" }),
    ).toBeVisible();
    await expect(main).toContainText("§ 5 DDG");
    await expect(main).toContainText("Sahan Durak");
    await expect(main).toContainText("Triftstraße 63");
    await expect(main).toContainText("23554 Lübeck");
    await expect(main).toContainText("SahanDurak1@gmail.com");
    await expect(main.locator("article")).toHaveAttribute("lang", "de");
  });

  test("datenschutz is the e-recht24 text with Vercel and the source link", async ({
    page,
  }) => {
    const response = await page.goto("/datenschutz");
    expect(response?.status()).toBe(200);
    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", { level: 1, name: "Datenschutzerklärung" }),
    ).toBeVisible();
    for (const heading of [
      "1. Datenschutz auf einen Blick",
      "2. Hosting",
      "3. Allgemeine Hinweise und Pflichtinformationen",
    ]) {
      await expect(
        main.getByRole("heading", { level: 2, name: heading }),
      ).toBeVisible();
    }
    await expect(main).toContainText("Vercel Inc.");
    await expect(main).toContainText("440 N Barranca Avenue #4133");
    await expect(main).toContainText(
      "Sahan Durak Triftstraße 63, 23554 Lübeck",
    );
    await expect(main).not.toContainText("Telefon");
    await expect(
      main.getByRole("link", { name: /e-recht24\.de/ }),
    ).toHaveAttribute("href", "https://www.e-recht24.de");
    await expect(main.locator("article")).toHaveAttribute("lang", "de");
  });

  // Generator placeholders come in square brackets ("[Straße]"); the legal
  // texts contain no brackets otherwise.
  for (const path of ["/impressum", "/datenschutz"]) {
    test(`${path} has no bracketed placeholders`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("main")).not.toContainText(/\[[^\]]+\]/);
    });
  }
});

// Every page in the sitemap (so every published article) plus the fixed
// pages. Also catches review markers ("[Bitte prüfen]") and bracketed
// generator placeholders such as "[Telefonnummer der verantwortlichen Stelle]".
test("no page shows placeholders", async ({ page, request }) => {
  const placeholder =
    /TODO|FIXME|example\.com|lorem ipsum|bitte prüfen|\[[^\]]*(nummer|adresse|name)[^\]]*\]/i;
  const xml = await (await request.get("/sitemap.xml")).text();
  const sitemapPaths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    ([, url]) => new URL(url).pathname,
  );
  const paths = [...new Set([...pages, ...sitemapPaths])];
  // Guard against an empty sitemap: at least one article must be covered.
  expect(paths.some((path) => path.startsWith("/blog/"))).toBe(true);

  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.getByRole("main"), path).not.toContainText(placeholder);
    expect(await page.title(), path).not.toMatch(placeholder);
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description ?? "", path).not.toMatch(placeholder);
  }
});

test("footer links to the legal pages on every page", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    const footer = page.getByRole("navigation", { name: "Legal" });
    await expect(
      footer.getByRole("link", { name: "Impressum" }),
    ).toHaveAttribute("href", "/impressum");
    await expect(
      footer.getByRole("link", { name: "Datenschutz" }),
    ).toHaveAttribute("href", "/datenschutz");
  }
});

test("unknown URLs show the 404 page with a way home", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  const main = page.getByRole("main");
  await expect(
    main.getByRole("heading", { level: 1, name: /the end!/i }),
  ).toBeVisible();
  await expect(main.locator("video")).toHaveCount(1);

  await main.getByRole("link", { name: /back/i }).click();
  await expect(page).toHaveURL("/");
});

test.describe("metadata", () => {
  for (const path of pages) {
    test(`${path} has title, description, canonical and og:image`, async ({
      page,
    }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/Sahan/);
      const head = page.locator("head");
      await expect(head.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        /.{20,}/,
      );
      await expect(head.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        path === "/" ? siteUrl : `${siteUrl}${path}`,
      );
      await expect(head.locator('meta[property="og:image"]')).toHaveAttribute(
        "content",
        new RegExp(`^${siteUrl}/opengraph-image`),
      );
    });
  }

  test("open graph image is a 1200×630 PNG", async ({ request }) => {
    const response = await request.get("/opengraph-image");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
    const png = await response.body();
    // PNG IHDR: width and height as big-endian integers at bytes 16 and 20.
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });

  test("icons are linked", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
      "href",
      /icon\.svg/,
    );
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
  });
});

test("sitemap lists pages and published articles, no drafts", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  for (const path of pages) {
    expect(xml).toContain(`<loc>${siteUrl}${path}</loc>`);
  }
  expect(xml).toContain(`<loc>${siteUrl}/blog/how-this-site-is-built</loc>`);
  expect(xml).not.toContain("typography-sample");
});

test("robots.txt allows crawling and points to the sitemap", async ({
  request,
}) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const text = await response.text();
  expect(text).toContain("Allow: /");
  expect(text).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);
});
