// Applies a stored manual theme to <html> while the HTML is parsed, before
// the first paint, so the page never flashes in the wrong colors. Without a
// stored choice nothing is set and the CSS follows prefers-color-scheme.
// See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
export const THEME_STORAGE_KEY = "theme";

const script = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function ThemeScript() {
  return (
    <script
      // text/plain on the client keeps React from warning about a script tag;
      // the server copy is the one that runs.
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
