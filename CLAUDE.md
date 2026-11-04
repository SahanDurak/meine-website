# CLAUDE.md – meine-website

@AGENTS.md
Persönliche Website von Sahan. Dient gleichzeitig als Lernprojekt für KI-Agent-Workflows (Subagents, Skills, Hooks, Human-in-the-loop) und CI/CD.

## Projektziel

Vier Bereiche:

- **Home** – technische Ebene dominiert, Skizzen als Akzent
- **Über mich** – technische Ebene dominiert, Skizzen als Akzent
- **Blog** – technische Ebene dominiert, Skizzen als Akzent; Inhalte als MDX-Dateien
- **Creative Outlet** – Skizzen-Ebene dominiert, technische Ebene als Akzent; gemischte Inhalte (Text, Bilder, Videos), neueste zuerst

## Designrichtung

„Engineer's Sketchbook“: eine präzise technische Ebene (Mono-Schrift, Raster, Maßlinien, Koordinaten) überlagert sich mit einer Skizzen-Ebene (Tinte/Bleistift, handgezeichnete Elemente, sich selbst zeichnende Skizzen). Die ganze Seite darf verspielt sein. Verbindliche Referenz: `docs/design-brief.md`. Motiv-Skizzen liegen in `public/sketches/`.

## Tech-Stack

- Next.js (App Router) + TypeScript, Turbopack
- Tailwind CSS
- MDX für Blog-Inhalte (keine Datenbank, kein CMS, kein Login)
- Bilder im Repo (`public/`), Videos als YouTube-Einbettung
- ESLint + Prettier
- Hosting: Vercel (Free Tier), automatisches Deployment aus `main`
- Code auf GitHub (öffentliches Repo)

## Ordnerstruktur

```
app/                 Seiten (App Router), kein src/-Ordner
  page.tsx           Home
  about/page.tsx     Über mich
  blog/              Blog-Übersicht und Artikel
  creative/          Creative Outlet
components/          Wiederverwendbare Komponenten
content/blog/        Blogartikel als .mdx
content/creative/    Einträge für Creative Outlet
public/              Bilder und statische Dateien
```

## Befehle

- `npm run dev` – Entwicklungsserver
- `npm run lint` – Linting (ESLint)
- `npm run format` – Code formatieren (Prettier, inkl. Tailwind-Klassen-Sortierung)
- `npm run format:check` – Prüfen, ob alles formatiert ist
- `npm run typecheck` – TypeScript-Prüfung (`next typegen` + `tsc --noEmit`)
- `npm run build` – Produktions-Build (muss fehlerfrei durchlaufen)
- `npm run test:e2e` – Playwright-Smoke-Tests (startet den Dev-Server automatisch)
- Einmalig nach dem Klonen: `nvm use` (Node-Version aus `.nvmrc`) und `npx playwright install chromium`
- Einmalig für den Playwright MCP (eigene Chromium-Version, passend zu `@playwright/mcp@0.0.84` in `.mcp.json`): `npx playwright-core@1.65.0-alpha-2026-10-30 install chromium`. Beim Update der MCP-Version die passende `playwright-core`-Version aus deren Abhängigkeiten nehmen.

Ein Claude-Code-Hook (`.claude/hooks/format-file.sh`, registriert in `.claude/settings.json`) formatiert jede Datei, die Claude bearbeitet, automatisch mit Prettier.

Die GitHub Action (`.github/workflows/ci.yml`) führt bei jedem Pull Request lint, format:check, typecheck, build und test:e2e aus.

## Arbeitsregeln

1. **Nie direkt auf `main` arbeiten.** Für jede Aufgabe einen Branch anlegen: `feature/<kurzname>` oder `fix/<kurzname>`. `main` ist auf GitHub geschützt – Änderungen nur per Pull Request.
2. **Jeder neue Branch zweigt von aktuellem `main` ab.** Keine gestapelten PRs, außer ich verlange es ausdrücklich.
3. **Kleine Schritte.** Eine Aufgabe = ein Branch = ein überschaubarer Pull Request.
4. **Vor Abschluss prüfen:** `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm run build` und `npm run test:e2e` müssen fehlerfrei sein.
5. **Erst planen, dann bauen.** Bei größeren Aufgaben zuerst kurz den Plan nennen und auf Freigabe warten.
6. **Keine neuen Abhängigkeiten** ohne Rückfrage.
7. **Nichts löschen oder umbenennen**, was nicht zur Aufgabe gehört.
8. **Keine Geheimnisse** (API-Keys, Tokens) in den Code schreiben.

## Code-Stil

- TypeScript strikt, keine `any`
- Server Components als Standard, `"use client"` nur wenn nötig
- Styling nur mit Tailwind-Klassen, kein eigenes CSS außer `globals.css`
- Komponenten klein halten, sprechende Namen
- Code und Kommentare auf Englisch
- Alle Website-Texte (Seiten, Blog, Creative, Metadaten) auf Englisch, kein Sprachumschalter

## Kommunikation

- Mit mir auf Deutsch, kurz und verständlich (auch wenn die Website englisch ist)
- Am Ende jeder Aufgabe: was geändert wurde (2–3 Sätze) und was ich prüfen soll

## Arbeiten mit Subagents

- Design- und Styling-Aufgaben an `ui-designer` delegieren.
- Texte und Blogartikel an `content-writer` delegieren.
- Nach jeder abgeschlossenen Code-Änderung `code-reviewer` aufrufen,
  Blocker beheben, erst dann committen und den PR erstellen.
