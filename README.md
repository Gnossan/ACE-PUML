# ACE-PUML

PlantUML-editor med AI-assistent och draw.io-export, byggd som experiment för AI-agent-driven utveckling.

## Funktioner

- **Electron-skrivbordsapp** – körs lokalt på macOS
- **Live PlantUML-förhandsgranskning** – alla diagramtyper som PlantUML stödjer, eftersom rendering sker via en generisk bundlad JRE
- **SVG/PNG-export** – exportera dina diagram som bildfiler
- **draw.io-export** – begränsat till Sekvens-, Klass-, Användningsfalls- och Aktivitetsdiagram (INTE alla 14 typer som originalappen `aiuda-puml` stödjer)
- **AI-assistent** – via Anthropic Claude (kräver egen API-nyckel, lagras krypterat lokalt)

## Krav

- macOS
- Node.js 18+
- Internetuppkoppling vid `npm install` (laddar ner bundlad JRE + plantuml.jar från detta repos GitHub Release)

## Installation

```bash
git clone https://github.com/Gnossan/ACE-PUML.git
cd ACE-PUML
npm install
npm start
```

## Konfigurera AI-assistenten

1. Klicka "AI-inställningar" i appen
2. Ange din Anthropic API-nyckel
3. Klicka "Spara nyckel"

## Säkerhet

- `PLANTUML_SECURITY_PROFILE=SANDBOX` blockeras (`!include`/`!includeurl`)
- `safeStorage`-kryptering av API-nyckeln
- Electron context-isolation

## Status

Detta är Fas 1 av ett AI-agent-orkestrerat experiment — byggd från grunden via GitHub-issues, löst av qwen3.6 via Scaleway.

Resterande 10 PlantUML-diagramtyper (Komponent, Tillstånd, ER, Deployment, Objekt, Timing, MindMap, WBS, Network, Gantt) stöds inte i draw.io-exporten, men fungerar i live-förhandsgranskningen då renderingen sker via PlantUML JRE.

## Bygg

```bash
npm run dist
```

Bygger en `.app` lokalt. Ingen signering, notarisering eller publicering utförs — det kräver Apple Developer-ID och är medvetet utanför scope.
