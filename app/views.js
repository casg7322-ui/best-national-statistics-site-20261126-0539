// HanStat views — one render function per page. All copy is written for this
// site; every figure carries its source and year next to it.
import {
  META, COUNTRY_FACTS, POP_TREND, TFR_TREND, LIFE_TREND, AGED65_TREND,
  VITAL, PYRAMID, GDP_TREND, GVA_SHARES, TOP_EXPORTS, PARTNERS,
  LABOUR_SERIES, REGIONS, CENSUS_TOTAL, PISA, HEALTH_COMPARE, SOURCES,
} from "./data.js";
import { lineChart, barChart, hbarChart, pyramid, donut, vsBars, stackBar, COLORS } from "./charts.js";

const fmt = (n) => n.toLocaleString("en-US");
const money = (n) => "$" + n.toLocaleString("en-US");

function kpi(value, label, source) {
  return `<div class="kpi"><div class="kpi-value">${value}</div><div class="kpi-label">${label}</div><div class="kpi-source">${source}</div></div>`;
}

function pageHead(eyebrow, title, intro) {
  return `<div class="page-head"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p class="lede">${intro}</p></div>`;
}

function srcLine(text) {
  return `<p class="src">Source: ${text}</p>`;
}

function card(title, body, extra = "") {
  return `<section class="card ${extra}"><h2>${title}</h2>${body}</section>`;
}

// ---------- HOME ----------
export function homeView() {
  const facts = COUNTRY_FACTS.map(
    (f) => `<div class="fact"><span class="fact-label">${f.label}</span><span class="fact-value">${f.value}</span>${f.note ? `<span class="fact-note">${f.note}</span>` : ""}</div>`
  ).join("");
  return `
  <div class="hero">
    <div class="eyebrow">Republic of Korea · 대한민국</div>
    <h1>South Korea, <em>counted.</em></h1>
    <p class="lede">51.8 million people, the world's lowest fertility rate, the 12th-largest economy — every headline number for the Republic of Korea, each with its source and year.</p>
    <div class="hero-cta"><a class="btn" href="#/population">Explore the population →</a><a class="btn ghost" href="#/economy">See the economy →</a></div>
  </div>

  <div class="kpi-grid">
    ${kpi("51.75m", "Population", "World Bank, 2024")}
    ${kpi("0.75", "Children per woman", "Statistics Korea, 2024")}
    ${kpi("83.6 yrs", "Life expectancy", "World Bank, 2024")}
    ${kpi("$1.88tn", "GDP", "World Bank, 2024")}
    ${kpi("$683.6bn", "Exports — a record", "MOTIE, 2024")}
    ${kpi("2.8%", "Unemployment", "Statistics Korea, 2024")}
  </div>

  <div class="two-col">
    ${card("Population: past its peak", lineChart(POP_TREND, { label: "Population 1960–2024, millions", area: true, yfmt: (v) => v.toFixed(0) + "m", xTicks: [1960, 1980, 2000, 2024], lastLabel: "51.75m" }) + `<p class="card-note">The population peaked at 51.84 million in 2020 and has edged down since — births no longer replace deaths.</p>` + srcLine("World Bank, SP.POP.TOTL"))}
    ${card("GDP: $1.88 trillion", barChart(GDP_TREND.filter((p) => p[0] >= 2015).map(([y, v]) => ({ label: String(y), value: v, valueLabel: "$" + v.toFixed(0) + "bn" })), { label: "GDP 2015–2024, US$ billion", yfmt: (v) => "$" + v.toFixed(0) + "bn", highlight: 9 }) + `<p class="card-note">Nominal GDP in current US dollars. The 2021 peak and 2022 dip are mostly the won's exchange rate, not output.</p>` + srcLine("World Bank, NY.GDP.MKTP.CD"))}
  </div>

  <section class="card">
    <h2>Korea at a glance</h2>
    <div class="fact-grid">${facts}</div>
  </section>

  <section>
    <h2 class="section-title">Explore the numbers</h2>
    <div class="explore-grid">
      <a class="explore" href="#/population"><span class="explore-num">51.75m</span><span class="explore-title">Population →</span><span class="explore-text">The pyramid, the fertility collapse and the road to 36 million by 2072.</span></a>
      <a class="explore" href="#/economy"><span class="explore-num">$1.88tn</span><span class="explore-title">Economy →</span><span class="explore-text">GDP, the chip-led export engine and who buys what Korea makes.</span></a>
      <a class="explore" href="#/regions"><span class="explore-num">17</span><span class="explore-title">Regions →</span><span class="explore-text">Every province and city, from Gyeonggi's 13.5 million to Sejong's 346,000.</span></a>
      <a class="explore" href="#/work"><span class="explore-num">2.8%</span><span class="explore-title">Work →</span><span class="explore-text">28.58 million jobs, a record employment rate — and a shrinking youth workforce.</span></a>
      <a class="explore" href="#/education"><span class="explore-num">71%</span><span class="explore-title">Education →</span><span class="explore-text">The most degreed young adults in the OECD — and the paradox behind it.</span></a>
      <a class="explore" href="#/health"><span class="explore-num">83.5 yrs</span><span class="explore-title">Health →</span><span class="explore-text">Long lives, cheap care, few doctors — and the OECD's highest suicide rate.</span></a>
    </div>
  </section>

  <div class="two-col">
    ${card("Three numbers that explain Korea", `<ul class="takeaways">
      <li><strong>0.75</strong> — the 2024 fertility rate, the lowest of any country. At this rate each generation is barely a third the size of its parents'.</li>
      <li><strong>20.8%</strong> — semiconductors' share of exports. One product line carries a fifth of everything Korea sells abroad.</li>
      <li><strong>69.5%</strong> — the employment rate for ages 15–64 in 2024, the highest since records began — driven by workers over 60.</li>
    </ul>`)}
    ${card("How to use this site", `<ul class="takeaways">
      <li>Every figure shows its <strong>source and year</strong> next to it; the full list is on the <a href="#/sources">Sources</a> page.</li>
      <li>Tables <strong>sort</strong> when you tap a column heading. The regions table also <strong>filters</strong> and opens a detail card per division.</li>
      <li>Charts are drawn from the same data files the tables use — no figure appears only in a picture.</li>
      <li>Reference year is <strong>2024</strong> unless a figure says otherwise. Projections are labelled as projections.</li>
    </ul>`)}
  </div>
  <p class="fineprint">HanStat is an independent presentation of public statistics, compiled 26 November 2026. It is not affiliated with Statistics Korea or the Government of the Republic of Korea.</p>`;
}

// ---------- POPULATION ----------
export function populationView() {
  const vitalRows = VITAL.map((r) => `<tr><td>${r.year}</td><td>${r.births.toFixed(1)}</td><td>${r.deaths.toFixed(1)}</td><td>${(r.births - r.deaths).toFixed(1)}</td><td>${r.tfr.toFixed(2)}</td></tr>`).join("");
  return `
  ${pageHead("Population", "A country past its peak", "South Korea's population peaked in 2020. Births fell for nine straight years to a record low in 2023, then rose for the first time in a decade — by 3.6% — in 2024. Deaths still outnumber births by 120,000 a year.")}
  <div class="kpi-grid">
    ${kpi("51.75m", "Population", "World Bank, 2024")}
    ${kpi("0.75", "Fertility rate", "Statistics Korea, 2024")}
    ${kpi("238,343", "Births", "Statistics Korea, 2024")}
    ${kpi("358,356", "Deaths", "Statistics Korea, 2024")}
    ${kpi("−120,014", "Natural change", "Statistics Korea, 2024")}
    ${kpi("45.1 yrs", "Median age", "UN WPP 2024")}
  </div>

  <div class="tabs" role="tablist">
    <button class="tab active" data-tab="pyramid" role="tab">Population pyramid</button>
    <button class="tab" data-tab="trends" role="tab">Fertility &amp; ageing</button>
    <button class="tab" data-tab="vital" role="tab">Births &amp; deaths</button>
  </div>

  <div class="tab-panel" id="tab-pyramid">
    ${card("Population pyramid — 2026 projection", pyramid(PYRAMID) + `<p class="card-note">The widest band is 55–59: the baby-boom echo of the 1960s. The base is the narrowest in the country's history — fewer children than grandparents.</p>` + srcLine("UN World Population Prospects 2024, medium variant, 1 July 2026"))}
  </div>

  <div class="tab-panel" id="tab-trends" hidden>
    <div class="two-col">
      ${card("Fertility: 4.53 → 0.75 in two generations", lineChart(TFR_TREND, { label: "Total fertility rate 1970–2024", color: COLORS.RED, ymin: 0, ymax: 5, yfmt: (v) => v.toFixed(1), xTicks: [1970, 1990, 2010, 2024], lastLabel: "0.75", hline: { y: 2.1, label: "Replacement level 2.1" } }) + `<p class="card-note">Fertility fell below replacement in 1983 and below 1.0 in 2018. The 2024 uptick to 0.75 is the first rise in nine years.</p>` + srcLine("World Bank, SP.DYN.TFRT.IN"))}
      ${card("Ageing: 1 in 5 is now 65 or older", lineChart(AGED65_TREND, { label: "Share aged 65 and over, %", color: COLORS.TEAL, ymin: 0, yfmt: (v) => v.toFixed(0) + "%", xTicks: [1970, 1990, 2010, 2024], lastLabel: "19.3%" }) + `<p class="card-note">The 65+ share has risen sixfold since 1970. Statistics Korea projects 47.7% by 2072.</p>` + srcLine("World Bank, SP.POP.65UP.TO.ZS; Statistics Korea projections, Dec 2023"))}
    </div>
    ${card("Age structure, 2024", stackBar([
      { label: "Aged 0–14", value: 10.6, color: COLORS.BLUE },
      { label: "Aged 15–64", value: 70.2, color: COLORS.TEAL },
      { label: "Aged 65+", value: 19.3, color: COLORS.RED },
    ]) + `<p class="card-note">Children are 10.6% of the population; working-age adults 70.2%; older people 19.3%. In 1970 the shares were 42.5%, 54.4% and 3.1%.</p>` + srcLine("World Bank, 2024"))}
    ${card("Life expectancy: 53.8 → 83.6 years", lineChart(LIFE_TREND, { label: "Life expectancy at birth, years", color: COLORS.TEAL, yfmt: (v) => v.toFixed(0), xTicks: [1960, 1980, 2000, 2024], lastLabel: "83.6 yrs" }) + `<p class="card-note">Sixty years of gains: 53.8 years in 1960, 83.6 in 2024. Women live to 86.6, men to 80.3 (2024 estimates).</p>` + srcLine("World Bank, SP.DYN.LE00.IN; CIA World Factbook, 2024"))}
  </div>

  <div class="tab-panel" id="tab-vital" hidden>
    ${card("Births, deaths and fertility, 2014–2024", `
    <div class="table-wrap"><table class="data sortable">
      <thead><tr><th data-type="num">Year</th><th data-type="num">Live births (thousands)</th><th data-type="num">Deaths (thousands)</th><th data-type="num">Natural change (thousands)</th><th data-type="num">Fertility rate</th></tr></thead>
      <tbody>${vitalRows}</tbody>
    </table></div>
    <p class="card-note">Births rose in 2024 for the first time since 2015, helped by a post-pandemic rebound in marriages; the average mother was 33.7 years old. Deaths rose 1.7% to 358,356, so the natural decrease stayed above 120,000.</p>` + srcLine("Statistics Korea, Preliminary Results of Birth and Death Statistics in 2024 (26 Feb 2025)"))}
    ${card("What happens next", `<ul class="takeaways">
      <li><strong>2040:</strong> population 50.06 million, on Statistics Korea's medium projection.</li>
      <li><strong>2072:</strong> population 36.22 million; nearly half the country (47.7%) aged 65 or over.</li>
      <li><strong>The offset:</strong> net migration added roughly 76,000 people in 2024 — not enough to cover a natural decrease of 120,000.</li>
    </ul>` + srcLine("Statistics Korea, Population Projections 2022–2072 (Dec 2023); UN WPP 2024"))}
  </div>`;
}

// ---------- ECONOMY ----------
export function gdpChartHTML(from) {
  const rows = GDP_TREND.filter((p) => p[0] >= from);
  return barChart(
    rows.map(([y, v]) => ({ label: String(y).slice(2), value: v, valueLabel: "$" + v.toFixed(0) + "bn" })),
    { label: "Nominal GDP, US$ billion", yfmt: (v) => "$" + v.toFixed(0) + "bn", highlight: rows.length - 1, labelEvery: rows.length > 12 ? 5 : 1 }
  );
}

export function economyView() {
  const exportRows = TOP_EXPORTS.map((e) => `<tr><td>${e.product}</td><td>${money(e.value)}bn</td><td>${e.share}%</td><td>${e.change || "—"}</td></tr>`).join("");
  const partnerRows = PARTNERS.map((p) => `<tr><td>${p.partner}</td><td>${money(p.exports)}bn</td><td>${p.imports === null ? "—" : money(p.imports) + "bn"}</td><td>${p.balance === null ? "—" : (p.balance > 0 ? "+" : "") + money(p.balance) + "bn"}</td></tr>`).join("");
  return `
  ${pageHead("Economy", "The world's 12th-largest economy", "A $1.88 trillion economy built on exports: chips, cars and ships sold to the world. In 2024 exports hit a record $683.6 billion, with semiconductors alone worth $141.9 billion.")}
  <div class="kpi-grid">
    ${kpi("$1.88tn", "GDP", "World Bank, 2024")}
    ${kpi("$36,223", "GDP per capita", "World Bank, 2024")}
    ${kpi("+2.0%", "Real GDP growth", "Bank of Korea, 2024")}
    ${kpi("$683.6bn", "Exports — record", "MOTIE, 2024")}
    ${kpi("$631.8bn", "Imports", "Korea Customs, 2024")}
    ${kpi("2.3%", "Consumer inflation", "Statistics Korea, 2024")}
  </div>

  ${card("GDP, 2015–2024", `
    <div class="seg" role="group" aria-label="Chart range">
      <button class="seg-btn" data-range="2015">2015–2024</button>
      <button class="seg-btn active" data-range="2000">2000–2024</button>
    </div>
    <div id="gdp-chart">${gdpChartHTML(2000)}</div>
    <p class="card-note">Nominal GDP in current US dollars. The won's swings move the dollar figure more than output does: real growth was 2.0% in 2024.</p>` + srcLine("World Bank, NY.GDP.MKTP.CD"))}

  <div class="two-col">
    ${card("What the economy is made of, 2023", `<div class="donut-wrap">${donut(GVA_SHARES.map((g, i) => ({ ...g, color: [COLORS.BLUE, COLORS.TEAL, COLORS.GOLD][i] })), { center: "100%", centerTop: "gross value added" })}</div><ul class="legend">
      <li><span class="sw" style="background:${COLORS.BLUE}"></span>Services — 58.4%</li>
      <li><span class="sw" style="background:${COLORS.TEAL}"></span>Industry — 31.6%</li>
      <li><span class="sw" style="background:${COLORS.GOLD}"></span>Agriculture &amp; net taxes — 10.0%</li>
    </ul>` + srcLine("Destatis, basic indicators for Korea, 2023"))}
    ${card("The research engine", `<p class="big-stat">5.2<span>%</span></p><p class="card-note">of GDP spent on research and development in 2022 — the second-highest share in the world, after Israel (6.0%). Samsung and SK Hynix alone hold most of the global memory-chip market.</p><p class="card-note">GDP (PPP) is $3.21 trillion — 14th in the world — against $1.88 trillion at market exchange rates.</p>` + srcLine("World Bank, 2022; IMF World Economic Outlook, 2024"))}
  </div>

  ${card("Top 10 exports, 2024", hbarChart(TOP_EXPORTS.map((e) => ({ label: e.product, value: e.value, valueLabel: "$" + e.value + "bn" })), { label: "Top exports 2024, US$ billion" }) + `<p class="card-note">Semiconductors are a fifth of all exports and grew 43.9% in 2024 on AI demand. Ships grew 18% as LNG carriers ordered in 2021 were delivered.</p>` + srcLine("Ministry of Trade, Industry and Energy, 1 Jan 2025"))}

  ${card("Top export products, 2024", `
  <div class="table-wrap"><table class="data sortable">
    <thead><tr><th>Product</th><th data-type="num">Value</th><th data-type="num">Share of exports</th><th>Change on 2023</th></tr></thead>
    <tbody>${exportRows}</tbody>
  </table></div>` + srcLine("Ministry of Trade, Industry and Energy, 2024"))}

  ${card("Who buys from Korea, 2024", `
  <div class="table-wrap"><table class="data sortable">
    <thead><tr><th>Partner</th><th data-type="num">Korea's exports</th><th data-type="num">Korea's imports</th><th data-type="num">Balance</th></tr></thead>
    <tbody>${partnerRows}</tbody>
  </table></div>
  <p class="card-note">China is still the biggest market ($133.0bn), but US-bound exports set a record for the seventh straight year ($127.8bn). ASEAN took $114.0bn. Import figures for Japan and India are not shown — they were not in the same release.</p>` + srcLine("MOTIE, 2024; bilateral balances from BACI reconciled trade data, 2024"))}`;
}

// ---------- REGIONS ----------
export function regionsView(selectedCode) {
  const rows = REGIONS.map((r) => {
    const density = Math.round(r.pop / r.area);
    const share = ((r.pop / CENSUS_TOTAL) * 100).toFixed(1);
    return `<tr data-code="${r.code}" class="${selectedCode === r.code ? "selected" : ""}"><td><strong>${r.name}</strong><span class="hangul">${r.hangul}</span></td><td>${r.type}</td><td>${r.capital}</td><td data-sort="${r.pop}">${fmt(r.pop)}</td><td data-sort="${r.area}">${fmt(r.area)}</td><td data-sort="${density}">${fmt(density)}</td><td data-sort="${share}">${share}%</td></tr>`;
  }).join("");
  const selected = REGIONS.find((r) => r.code === selectedCode) || null;
  const detail = selected ? regionDetail(selected) : `<div class="detail-empty">Tap any row in the table to open its detail card — population, density, share of the nation and what makes the place tick.</div>`;
  return `
  ${pageHead("Regions", "17 provinces and cities", "Half the country lives in the Seoul metropolitan area. The other half spreads from the shipyards of Ulsan to the volcanic island of Jeju. Population is from the 2020 census; densities are calculated from it.")}
  <div class="kpi-grid">
    ${kpi("17", "First-level divisions", "As of the 2020 census")}
    ${kpi("13.51m", "Largest — Gyeonggi", "2020 census")}
    ${kpi("346,275", "Smallest — Sejong", "2020 census")}
    ${kpi("15,840", "People per km² — Seoul", "Calculated, 2020 census — densest")}
    ${kpi("90", "People per km² — Gangwon", "Calculated, 2020 census — sparsest")}
    ${kpi("50.9%", "Live in the Capital Area", "Seoul + Incheon + Gyeonggi")}
  </div>

  ${card("Population by division, 2020 census", hbarChart(
    [...REGIONS].sort((a, b) => b.pop - a.pop).map((r) => ({ label: r.name, value: r.pop / 1000000, valueLabel: (r.pop / 1000000).toFixed(1) + "m", color: r.code === "KR-11" ? COLORS.RED : COLORS.BLUE })),
    { label: "Population by division, millions", max: 14.5 }
  ) + srcLine("Statistics Korea, 2020 census"))}

  ${card("All 17 divisions — tap a row for detail", `
  <div class="table-tools"><input id="region-filter" type="search" placeholder="Filter by name, type or capital…" aria-label="Filter regions"><span class="table-hint">Tap a column heading to sort · tap a row for detail</span></div>
  <div class="table-wrap"><table class="data sortable" id="region-table">
    <thead><tr><th>Division</th><th>Type</th><th>Capital</th><th data-type="num">Population (2020)</th><th data-type="num">Area (km²)</th><th data-type="num">Density (/km²)</th><th data-type="num">Share</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  <div id="region-detail">${detail}</div>
  <p class="card-note">On 1 July 2026 Gwangju and South Jeolla merged into the Jeonnam-Gwangju Special Metropolitan City (3,266,380 people in 2020 census terms). This table keeps the 17 divisions as they stood at the census.</p>` + srcLine("Statistics Korea, 2020 census (via Wikipedia); areas as published"))}`;
}

export function regionDetail(r) {
  const density = Math.round(r.pop / r.area);
  const share = ((r.pop / CENSUS_TOTAL) * 100).toFixed(1);
  const nationalDensity = 516;
  return `<div class="detail-card">
    <div class="detail-head"><h3>${r.name} <span class="hangul">${r.hangul}</span></h3><span class="detail-type">${r.type}</span></div>
    <div class="detail-grid">
      <div><span class="detail-label">Population (2020 census)</span><span class="detail-value">${fmt(r.pop)}</span></div>
      <div><span class="detail-label">Share of Korea</span><span class="detail-value">${share}%</span></div>
      <div><span class="detail-label">Area</span><span class="detail-value">${fmt(r.area)} km²</span></div>
      <div><span class="detail-label">Density</span><span class="detail-value">${fmt(density)} /km²</span></div>
      <div><span class="detail-label">Capital</span><span class="detail-value">${r.capital}</span></div>
      <div><span class="detail-label">Density vs national (516/km²)</span><span class="detail-value">${(density / nationalDensity).toFixed(1)}×</span></div>
    </div>
    <p>${r.note}</p>
  </div>`;
}

// ---------- WORK ----------
export function workView() {
  return `
  ${pageHead("Work", "28.58 million people at work", "Employment hit a record rate in 2024 — but the growth came almost entirely from workers over 60, while jobs for under-30s shrank by 124,000.")}
  <div class="kpi-grid">
    ${kpi("28.58m", "Employed", "Statistics Korea, 2024")}
    ${kpi("2.8%", "Unemployment", "Statistics Korea, 2024")}
    ${kpi("69.5%", "Employment rate, 15–64", "Statistics Korea, 2024 — record")}
    ${kpi("5.7%", "Youth unemployment", "Under 25, 2024")}
    ${kpi("62.5%", "Women's employment rate", "OECD, May 2024")}
    ${kpi("₩10,030", "Minimum wage / hour", "2025")}
  </div>

  <div class="two-col">
    ${card("Unemployment: 3.7% → 2.8%", barChart(LABOUR_SERIES.map((d) => ({ label: String(d.year), value: d.unemployment, valueLabel: d.unemployment.toFixed(1) + "%" })), { label: "Unemployment rate, %", yfmt: (v) => v.toFixed(1) + "%", color: COLORS.TEAL }) + `<p class="card-note">Unemployment has sat below 3% since 2022 — low by any standard, though the official rate counts only active jobseekers.</p>` + srcLine("Statistics Korea; FocusEconomics / Macrobond"))}
    ${card("Who gained jobs in 2024", hbarChart([
      { label: "Aged 60 and over", value: 266, color: COLORS.TEAL, valueLabel: "+266,000" },
      { label: "Aged 30–59", value: 17, color: COLORS.BLUE, valueLabel: "+17,000" },
      { label: "Aged 15–29", value: -124, color: COLORS.RED, valueLabel: "−124,000" },
    ], { label: "Change in employed persons, 2024", max: 300, w: 640 }) + `<p class="card-note">Net job growth of 159,000 in 2024 was the slowest in three years — and it was entirely older workers. Youth jobs fell as the youth population itself shrank.</p>` + srcLine("Statistics Korea, Jan 2025"))}
  </div>

  ${card("Labour market, 2021–2024", `
  <div class="table-wrap"><table class="data sortable">
    <thead><tr><th data-type="num">Year</th><th data-type="num">Employed (millions)</th><th data-type="num">Unemployment rate</th><th>Note</th></tr></thead>
    <tbody>
      <tr><td>2021</td><td>27.27</td><td>3.7%</td><td>Post-pandemic recovery</td></tr>
      <tr><td>2022</td><td>28.09</td><td>2.9%</td><td>Strongest job growth in two decades</td></tr>
      <tr><td>2023</td><td>28.42</td><td>2.7%</td><td>Lowest unemployment on record</td></tr>
      <tr><td>2024</td><td>28.58</td><td>2.8%</td><td>Growth slows; youth jobs fall</td></tr>
    </tbody>
  </table></div>
  <p class="card-note">The employment rate for ages 15–64 reached 69.5% in 2024, the highest since Statistics Korea began the series. The minimum wage crossed ₩10,000 an hour for the first time in 2025 (₩10,030, up from ₩9,860 in 2024).</p>` + srcLine("Statistics Korea; Ministry of Employment and Labor"))}`;
}

// ---------- EDUCATION ----------
export function educationView() {
  return `
  ${pageHead("Education", "The most degreed young adults on earth", "71% of Koreans aged 25–34 hold a tertiary degree — the highest share in the OECD. Yet only 3% hold a master's or doctorate, and tertiary graduates face a 4% unemployment rate with many out of the workforce entirely.")}
  <div class="kpi-grid">
    ${kpi("71%", "Tertiary attainment, 25–34", "OECD, 2025 — highest in OECD")}
    ${kpi("58.2%", "Tertiary attainment, 25–64", "OECD, 2025")}
    ${kpi("527", "PISA mathematics", "OECD PISA 2022")}
    ${kpi("515", "PISA reading", "OECD PISA 2022")}
    ${kpi("528", "PISA science", "OECD PISA 2022")}
    ${kpi("1%", "25–34s without upper secondary", "OECD — lowest in OECD")}
  </div>

  ${card("PISA 2022 — Korea vs the OECD average", vsBars(PISA.map((p) => ({ label: p.subject, korea: p.korea, oecd: p.oecd })), { label: "PISA 2022 mean scores" }) + `<p class="card-note">Korean 15-year-olds beat the OECD average by 55 points in mathematics, 39 in reading and 43 in science. In mathematics Korea ranked 3rd–7th of 81 economies; 23% of students were top performers (OECD average: 8%).</p>` + srcLine("OECD, PISA 2022 Results"))}

  <div class="two-col">
    ${card("Tertiary attainment, ages 25–34", vsBars([
      { label: "Korea", korea: 71, oecd: 48 },
    ], { label: "Share with a tertiary degree, %" }) + `<p class="card-note">The grey bar is the OECD average (48%). Korea's 71% is the highest of any OECD country — up from 37% in 2000.</p>` + srcLine("OECD, Education at a Glance 2025"))}
    ${card("The paradox", `<ul class="takeaways">
      <li><strong>Only 3%</strong> of young adults hold a master's or doctorate (OECD average: 17%) — Korea's degrees stop at the bachelor's.</li>
      <li><strong>80%</strong> of tertiary-educated young adults are employed (OECD: 87%); unemployment is just 4% — the rest are <em>inactive</em>, neither working nor looking.</li>
      <li><strong>33%</strong> of 25–64 year olds have low literacy proficiency (PIAAC Level 1 or below), despite the degrees.</li>
      <li><strong>4.1% of GDP</strong> of public spending goes to education; $21,476 per student from primary to post-secondary level.</li>
    </ul>` + srcLine("OECD, Education at a Glance 2025"))}
  </div>`;
}

// ---------- HEALTH ----------
export function healthView() {
  return `
  ${pageHead("Health", "Long lives, thin cover", "Koreans live 83.5 years — 2.4 years longer than the OECD average — on health spending of 8.5% of GDP. They also see a doctor 17.9 times a year, the most in the OECD, and carry its highest suicide rate.")}
  <div class="kpi-grid">
    ${kpi("83.5 yrs", "Life expectancy", "OECD, 2023")}
    ${kpi("8.5%", "Health spending / GDP", "OECD, 2023")}
    ${kpi("2.6", "Doctors per 1,000", "OECD, 2023")}
    ${kpi("17.9", "Doctor visits / year", "OECD — highest")}
    ${kpi("2.5", "Infant deaths / 1,000 births", "OECD, 2023")}
    ${kpi("24.8", "Suicides / 100,000", "OECD, 2023 — highest")}
  </div>

  ${card("Life expectancy: 53.8 → 83.6 years", lineChart(LIFE_TREND, { label: "Life expectancy at birth, years", color: COLORS.TEAL, yfmt: (v) => v.toFixed(0), xTicks: [1960, 1980, 2000, 2024], lastLabel: "83.6 yrs" }) + `<p class="card-note">The 2022 dip to 82.7 years was COVID-19; the series recovered to 83.6 by 2024. Women live to 86.6, men to 80.3.</p>` + srcLine("World Bank, SP.DYN.LE00.IN; CIA World Factbook, 2024"))}

  ${card("Korea vs the OECD", vsBars(HEALTH_COMPARE.map((h) => ({ label: h.label, korea: h.korea, oecd: h.oecd })), { label: "Health indicators, Korea vs OECD average", labelW: 300 }) + `<p class="card-note">Korea outperforms the OECD on longevity and infant mortality, spends less, and runs on far fewer doctors — who each see far more patients.</p>` + srcLine("OECD Health Statistics 2025"))}

  ${card("The hard number", `<p class="big-stat">24.8 <span>per 100,000</span></p><p class="card-note">Suicides per 100,000 people in 2023, age-standardised — the highest in the OECD, more than double its average of 10.9. The crude rate recorded by Statistics Korea was 27.3. Suicide is the leading cause of death for Koreans in their teens through their 40s, and in 2022 it caused more than half of all deaths among people in their twenties. The rate has fallen from 30.3 in 2012, but remains the OECD's worst by a wide margin.</p>` + srcLine("OECD Health Statistics 2025/2026; Statistics Korea, Cause of Death Statistics"))}`;
}

// ---------- SOURCES ----------
export function sourcesView() {
  const rows = SOURCES.map((s) => `<tr><td><strong>${s.publisher}</strong></td><td>${s.what}</td><td>${s.year}</td><td>${s.note}</td></tr>`).join("");
  return `
  ${pageHead("Sources & methods", "Every figure, traced", "A statistics site is only as good as its sources. Below is every publisher behind the figures on this site, what each supplied, and the year it covers.")}
  ${card("Sources", `
  <div class="table-wrap"><table class="data">
    <thead><tr><th>Publisher</th><th>What it supplied</th><th>Year</th><th>Note</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`)}
  ${card("Methods & labels", `<ul class="takeaways">
    <li><strong>Reference year is 2024</strong> unless a figure says otherwise. Where 2024 was not yet published, the latest year is stated on the figure.</li>
    <li><strong>Estimates vs counts:</strong> the 2024 population (51.75m) is the World Bank estimate; the 2020 census counted 51,829,136. The regions table uses the census.</li>
    <li><strong>Projections are labelled:</strong> the population pyramid is a UN medium-variant projection for 1 July 2026; the 2040 and 2072 figures are Statistics Korea's medium projection.</li>
    <li><strong>Calculated figures</strong> (densities, shares, balances) are computed in the page from the published inputs and labelled as calculated.</li>
    <li><strong>Money:</strong> dollar figures are as published (nominal, current US$). Won figures are as published by Korean sources.</li>
    <li><strong>Compiled 26 November 2026.</strong> Figures may since have been revised by their publishers.</li>
  </ul>`)}
  <p class="fineprint">HanStat is an independent presentation of public statistics. It is not affiliated with Statistics Korea, the OECD, the World Bank or the Government of the Republic of Korea. Figures are reproduced with attribution; the design, text and charts are original.</p>`;
}
