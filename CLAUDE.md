# CLAUDE.md – meine-website

Persönliche Website von Sahan. Dient gleichzeitig als Lernprojekt für KI-Agent-Workflows (Subagents, Skills, Hooks, Human-in-the-loop) und CI/CD.

## Projektziel

Vier Bereiche:
- **Home** – minimal, clean
- **Über mich** – minimal, clean
- **Blog** – minimal, clean, Inhalte als MDX-Dateien
- **Creative Outlet** – verspielt und optisch eigenständig; gemischte Inhalte (Text, Bilder, Videos), neueste zuerst

## Tech-Stack

- Next.js (App Router) + TypeScript, Turbopack
- Tailwind CSS
- MDX für Blog-Inhalte (keine Datenbank, kein CMS, kein Login)
- Bilder im Repo (`public/`), Videos als YouTube-Einbettung
- ESLint + Prettier
- Hosting: Vercel (Free Tier), automatisches Deployment aus `main`
- Code auf GitHub (privates Repo)

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
- `npm run lint` – Linting
- `npm run build` – Produktions-Build (muss fehlerfrei durchlaufen)

## Arbeitsregeln

1. **Nie direkt auf `main` arbeiten.** Für jede Aufgabe einen Branch anlegen: `feature/<kurzname>` oder `fix/<kurzname>`.
2. **Kleine Schritte.** Eine Aufgabe = ein Branch = ein überschaubarer Pull Request.
3. **Vor Abschluss prüfen:** `npm run lint` und `npm run build` müssen fehlerfrei sein.
4. **Erst planen, dann bauen.** Bei größeren Aufgaben zuerst kurz den Plan nennen und auf Freigabe warten.
5. **Keine neuen Abhängigkeiten** ohne Rückfrage.
6. **Nichts löschen oder umbenennen**, was nicht zur Aufgabe gehört.
7. **Keine Geheimnisse** (API-Keys, Tokens) in den Code schreiben.

## Code-Stil

- TypeScript strikt, keine `any`
- Server Components als Standard, `"use client"` nur wenn nötig
- Styling nur mit Tailwind-Klassen, kein eigenes CSS außer `globals.css`
- Komponenten klein halten, sprechende Namen
- Code und Kommentare auf Englisch

## Kommunikation

- Mit mir auf Deutsch, kurz und verständlich
- Am Ende jeder Aufgabe: was geändert wurde (2–3 Sätze) und was ich prüfen soll
