IDSK Frontend ·
[![Build Status](https://github.com/alphagov/govuk-frontend/workflows/Tests/badge.svg)](https://github.com/alphagov/govuk-frontend/actions?query=workflow%3ATests+branch%3Amain)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
=====================
Verzia: 3.0.0 (beta)

IDSK je komunitne rozvíjaný jednotný dizajnový systém verejnej správy, ktorý má za cieľ zjednotiť používateľské rozhrania a spôsob komunikácie s používateľom pri poskytovaní elektronických služieb na Slovensku.

IDSK Frontend obsahuje zdrojový kód, ktorý vychádza z [britského dizajnového systému elektronických služieb GOV.UK (GDS)](https://design-system.service.gov.uk/).

## idsk.gov.sk
Príklady komponentov s pokynmi ako ich využiť pri tvorbe vlastnej služby nájdete na [Dizajnovom manuále IDSK](https://idsk.gov.sk/).

## Rozvoj IDSK
 Našli ste v IDSK chybu alebo chcete navrhnúť zmenu? Môžete tak urobiť priamo na GitHube

 Chyby a úpravy: [https://github.com/id-sk/idsk3-frontend/issues](https://github.com/id-sk/idsk3-frontend/issues)

 Diskusia: [https://github.com/id-sk/idsk3-frontend/discussions](https://github.com/id-sk/idsk3-frontend/discussions)

## Kontakt na tím
IDSK je tvorený pod záštitou Oddelenia kvality používateľskej skúsenosti a prístupnosti (oKPSP) Ministerstva investícií, regionálneho rozvoja a informatizácie. Pre viac informácií svoje otázky smerujte na e-mail [idsk@mirri.gov.sk](mailto:idsk@mirri.gov.sk).


## Rýchly štart
Sú dva spôsoby, ako začať používať IDSK Frontend vo vašej aplikácii.

### 1. Inštaláciou npm (odporúčame)
Odporúčame nainštalovať si IDSK Frontend zo správcu balíčkov platformy [Node (NPM)](https://www.npmjs.com/package/@id-sk/frontend).

### 2. Inštaláciou kompilovaných súborov
Môžete si tiež stiahnuť skompilované a minifikované prvky (CSS, Javascript) z [GitHub] (https://github.com/id-sk/id-sk-frontend/tree/master/dist).
Po inštalácii budete môcť vo vašej službe používať kód z dizajnového systému IDSK.

## Asistenčné technológie
IDSK Frontend vám umožní budovať služby, ktoré sú v súlade s pokynmi uvedenými v [metodickom usmernení](https://idsk2.gov.sk/uvod/metodika-ucd).

IDSK Frontend oficiálne podporuje nasledovné asistenčné technológie:

| Softvér| Verzia| Typ| Prehliadač |
|--|--|--|--|
| JAWS | 15 alebo novšia | čítačka obrazovky | Internet Explorer 11 |
| ZoomText | 10.11 alebo novšia | zväčšovacia lupa | Internet Explorer 11 |
| Dragon NaturallySpeaking | 11 alebo novšia | rozpoznávač reči | Internet Explorer 11 |
| NVDA | 2016 alebo novšia | čítačka obrazovky | Firefox (najnovšie verzie) |
| VoiceOver | 7.0 alebo novšia | čítačka obrazovky | Safari na iOS10 a OS X |

Okrem toho testujeme, či je všetok obsah prístupný iba pomocou klávesnice.

Naším cieľom je podporovať používateľov, ktorí potrebujú upravené farby webových stránok, ktoré navštevujú. Testujeme to zmenou farieb v prehliadači Firefox, povolením režimu „Vysoký kontrast“ v operačnom systéme Windows a použitím doplnku „Vysoký kontrast“ pre prehliadač Chrome. 
