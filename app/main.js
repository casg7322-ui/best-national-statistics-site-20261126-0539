// HanStat router — hash routes, search, sorting, tabs, drill-down.
// No network, no storage: everything renders from data.js.
import {
  homeView, populationView, economyView, gdpChartHTML, regionsView,
  regionDetail, workView, educationView, healthView, sourcesView,
} from "./views.js";
import { REGIONS, SEARCH_INDEX } from "./data.js";

const app = document.getElementById("app");
const navLinks = [...document.querySelectorAll(".nav-link")];
const searchInput = document.getElementById("site-search");
const searchResults = document.getElementById("search-results");

const ROUTES = {
  "/": homeView,
  "/population": populationView,
  "/economy": economyView,
  "/regions": () => regionsView(currentRegion()),
  "/work": workView,
  "/education": educationView,
  "/health": healthView,
  "/sources": sourcesView,
};

function parseHash() {
  const raw = location.hash.replace(/^#/, "") || "/";
  const [pathPart, queryPart] = raw.split("?");
  const query = new URLSearchParams(queryPart || "");
  return { path: pathPart === "" ? "/" : pathPart, query };
}

function currentRegion() {
  const { query } = parseHash();
  return query.get("region") || null;
}

function render() {
  const { path } = parseHash();
  const view = ROUTES[path] || ROUTES["/"];
  app.innerHTML = view();
  navLinks.forEach((a) => {
    const href = a.getAttribute("href");
    const route = href.replace(/^#/, "") || "/";
    a.classList.toggle("active", route === path);
    if (route === path) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  window.scrollTo(0, 0);
  wirePage();
}

function wirePage() {
  // Tabs (population page)
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".tab-panel").forEach((p) => { p.hidden = true; });
      const panel = document.getElementById("tab-" + btn.dataset.tab);
      if (panel) panel.hidden = false;
    });
  });

  // GDP range toggle (economy page)
  document.querySelectorAll(".seg-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".seg-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const chart = document.getElementById("gdp-chart");
      if (chart) chart.innerHTML = gdpChartHTML(Number(btn.dataset.range));
    });
  });

  // Sortable tables
  document.querySelectorAll("table.sortable").forEach((table) => {
    const thead = table.querySelector("thead");
    if (!thead) return;
    thead.querySelectorAll("th").forEach((th, colIdx) => {
      th.addEventListener("click", () => {
        const tbody = table.querySelector("tbody");
        const rows = [...tbody.querySelectorAll("tr")];
        const numeric = th.dataset.type === "num";
        const asc = th.dataset.dir !== "asc";
        thead.querySelectorAll("th").forEach((h) => { delete h.dataset.dir; h.classList.remove("sorted"); });
        th.dataset.dir = asc ? "asc" : "desc";
        th.classList.add("sorted");
        rows.sort((a, b) => {
          const ca = a.cells[colIdx], cb = b.cells[colIdx];
          const va = ca.dataset.sort !== undefined ? Number(ca.dataset.sort) : (numeric ? Number(ca.textContent.replace(/[^0-9.\-]/g, "")) : ca.textContent.trim());
          const vb = cb.dataset.sort !== undefined ? Number(cb.dataset.sort) : (numeric ? Number(cb.textContent.replace(/[^0-9.\-]/g, "")) : cb.textContent.trim());
          if (va < vb) return asc ? -1 : 1;
          if (va > vb) return asc ? 1 : -1;
          return 0;
        });
        rows.forEach((r) => tbody.appendChild(r));
      });
    });
  });

  // Regions: filter + row drill-down
  const filter = document.getElementById("region-filter");
  const regionTable = document.getElementById("region-table");
  if (filter && regionTable) {
    filter.addEventListener("input", () => {
      const q = filter.value.trim().toLowerCase();
      regionTable.querySelectorAll("tbody tr").forEach((tr) => {
        tr.style.display = q === "" || tr.textContent.toLowerCase().includes(q) ? "" : "none";
      });
    });
    regionTable.querySelectorAll("tbody tr").forEach((tr) => {
      tr.addEventListener("click", () => {
        const code = tr.dataset.code;
        const detail = document.getElementById("region-detail");
        const region = REGIONS.find((r) => r.code === code);
        regionTable.querySelectorAll("tbody tr").forEach((r) => r.classList.remove("selected"));
        tr.classList.add("selected");
        if (detail && region) detail.innerHTML = regionDetail(region);
        history.replaceState(null, "", "#/regions?region=" + code);
        if (detail) detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });
  }
}

// Site search
function doSearch(q) {
  const query = q.trim().toLowerCase();
  if (query.length < 2) {
    searchResults.innerHTML = "";
    searchResults.hidden = true;
    return;
  }
  const words = query.split(/\s+/);
  const hits = SEARCH_INDEX.filter((item) =>
    words.every((w) => item.term.toLowerCase().includes(w) || item.label.toLowerCase().includes(w))
  ).slice(0, 8);
  if (hits.length === 0) {
    searchResults.innerHTML = `<div class="search-empty">No indicator matches “${q.trim()}”.</div>`;
  } else {
    searchResults.innerHTML = hits.map((h) => `<a href="${h.route}" class="search-hit">${h.label}</a>`).join("");
  }
  searchResults.hidden = false;
}

searchInput.addEventListener("input", () => doSearch(searchInput.value));
searchInput.addEventListener("focus", () => { if (searchInput.value.trim().length >= 2) doSearch(searchInput.value); });
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { searchResults.hidden = true; searchInput.blur(); }
});
searchResults.addEventListener("click", (e) => {
  const hit = e.target.closest(".search-hit");
  if (hit) {
    searchResults.hidden = true;
    searchInput.value = "";
  }
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-wrap")) searchResults.hidden = true;
});

window.addEventListener("hashchange", render);
render();
