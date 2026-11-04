import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const article = {
  slug: "how-this-site-is-built",
  title: "How this site is built",
};
// content/blog/typography-sample.mdx doubles as the draft fixture: keep it
// at `draft: true`, or point this test at another draft.
const draft = { slug: "typography-sample", title: "Typography sample" };

// Reads the frontmatter dates straight from the files, so the order check
// keeps working when articles are added.
function publishedDatesNewestFirst(): string[] {
  const directory = path.join(process.cwd(), "content", "blog");
  return readdirSync(directory)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => readFileSync(path.join(directory, name), "utf8"))
    .filter((source) => !/^draft:\s*true\s*$/m.test(source))
    .map((source) => source.match(/^date:\s*"?([\d-]+)"?\s*$/m)?.[1] ?? "")
    .sort()
    .reverse();
}

test("blog index lists published articles, newest first", async ({ page }) => {
  await page.goto("/blog");
  const list = page.getByRole("list", { name: "Articles" });
  const rows = list.getByRole("listitem");

  await expect(rows).toHaveCount(publishedDatesNewestFirst().length);
  const dates = await list
    .locator("time")
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("datetime")),
    );
  expect(dates).toEqual(publishedDatesNewestFirst());

  const row = rows.filter({ hasText: article.title });
  await expect(row.getByText("Article", { exact: true })).toBeVisible();
  await row.getByRole("link").click();
  await expect(page).toHaveURL(`/blog/${article.slug}`);
});

test("article page renders title, metadata and a styled code block", async ({
  page,
}) => {
  const messages: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      messages.push(message.text());
    }
  });

  const response = await page.goto(`/blog/${article.slug}`);
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(`${article.title} · Sahan`);

  const main = page.getByRole("main");
  await expect(
    main.getByRole("heading", { level: 1, name: article.title }),
  ).toBeVisible();
  await expect(main.locator("time")).toHaveAttribute("datetime", /^\d{4}-/);
  await expect(main.locator("figure figcaption")).toHaveText(/bash/i);
  await expect(main.locator("pre code")).toContainText("npm run build");

  // Issue #14: "Blog" stays the current page on every article.
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await expect(nav.getByRole("link", { name: "Blog" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(nav.locator("[aria-current]")).toHaveCount(1);

  expect(messages.filter((text) => /hydrat/i.test(text))).toEqual([]);
});

test("drafts are neither listed nor published", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("main")).not.toContainText(draft.title);
  await expect(page.locator(`a[href="/blog/${draft.slug}"]`)).toHaveCount(0);

  const response = await page.goto(`/blog/${draft.slug}`);
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("main")).not.toContainText(draft.title);
});

test("unknown article slugs return 404", async ({ page }) => {
  const response = await page.goto("/blog/does-not-exist");
  expect(response?.status()).toBe(404);
});
