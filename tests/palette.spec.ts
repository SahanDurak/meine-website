import { expect, test, type Page } from "@playwright/test";

// Text tokens must reach WCAG AA (4.5:1) on paper in both modes
// (brief, section 2). Values are read from the browser, so the test follows
// app/globals.css instead of repeating the hex codes.
const textTokens = ["ink", "pencil", "moss", "sea", "red"] as const;

type Rgb = [number, number, number];

async function tokenColors(page: Page) {
  return page.evaluate(
    (names) => {
      const read = (name: string): Rgb => {
        const probe = document.createElement("span");
        probe.style.color = `var(--${name})`;
        document.body.append(probe);
        const match = getComputedStyle(probe).color.match(/\d+(\.\d+)?/g);
        probe.remove();
        const [r, g, b] = (match ?? []).map(Number);
        return [r, g, b];
      };
      return Object.fromEntries(
        ["paper", ...names].map((name) => [name, read(name)]),
      ) as Record<string, Rgb>;
    },
    [...textTokens],
  );
}

function luminance([r, g, b]: Rgb) {
  const [lr, lg, lb] = [r, g, b].map((value) => {
    const c = value / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function contrast(a: Rgb, b: Rgb) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

for (const mode of ["light", "dark"] as const) {
  test.describe(`${mode} palette`, () => {
    test.use({ colorScheme: mode });

    test("text tokens reach 4.5:1 on paper", async ({ page }) => {
      await page.goto("/");
      const colors = await tokenColors(page);
      for (const name of textTokens) {
        expect(
          contrast(colors[name], colors.paper),
          `${name} on paper`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    });

    test("heading stroke keeps ink readable and nav loop matches", async ({
      page,
    }) => {
      for (const [path, tone] of [
        ["/", "moss"],
        ["/about", "moss"],
        ["/blog", "sea"],
        ["/creative", "sea"],
      ] as const) {
        await page.goto(path);
        await expect(
          page.locator(`[aria-current="page"] [data-current-loop="${tone}"]`),
        ).toBeAttached();
        const stroke = page.locator(`h1 [data-pencil-stroke="${tone}"]`);
        await expect(stroke).toBeAttached();

        // Worst case: ink over the stroke colour blended onto paper.
        const opacity = Number(
          await stroke.evaluate((el) => getComputedStyle(el).opacity),
        );
        const colors = await tokenColors(page);
        const band = colors[tone].map(
          (value, i) => opacity * value + (1 - opacity) * colors.paper[i],
        ) as Rgb;
        expect(
          contrast(colors.ink, band),
          `ink on ${tone} stroke`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    });

    test("video duotone matches ink and paper", async ({ page }) => {
      await page.goto("/creative");
      const colors = await tokenColors(page);
      const tables = await page.evaluate(
        (id) =>
          [...document.querySelectorAll(`#${id} feComponentTransfer > *`)].map(
            (fn) => fn.getAttribute("tableValues")!.split(" ").map(Number),
          ),
        `duotone-${mode}`,
      );
      expect(tables).toHaveLength(3);
      tables.forEach(([from, to], channel) => {
        expect(Math.round(from * 255)).toBe(colors.ink[channel]);
        expect(Math.round(to * 255)).toBe(colors.paper[channel]);
      });
    });
  });
}
