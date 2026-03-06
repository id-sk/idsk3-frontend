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

_Ak potrebujete zobraziť podstatné informácie potrebné na splnenie úlohy, použite namiesto Tooltipu komponent **Informačná lišta (Notification Banner)**._

## Prístupnosť (WCAG 2.2 AA)

Komponent je plne prístupný a podporuje ovládanie klávesnicou a čítačkami obrazoviek:

- **Tab:** Focus sa nastaví na ikonu „i“ a jasne sa vizuálne zvýrazní.
- **Enter / Medzerník:** Otvorí alebo zatvorí tooltip.
- **Escape:** Zatvorí otvorený tooltip a vráti focus späť na ikonku.
- **Aria:** Ikonka obsahuje skrytý text pre čítačky (`aria-label="Zobraziť vysvetlivku"`). Samotný text bubliny je prepojený s ikonkou cez `aria-describedby` a má `role="tooltip"`.
