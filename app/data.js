// HanStat data — every figure verified 26 Nov 2026 against a named source.
// Reference year 2024 unless a figure says otherwise. Sources are listed
// per figure on the site and in full on the Sources page.

export const META = {
  name: "HanStat",
  tagline: "South Korea, counted.",
  country: "South Korea",
  officialName: "Republic of Korea",
  compiled: "26 November 2026",
  referenceYear: 2024,
};

export const COUNTRY_FACTS = [
  { label: "Capital", value: "Seoul", note: "Seat of government; largest city" },
  { label: "Area", value: "100,210 km²", note: "CIA World Factbook, 2024" },
  { label: "Population density", value: "516 / km²", note: "Calculated from 2024 population and area" },
  { label: "Currency", value: "South Korean won (₩)", note: "KRW" },
  { label: "Time zone", value: "KST (UTC+9)", note: "No daylight saving" },
  { label: "Calling code / domain", value: "+82 · .kr", note: "" },
  { label: "Government", value: "Unitary presidential republic", note: "President Lee Jae-myung, in office since June 2025" },
  { label: "Human Development Index", value: "0.937", note: "UNDP, 2023 — 20th in the world, very high" },
  { label: "Ethnic groups", value: "94.8% Korean", note: "5.2% other, 2024" },
  { label: "Religion", value: "56% no religion", note: "2015 census: Protestant 19.7%, Buddhist 15.5%, Catholic 7.9%" },
  { label: "Official language", value: "Korean", note: "" },
  { label: "Median age", value: "45.1 years", note: "UN World Population Prospects 2024" },
];

// Population trend, World Bank SP.POP.TOTL (millions)
export const POP_TREND = [
  [1960, 25.01], [1970, 32.24], [1980, 38.12], [1990, 42.87],
  [2000, 47.01], [2010, 49.55], [2015, 51.01], [2020, 51.84],
  [2021, 51.77], [2022, 51.67], [2023, 51.71], [2024, 51.75],
];

// Total fertility rate, World Bank SP.DYN.TFRT.IN (children per woman)
export const TFR_TREND = [
  [1970, 4.53], [1980, 2.82], [1990, 1.57], [2000, 1.48],
  [2010, 1.23], [2015, 1.24], [2018, 0.98], [2020, 0.84],
  [2021, 0.81], [2022, 0.78], [2023, 0.72], [2024, 0.75],
];

// Life expectancy at birth, World Bank SP.DYN.LE00.IN (years)
export const LIFE_TREND = [
  [1960, 53.8], [1970, 62.2], [1980, 66.1], [1990, 71.6],
  [2000, 75.9], [2010, 80.1], [2015, 82.0], [2020, 83.4],
  [2022, 82.7], [2023, 83.4], [2024, 83.6],
];

// Share of population aged 65+, World Bank SP.POP.65UP.TO.ZS (%)
export const AGED65_TREND = [
  [1970, 3.4], [1990, 4.9], [2000, 7.1], [2010, 11.0],
  [2015, 13.0], [2020, 15.8], [2022, 17.5], [2024, 19.3],
];

// Vital statistics, Statistics Korea preliminary results (thousands; TFR children per woman)
export const VITAL = [
  { year: 2014, births: 435.4, deaths: 267.7, tfr: 1.21 },
  { year: 2015, births: 438.4, deaths: 275.9, tfr: 1.24 },
  { year: 2016, births: 406.2, deaths: 280.8, tfr: 1.17 },
  { year: 2017, births: 357.8, deaths: 285.5, tfr: 1.05 },
  { year: 2018, births: 326.8, deaths: 298.8, tfr: 0.98 },
  { year: 2019, births: 302.7, deaths: 295.1, tfr: 0.92 },
  { year: 2020, births: 272.3, deaths: 304.9, tfr: 0.84 },
  { year: 2021, births: 260.6, deaths: 317.7, tfr: 0.81 },
  { year: 2022, births: 249.2, deaths: 372.9, tfr: 0.78 },
  { year: 2023, births: 230.0, deaths: 352.5, tfr: 0.72 },
  { year: 2024, births: 238.3, deaths: 358.4, tfr: 0.75 },
];

// Population pyramid, UN World Population Prospects 2024, medium projection,
// 1 July 2026 (persons). Source: populationpyramids.org (UN WPP 2024).
export const PYRAMID = [
  { band: "0–4", male: 635277, female: 603104 },
  { band: "5–9", male: 818472, female: 778680 },
  { band: "10–14", male: 1142172, female: 1088176 },
  { band: "15–19", male: 1205370, female: 1136089 },
  { band: "20–24", male: 1344766, female: 1244313 },
  { band: "25–29", male: 1752250, female: 1596531 },
  { band: "30–34", male: 1965050, female: 1699289 },
  { band: "35–39", male: 1753722, female: 1562904 },
  { band: "40–44", male: 1897660, female: 1768962 },
  { band: "45–49", male: 2008270, female: 1927544 },
  { band: "50–54", male: 2112897, female: 2062726 },
  { band: "55–59", male: 2184638, female: 2193614 },
  { band: "60–64", male: 2020054, female: 2038250 },
  { band: "65–69", male: 1874646, female: 1998625 },
  { band: "70–74", male: 1275951, female: 1444420 },
  { band: "75–79", male: 835452, female: 1024363 },
  { band: "80–84", male: 529063, female: 786090 },
  { band: "85–89", male: 275754, female: 559159 },
  { band: "90–94", male: 82873, female: 269593 },
  { band: "95–99", male: 11844, female: 78663 },
  { band: "100+", male: 684, female: 12428 },
];

// GDP nominal, World Bank NY.GDP.MKTP.CD (US$ billion)
export const GDP_TREND = [
  [2000, 597.5], [2001, 567.6], [2002, 650.0], [2003, 728.5],
  [2004, 823.3], [2005, 971.7], [2006, 1095.2], [2007, 1220.9],
  [2008, 1091.6], [2009, 983.1], [2010, 1192.8], [2011, 1307.1],
  [2012, 1335.3], [2013, 1434.7], [2014, 1556.3], [2015, 1539.2],
  [2016, 1579.2], [2017, 1710.2], [2018, 1824.3], [2019, 1751.0],
  [2020, 1744.1], [2021, 1942.3], [2022, 1799.4], [2023, 1844.8],
  [2024, 1875.4],
];

// Gross value added shares, 2023 (destatis, from national sources)
export const GVA_SHARES = [
  { label: "Services", value: 58.4 },
  { label: "Industry", value: 31.6 },
  { label: "Agriculture & net taxes", value: 10.0 },
];

// Top exports 2024, Ministry of Trade, Industry and Energy (US$ billion)
export const TOP_EXPORTS = [
  { product: "Semiconductors", value: 141.9, share: 20.8, change: "+43.9%" },
  { product: "Automobiles", value: 70.8, share: 10.4, change: "−0.1%" },
  { product: "Petroleum products", value: 50.3, share: 7.4, change: "" },
  { product: "Ships", value: 25.6, share: 3.7, change: "+18%" },
  { product: "Synthetic resins", value: 23.6, share: 3.5, change: "" },
  { product: "Auto parts", value: 22.6, share: 3.3, change: "" },
  { product: "Steel plate", value: 20.2, share: 3.0, change: "" },
  { product: "Display panels", value: 18.9, share: 2.8, change: "" },
  { product: "Wireless communication equipment", value: 17.2, share: 2.5, change: "" },
  { product: "Computers", value: 13.2, share: 1.9, change: "" },
];

// Export destinations 2024 (US$ billion, MOTIE; imports & balance BACI)
export const PARTNERS = [
  { partner: "China", exports: 133.0, imports: 140.0, balance: -6.9 },
  { partner: "United States", exports: 127.8, imports: 72.0, balance: 55.8 },
  { partner: "Vietnam", exports: 58.3, imports: 28.0, balance: 30.3 },
  { partner: "Japan", exports: 29.6, imports: null, balance: null },
  { partner: "India", exports: 18.7, imports: null, balance: null },
];

// Labour, Statistics Korea (employed millions; unemployment %)
export const LABOUR_SERIES = [
  { year: 2021, employed: 27.27, unemployment: 3.7 },
  { year: 2022, employed: 28.09, unemployment: 2.9 },
  { year: 2023, employed: 28.42, unemployment: 2.7 },
  { year: 2024, employed: 28.58, unemployment: 2.8 },
];

// First-level divisions, 2020 census (Statistics Korea via Wikipedia).
// Densities are calculated from census population / area in the app.
export const REGIONS = [
  { code: "KR-41", name: "Gyeonggi", hangul: "경기도", type: "Province", capital: "Suwon", pop: 13511676, area: 10184, note: "Most populous province; rings Seoul and holds 26% of the country." },
  { code: "KR-11", name: "Seoul", hangul: "서울특별시", type: "Special City", capital: "Seoul", pop: 9586195, area: 605.2, note: "Capital and largest city; 18.5% of the nation in 0.6% of its land." },
  { code: "KR-26", name: "Busan", hangul: "부산광역시", type: "Metropolitan City", capital: "Busan", pop: 3349016, area: 770.04, note: "Largest port; the country's second city and gateway to the sea." },
  { code: "KR-48", name: "South Gyeongsang", hangul: "경상남도", type: "Province", capital: "Changwon", pop: 3333056, area: 10533, note: "Manufacturing heartland around Changwon and the south coast." },
  { code: "KR-28", name: "Incheon", hangul: "인천광역시", type: "Metropolitan City", capital: "Incheon", pop: 2945454, area: 1062.63, note: "Home to the country's main international airport and a Yellow Sea port." },
  { code: "KR-47", name: "North Gyeongsang", hangul: "경상북도", type: "Province", capital: "Andong", pop: 2644757, area: 19030, note: "Largest province by area; Gyeongju was the ancient Silla capital." },
  { code: "KR-27", name: "Daegu", hangul: "대구광역시", type: "Metropolitan City", capital: "Daegu", pop: 2410700, area: 883.49, note: "Inland hub of the south-east; textiles, machinery and apples." },
  { code: "KR-44", name: "South Chungcheong", hangul: "충청남도", type: "Province", capital: "Hongseong", pop: 2176636, area: 8204, note: "West-coast province of farms, ports and Baekje historic sites." },
  { code: "KR-45", name: "Jeonbuk", hangul: "전북특별자치도", type: "Special Self-Governing Province", capital: "Jeonju", pop: 1802766, area: 8067, note: "Jeonju Hanok Village and bibimbap country; renamed Jeonbuk State in 2024." },
  { code: "KR-46", name: "South Jeolla", hangul: "전라남도", type: "Province", capital: "Muan", pop: 1788807, area: 12247, note: "Rice bowl of the south-west; merged with Gwangju on 1 July 2026." },
  { code: "KR-43", name: "North Chungcheong", hangul: "충청북도", type: "Province", capital: "Cheongju", pop: 1632088, area: 7433, note: "The only landlocked province; Cheongju printed the world's oldest movable metal type." },
  { code: "KR-42", name: "Gangwon", hangul: "강원특별자치도", type: "Special Self-Governing Province", capital: "Chuncheon", pop: 1521763, area: 16875, note: "Mountain province; hosted the PyeongChang 2018 Winter Olympics." },
  { code: "KR-30", name: "Daejeon", hangul: "대전광역시", type: "Metropolitan City", capital: "Daejeon", pop: 1488435, area: 539.85, note: "Science city — KAIST and the Daedeok research complex." },
  { code: "KR-29", name: "Gwangju", hangul: "광주광역시", type: "Metropolitan City", capital: "Gwangju", pop: 1477573, area: 501.24, note: "Heart of the Honam region; merged with South Jeolla on 1 July 2026." },
  { code: "KR-31", name: "Ulsan", hangul: "울산광역시", type: "Metropolitan City", capital: "Ulsan", pop: 1135423, area: 1057.14, note: "Industrial city of shipyards, cars and petrochemicals." },
  { code: "KR-49", name: "Jeju", hangul: "제주특별자치도", type: "Special Self-Governing Province", capital: "Jeju City", pop: 670858, area: 1849, note: "Volcanic island province; Hallasan and the country's top holiday island." },
  { code: "KR-50", name: "Sejong", hangul: "세종특별자치시", type: "Special Self-Governing City", capital: "Sejong", pop: 346275, area: 465.23, note: "Planned administrative capital; the fastest-growing division." },
];

export const CENSUS_TOTAL = 51829136;

// PISA 2022, OECD (mean scores, 15-year-olds)
export const PISA = [
  { subject: "Mathematics", korea: 527, oecd: 472 },
  { subject: "Reading", korea: 515, oecd: 476 },
  { subject: "Science", korea: 528, oecd: 485 },
];

// Korea vs OECD, health (OECD Health Statistics 2025/2026)
export const HEALTH_COMPARE = [
  { label: "Life expectancy (years, 2023)", korea: 83.5, oecd: 81.1, higherBetter: true },
  { label: "Health spending (% of GDP, 2023)", korea: 8.5, oecd: 9.1, higherBetter: null },
  { label: "Doctors per 1,000 people", korea: 2.6, oecd: 4.0, higherBetter: true },
  { label: "Infant mortality (per 1,000 live births)", korea: 2.5, oecd: 4.1, higherBetter: false },
  { label: "Doctor visits per person per year", korea: 17.9, oecd: 6.6, higherBetter: null },
  { label: "Daily smokers (% of 15+)", korea: 15.3, oecd: 13.2, higherBetter: false },
];

// Search index: { term, label, route }
export const SEARCH_INDEX = [
  { term: "population total people residents", label: "Population — 51.75 million (2024)", route: "#/population" },
  { term: "fertility birth rate tfr babies", label: "Fertility rate — 0.75 children per woman (2024)", route: "#/population" },
  { term: "births deaths natural change", label: "Births & deaths — 238,343 births, 358,356 deaths (2024)", route: "#/population" },
  { term: "life expectancy age median", label: "Life expectancy — 83.6 years (2024)", route: "#/population" },
  { term: "pyramid age structure ageing aging elderly", label: "Population pyramid — the country that got old first", route: "#/population" },
  { term: "gdp economy growth per capita", label: "GDP — $1.88 trillion (2024)", route: "#/economy" },
  { term: "exports semiconductors chips trade", label: "Exports — $683.6 billion (2024)", route: "#/economy" },
  { term: "imports trade surplus partners china united states", label: "Trading partners — China $133bn, US $127.8bn", route: "#/economy" },
  { term: "research development rnd innovation", label: "R&D — 5.2% of GDP (2022)", route: "#/economy" },
  { term: "seoul busan incheon provinces regions prefectures", label: "Regions — 17 provinces and cities", route: "#/regions" },
  { term: "gyeonggi", label: "Gyeonggi — 13.5 million, the largest province", route: "#/regions?region=KR-41" },
  { term: "jeju island", label: "Jeju — 670,858 people, island province", route: "#/regions?region=KR-49" },
  { term: "unemployment jobs employment work labour labor", label: "Unemployment — 2.8% (2024)", route: "#/work" },
  { term: "minimum wage salary pay", label: "Minimum wage — ₩10,030 per hour (2025)", route: "#/work" },
  { term: "youth jobs young people", label: "Youth unemployment — 5.7% (under 25)", route: "#/work" },
  { term: "education university tertiary degree pisa school students", label: "Education — 71% of 25–34 year olds hold a degree", route: "#/education" },
  { term: "pisa mathematics maths reading science scores", label: "PISA 2022 — mathematics 527, reading 515, science 528", route: "#/education" },
  { term: "health doctors hospitals spending suicide", label: "Health — life expectancy 83.5 years", route: "#/health" },
  { term: "suicide mental health", label: "Suicide rate — 24.8 per 100,000 (2023), highest in the OECD", route: "#/health" },
  { term: "sources methodology data", label: "Sources & methods — every figure traced", route: "#/sources" },
];

export const SOURCES = [
  { publisher: "World Bank — World Development Indicators", what: "Population, GDP, fertility, life expectancy, age structure, R&D", year: "2024", note: "Fetched from the World Bank API, November 2026" },
  { publisher: "Statistics Korea (KOSTAT)", what: "Births, deaths, fertility, population projections, labour force, 2020 census", year: "2024", note: "Preliminary vital statistics, 26 Feb 2025; population projections Dec 2023" },
  { publisher: "Ministry of Trade, Industry and Energy (MOTIE)", what: "Exports, imports, top export items and destinations", year: "2024", note: "Annual exports release, 1 Jan 2025; Korea Customs Service data" },
  { publisher: "OECD — Education at a Glance 2025 / 2026", what: "Tertiary attainment, education spending, PISA context", year: "2025", note: "Country note: Korea" },
  { publisher: "OECD — PISA 2022", what: "Mean scores in mathematics, reading and science", year: "2022", note: "Released Dec 2023" },
  { publisher: "OECD — Health Statistics 2025 / 2026", what: "Life expectancy, health spending, doctors, suicide, smoking", year: "2023", note: "Via the Ministry of Health and Welfare analysis" },
  { publisher: "OECD — Employment Outlook 2024", what: "Employment and unemployment rates, women's employment", year: "2024", note: "Country note: Korea" },
  { publisher: "United Nations — World Population Prospects 2024", what: "Population pyramid cohorts, median age, projections", year: "2024", note: "Medium variant; pyramid shown for 1 July 2026" },
  { publisher: "Destatis (German Federal Statistical Office)", what: "Basic indicators: GDP, trade, sector shares", year: "2024", note: "International statistics country page for Korea" },
  { publisher: "Ministry of Employment and Labor", what: "Minimum wage", year: "2025", note: "₩10,030 per hour" },
  { publisher: "UNDP — Human Development Report", what: "Human Development Index", year: "2023", note: "HDI 0.937" },
  { publisher: "CIA World Factbook", what: "Area, life expectancy by sex, immigrant share", year: "2024", note: "Country profile: Korea, South" },
];
