import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { ogPalette as c } from "@/lib/og-palette";
import { ogImage } from "@/lib/site";

export const alt = ogImage.alt;
export const size = { width: ogImage.width, height: ogImage.height };
export const contentType = "image/png";

// Read once at module scope; the image is generated at build time.
const sahanHand = await readFile(
  path.join(process.cwd(), "public/fonts/sahan-hand.ttf"),
);
// Geist ships with next/og as its default font; it has to be passed
// explicitly once another font is loaded, or Satori sets everything in the
// handwriting. (Geist Mono is not available as a file, so the labels use
// Geist with mono-like tracking.)
const geist = await readFile(
  path.join(
    process.cwd(),
    "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf",
  ),
);
const lighthouse = await readFile(
  path.join(process.cwd(), "public/sketches/lighthouse.svg"),
  "utf8",
);
// currentColor has no meaning in an <img>, so the sketch gets the ink colour.
const lighthouseSrc = `data:image/svg+xml;base64,${Buffer.from(
  lighthouse.replaceAll("currentColor", c.ink),
).toString("base64")}`;

const mono = {
  fontSize: 22,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: c.pencil,
} as const;

// Technical layer leads: sheet frame with corner ticks, coordinates and a
// dimension line; the sketch layer adds the lighthouse and the handwriting.
export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: c.paper,
        padding: 48,
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          position: "relative",
          border: `2px solid ${c.line}`,
          padding: "56px 64px",
        }}
      >
        {/* Corner ticks */}
        {[
          { top: -2, left: -2, borderTop: 3, borderLeft: 3 },
          { top: -2, right: -2, borderTop: 3, borderRight: 3 },
          { bottom: -2, left: -2, borderBottom: 3, borderLeft: 3 },
          { bottom: -2, right: -2, borderBottom: 3, borderRight: 3 },
        ].map(
          ({ borderTop, borderRight, borderBottom, borderLeft, ...pos }, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 28,
                height: 28,
                borderColor: c.pencil,
                borderStyle: "solid",
                borderTopWidth: borderTop ?? 0,
                borderRightWidth: borderRight ?? 0,
                borderBottomWidth: borderBottom ?? 0,
                borderLeftWidth: borderLeft ?? 0,
                ...pos,
              }}
            />
          ),
        )}

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ ...mono, display: "flex" }}>
            Sheet 01 · www.sahandurak.com
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                fontFamily: "Sahan Hand",
                fontSize: 150,
                lineHeight: 1,
                color: c.ink,
                textTransform: "uppercase",
              }}
            >
              Sahan
            </div>
            <div
              style={{ fontSize: 40, color: c.ink, letterSpacing: "-0.02em" }}
            >
              Engineering, robotics and AI.
            </div>
            <div style={{ fontSize: 28, color: c.pencil }}>
              Blog and creative outlet.
            </div>
          </div>
          {/* Dimension line */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 2, height: 20, background: c.pencil }} />
            <div style={{ flex: 1, height: 2, background: c.pencil }} />
            <div style={{ ...mono, display: "flex" }}>W 1200 px</div>
            <div style={{ flex: 1, height: 2, background: c.pencil }} />
            <div style={{ width: 2, height: 20, background: c.pencil }} />
          </div>
        </div>

        <div
          style={{
            width: 340,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <img src={lighthouseSrc} width={300} height={300} alt="" />
          <div style={{ ...mono, fontSize: 18, display: "flex" }}>
            Fig. 1 · lighthouse
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: geist, style: "normal", weight: 400 },
        { name: "Sahan Hand", data: sahanHand, style: "normal", weight: 400 },
      ],
    },
  );
}
