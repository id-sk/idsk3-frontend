ID-SK Frontend ·
[![Build Status](https://github.com/alphagov/govuk-frontend/workflows/Tests/badge.svg)](https://github.com/alphagov/govuk-frontend/actions?query=workflow%3ATests+branch%3Amain)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
=====================
Verzia: 3.0.0 (beta)

ID-SK je komunitne rozvíjaný jednotný dizajnový systém verejnej správy, ktorý má za cieľ zjednotiť používateľské rozhrania a spôsob komunikácie s používateľom pri poskytovaní elektronických služieb na Slovensku.

ID-SK Frontend obsahuje zdrojový kód, ktorý vychádza z [britského dizajn manuálu elektronických služieb GOV.UK (GDS)](https://design-system.service.gov.uk/).

## idsk.gov.sk

Živé príklady ID-SK komponentov s pokynmi ako ich využiť pri tvorbe vlastnej služby nájdete na [Dizajn manuále ID-SK](https://idsk.gov.sk/).

## Rozvoj ID-SK

Našli ste v ID-SK chybu alebo chcete navrhnúť zmenu? Môžete tak urobiť priamo na GitHube

Chyby a úpravy: [https://github.com/id-sk/idsk3-frontend/issues](https://github.com/id-sk/idsk3-frontend/issues)

Diskusia: [https://github.com/id-sk/idsk3-frontend/discussions](https://github.com/id-sk/idsk3-frontend/discussions)

## Kontakt na tím

ID-SK je tvorený pod záštitou Oddelenia behaviorálnych inovácií (oKPS) Ministerstva investícií, regionálneho rozvoja a informatizácie. Pre viac informácií svoje otázky smerujte na e-mail [ID-SK tímu idsk@mirri.gov.sk](mailto:idsk@mirri.gov.sk).

## Rýchly štart

Sú dva spôsoby, ako začať používať ID-SK Frontend vo vašej aplikácii.

### 1. Inštaláciou npm (odporúčame)

Odporúčame nainštalovať si ID-SK Frontend zo správcu balíčkov platformy [Node (NPM)](https://www.npmjs.com/package/@id-sk/frontend).

### 2. Inštaláciou kompilovaných súborov

Môžete si tiež stiahnuť skompilované a minifikované prvky (CSS, Javascript) z [GitHub] (https://github.com/id-sk/id-sk-frontend/tree/master/dist).
Po inštalácii budete môcť vo vašej službe používať kód z dizajn systému ID-SK.

## Asistenčné technológie

ID-SK Frontend vám umožní budovať služby, ktoré sú v súlade s pokynmi uvedenými v [metodickom usmernení](https://idsk2.gov.sk/uvod/metodika-ucd).

ID-SK Frontend oficiálne podporuje nasledovné asistenčné technológie:

| Softvér                  | Verzia             | Typ               | Prehliadač                 |
| ------------------------ | ------------------ | ----------------- | -------------------------- |
| JAWS                     | 15 alebo novšia    | čítačka obrazovky | Internet Explorer 11       |
| ZoomText                 | 10.11 alebo novšia | zväčšovacia lupa  | Internet Explorer 11       |
| Dragon NaturallySpeaking | 11 alebo novšia    | rozpoznávač reči  | Internet Explorer 11       |
| NVDA                     | 2016 alebo novšia  | čítačka obrazovky | Firefox (najnovšie verzie) |
| VoiceOver                | 7.0 alebo novšia   | čítačka obrazovky | Safari na iOS10 a OS X     |

Okrem toho testujeme, či je všetok obsah prístupný iba pomocou klávesnice.

Naším cieľom je podporovať používateľov, ktorí potrebujú upravené farby webových stránok, ktoré navštevujú. Testujeme to zmenou farieb v prehliadači Firefox, povolením režimu „Vysoký kontrast“ v operačnom systéme Windows a použitím doplnku „Vysoký kontrast“ pre prehliadač Chrome.
