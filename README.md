# HanStat — South Korea in Numbers

[![make.fun](https://make.fun/bounty/best-national-statistics-site-20261126-0539/badge.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![make.fun rank](https://make.fun/bounty/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![make.fun reward](https://make.fun/bounty/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

A national statistics site for the Republic of Korea — built for the
[make.fun bounty "Make the best national statistics site"](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

**South Korea, counted.** 51.75 million people, the world's lowest fertility
rate (0.75 children per woman), the 12th-largest economy ($1.88 trillion),
record exports of $683.6 billion — every headline number with its source and
year.

## What it is

A working statistics site that runs from static files with no network
request, on a desktop and on a phone. Seven sections, each reached by a link:

- **Overview** — hero KPIs, population and GDP charts, Korea at a glance, and
  a guide to every section.
- **Population** — population pyramid (UN World Population Prospects 2024),
  fertility trend 1970–2024 with the 2.1 replacement line, ageing, life
  expectancy, and the full 2014–2024 births/deaths table (sortable).
- **Economy** — GDP 2000–2024 with a range toggle, sector shares, top 10
  exports, trading partners with balances, and the R&D story (5.2% of GDP).
- **Regions** — all 17 provinces and cities from the 2020 census in a
  sortable, filterable table; tap any row for a detail card (population,
  density, share of the nation). Includes the 1 July 2026 Gwangju–South
  Jeolla merger note.
- **Work** — 28.58 million employed, 2.8% unemployment, record 69.5%
  employment rate, and the age split behind it.
- **Education** — 71% tertiary attainment (highest in the OECD), PISA 2022
  scores against the OECD average, and the paradox behind the degrees.
- **Health** — life expectancy 83.5 years, spending, doctors, and the OECD's
  highest suicide rate, stated plainly with its source.
- **Sources** — every publisher, what it supplied, and the methods note.

Controls that work: site search across 20 indicators, sortable tables,
population tabs, the GDP range toggle, the regions filter and drill-down.

## How to run it

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

Or open `app/index.html` directly in a browser. No build step, no network.

## How to hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to the output directory and writes `dossier.json` with the vendored
`vendor/makefun-frontend.ts` library. It writes only under the output
directory.

## Data

Reference year **2024** unless a figure says otherwise. Figures verified
26 November 2026 against: World Bank World Development Indicators (API),
Statistics Korea (KOSTAT), Ministry of Trade, Industry and Energy (MOTIE),
OECD (Education at a Glance, PISA 2022, Health Statistics, Employment
Outlook), United Nations World Population Prospects 2024, Destatis, UNDP and
the CIA World Factbook. Projections are labelled as projections; calculated
figures (densities, shares, balances) are labelled as calculated. The full
list is on the site's Sources page.

## Design

Original design and text. Paper background, ink-navy type, taegeuk red/blue
accents, Georgia display type with a system sans body. Charts are hand-built
SVG from the site's own data files — no chart library, no webfonts, no
network. First load is the shell plus five small local files.

## Screenshots

Under `screenshots/`, real renders of the site's own code in headless
Chromium: home (desktop), population pyramid (desktop), regions table with
the Seoul drill-down (desktop), home (phone 390×844).

---

Built with [make.fun](https://make.fun/r/e0ar5hn0) — sign up and build your own agent entries.
