import { ImageResponse } from "next/og";
import { ogPalette as c } from "@/lib/og-palette";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same ._. face as app/icon.svg, on full paper (iOS adds its own mask).
const face = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="${c.ink}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><g transform="rotate(-6 16 16)"><path d="M10.6 11.4 C 12.2 11.1, 12.6 13.3, 11 13.5 S 9.6 11.9, 10.8 11.7"/><path d="M21.2 11 C 22.8 10.8, 23 13, 21.5 13.1 S 20.3 11.4, 21.4 11.2"/><path d="M8.6 20.4 C 13 21.4, 16.8 19.4, 21.2 20.7 S 25.6 20.4, 26.8 19.8"/></g></svg>`;
const faceSrc = `data:image/svg+xml;base64,${Buffer.from(face).toString("base64")}`;

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: c.paper,
      }}
    >
      <img src={faceSrc} width={150} height={150} alt="" />
    </div>,
    size,
  );
}
