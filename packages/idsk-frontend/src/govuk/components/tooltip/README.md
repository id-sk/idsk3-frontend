# Vysvetlivka (Tooltip)

Komponent vysvetlivka slúži na zobrazenie doplňujúcich informácií, ktoré nemusia byť používateľovi na prvý pohľad jasné. Pomáha ozrejmiť kontext (bez zahltenia rozhrania textom) a znižuje potrebu používateľa hľadať informácie na inom mieste.

## Kedy komponent použiť

Vysvetlivka slúži hlavne na doplnenie kontextu alebo upresnenie významu, ktorý nemusí byť na prvý pohľad zrejmý. Umiestňuje sa zvyčajne vpravo k nadpisom, textom či k textovým alebo rozbaľovacím poliam.

## Kedy komponent NEPOUŽIŤ (Obmedzenia)

Tento komponent slúži **VÝLUČNE na krátke textové vysvetlivky do 290 znakov** (vrátane medzier).

**Zakázané elementy v obsahu (vnútri bubliny):**

- Formuláre (`<input>`, `<select>`, `<textarea>`)
- Tlačidlá (`<button>`)
- Obrázky a odkazy (`<a>`)
- Interaktívne komponenty (Details, Accordion, iné Tooltipy)

> **Upozornenie:** Ak potrebujete zobraziť podstatné informácie potrebné na splnenie úlohy, použite namiesto Tooltipu komponent **Informačná lišta (Notification Banner)**.

## Prístupnosť a interakcia (WCAG 2.2 AA)

Komponent je plne prístupný, optimalizovaný pre čítačky obrazoviek (napr. NVDA) a podporuje ovládanie klávesnicou.

- **Zámerná interakcia (Click / Focus):** Tooltip sa zobrazuje výlučne po kliknutí alebo zameraní klávesnicou. Neotvára sa na *hover* (prejdením myšou), čím sa predchádza náhodnému prekrývaniu dôležitého obsahu na mobiloch a dotykových zariadeniach.
- **Klávesnica (Tab):** Focus sa nastaví na ikonu „i“ a jasne sa vizuálne zvýrazní.
- **Enter / Medzerník:** Otvorí alebo zatvorí tooltip.
- **Escape:** Zatvorí otvorený tooltip a vráti focus späť na ikonku.
- **Pokročilá ARIA:** - Ikonka obsahuje skrytý text (`aria-label="Zobraziť vysvetlivku"`).
  - Na sémantické prepojenie s obsahom sa využíva statický atribút `aria-controls`.
  - Pre zabezpečenie opakovaného a správneho čítania v NVDA sa atribúty `aria-expanded` a `aria-describedby` spravujú *dynamicky* pomocou JavaScriptu (nastavujú sa iba vtedy, keď je tooltip otvorený).
- **Vysoký kontrast:** Komponent obsahuje plnú podporu pre systémový režim vysokého kontrastu (Forced Colors Mode).

## Responzivita a inteligentné poziciovanie (Anti-kolízia)

Komponent obsahuje zabudovanú logiku pre výpočet dostupného miesta na obrazovke a vo výreze (viewporte):
- **Automatické preklápanie:** Ak JavaScript zistí, že vo zvolenej preferovanej pozícii (napr. `right`) pretečie mimo obrazovku, automaticky tooltip preklopí na bezpečnejšiu pozíciu (napr. `top` alebo `bottom`), aby sa predišlo orezaniu textu.
- **Mobilné zobrazenie:** Na veľmi malých obrazovkách sa dlhý text automaticky a bezpečne zalamuje (`break-word`), čím sa predchádza rozbitiu layoutu a vzniku horizontálneho posuvníka.

## Inštalácia komponentu

Tento komponent je súčasťou balíka `@id-sk/frontend`. Pre jeho použitie sa uistite, že máte v projekte importované príslušné SCSS štýly:
