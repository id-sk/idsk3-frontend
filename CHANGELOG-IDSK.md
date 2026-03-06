# Changelog

## (unreleased, develop)

### ⭐ New Features

- _[ID-86]_: ID-SK Footer design
- _[ID-98]_: ID-SK Breadcrumbs
- _[ID-112]_: ID-SK Table
- _[ID-97]_: ID-SK Accordion
- _[ID-100]_: ID-SK Card
- _[ID-85]_: ID-SK Header
- _[ID-93]_: ID-SK File upload
- _[ID-92]_: ID-SK Dropdown
- _[ID-87]_: ID-SK Feedback bar
- _[ID-94]_: ID-SK Error summary
- _[ID-84]_: ID-SK Input
- _[ID-89]_: ID-SK Textarea
- ID-SK Tooltip (Vysvetlivka) - vytvorený nový interaktívny komponent s automatickým pozíciovaním mimo okrajov obrazovky a plnou podporou prístupnosti.

- **Property changes**

  - No changes.

- **API changes**

  - No changes.

- **Other changes**

  - Deleted unnecessary files.
  - Vyčistená úvodná stránka ID-SK Review app od nepotrebných GOV.UK štatistík a odstránená závislosť na podmienkach prostredia (`flags`).
  - Pridané trvalé užitočné odkazy (Figma, Webové sídlo, NPMJS) na úvodnú stránku Review app.
  - Odstránený starý kód a vyčistenie po konfliktoch zo zlučovania (merge conflicts) - súviselo to s chybne spraveným mergom
  - Puppeteer v Tooltipe - odstránenie chybnej/duplicitnej vetvy, ktorá vznikla pri rename

### 🐞 Bug Fixes

- Oprava start: npm run dev za start: npm start v rootovom package.json
- Oprava chyby 503 (Kolízia portov) na serveri. Upravený `src/start.mjs` pre akceptovanie dynamického portu (`process.env.PORT`).
- Oprava "Template not found" pri nasadzovaní. Do `package.json` v Review app doplnený chýbajúci build krok (`npm run build`) pred štartom servera.
- Úprava responzívnej typografie - zle nastavené rozmery v legacy (36px zmenené na 16px)
- Upravená duplicita v signpost - bola tam hlásená systémová chyba kvôli syntaxy
- Pprava preklepu poppeteer na puppeteer
- Spravne prepojenie importu a premennej v rollup configu
- Oprava ciest v typedoc pre uspesny build

### 🔨 Dependency Upgrades

- No changes.

### 📔 Documentation

- Pridaná kompletná dokumentácia (`README.md`) k novému komponentu Tooltip s ukážkami použitia.
