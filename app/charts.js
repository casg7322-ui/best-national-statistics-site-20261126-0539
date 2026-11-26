// HanStat charts — small hand-built SVG chart builders, no libraries.
// Every chart renders from the data in data.js and nothing else.

const BLUE = "#0b4ea2";
const RED = "#c1272d";
const TEAL = "#2a7f6f";
const GOLD = "#c08a1e";
const SLATE = "#5b6472";
const GRID = "#e8e2d5";
const INK = "#16213a";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function niceNum(n) {
  return n.toLocaleString("en-US");
}

function fmtCompact(v) {
  if (Math.abs(v) >= 1000) return (v / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(v);
}

// Line / area chart. series: [[x, y], ...]. opts: {w,h,ymin,ymax,yfmt,xTicks,area,color,hline:{y,label}}
export function lineChart(series, opts = {}) {
  const w = opts.w || 640, h = opts.h || 260;
  const padL = 52, padR = 14, padT = 14, padB = 30;
  const xs = series.map((p) => p[0]);
  const ys = series.map((p) => p[1]);
  const xmin = Math.min(...xs), xmax = Math.max(...xs);
  let ymin = opts.ymin !== undefined ? opts.ymin : Math.min(...ys);
  let ymax = opts.ymax !== undefined ? opts.ymax : Math.max(...ys);
  if (ymax === ymin) ymax = ymin + 1;
  const ypad = (ymax - ymin) * 0.08;
  ymin -= ypad; ymax += ypad;
  const X = (x) => padL + ((x - xmin) / (xmax - xmin)) * (w - padL - padR);
  const Y = (y) => padT + (1 - (y - ymin) / (ymax - ymin)) * (h - padT - padB);
  const yfmt = opts.yfmt || ((v) => String(v));
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || "line chart")}">`;
  // gridlines + y labels (4 ticks)
  for (let i = 0; i <= 4; i++) {
    const v = ymin + ((ymax - ymin) * i) / 4;
    const y = Y(v);
    s += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${w - padR}" y2="${y.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${SLATE}">${esc(yfmt(v))}</text>`;
  }
  // reference line (e.g. replacement fertility 2.1)
  if (opts.hline) {
    const y = Y(opts.hline.y);
    s += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${w - padR}" y2="${y.toFixed(1)}" stroke="${RED}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
    s += `<text x="${w - padR}" y="${(y - 6).toFixed(1)}" text-anchor="end" font-size="11" fill="${RED}">${esc(opts.hline.label)}</text>`;
  }
  // area fill
  if (opts.area) {
    const pts = series.map((p) => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ");
    s += `<polygon points="${padL},${Y(ymin).toFixed(1)} ${pts} ${X(xmax).toFixed(1)},${Y(ymin).toFixed(1)}" fill="${opts.color || BLUE}" fill-opacity="0.10"/>`;
  }
  // line
  const pts = series.map((p) => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ");
  s += `<polyline points="${pts}" fill="none" stroke="${opts.color || BLUE}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  // last point dot + value
  const last = series[series.length - 1];
  s += `<circle cx="${X(last[0]).toFixed(1)}" cy="${Y(last[1]).toFixed(1)}" r="4.5" fill="${opts.color || BLUE}" stroke="#fff" stroke-width="2"/>`;
  s += `<text x="${X(last[0]).toFixed(1)}" y="${(Y(last[1]) - 10).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${esc(opts.lastLabel || yfmt(last[1]))}</text>`;
  // x labels
  const ticks = opts.xTicks || [xmin, xmax];
  for (const t of ticks) {
    s += `<text x="${X(t).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${SLATE}">${esc(String(t))}</text>`;
  }
  s += "</svg>";
  return s;
}

// Vertical bar chart. data: [{label, value}]. opts: {w,h,yfmt,color,highlight}
export function barChart(data, opts = {}) {
  const w = opts.w || 640, h = opts.h || 260;
  const padL = 52, padR = 14, padT = 18, padB = 34;
  const rawMax = Math.max(...data.map((d) => d.value)) * 1.08;
  // Round the scale up to a tidy step so gridline labels read cleanly.
  const step = rawMax >= 100 ? 100 : rawMax >= 10 ? 5 : 0.5;
  const max = Math.ceil(rawMax / step) * step;
  const bw = (w - padL - padR) / data.length;
  const Y = (v) => padT + (1 - v / max) * (h - padT - padB);
  const yfmt = opts.yfmt || ((v) => String(v));
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || "bar chart")}">`;
  for (let i = 0; i <= 3; i++) {
    const v = (max * i) / 3;
    const y = Y(v);
    s += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${w - padR}" y2="${y.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${SLATE}">${esc(yfmt(v))}</text>`;
  }
  data.forEach((d, i) => {
    const x = padL + i * bw + bw * 0.18;
    const bw2 = bw * 0.64;
    const y = Y(d.value);
    const col = opts.highlight === i ? RED : opts.color || BLUE;
    s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw2.toFixed(1)}" height="${(h - padB - y).toFixed(1)}" rx="3" fill="${col}"/>`;
    const showLabel = !opts.labelEvery || i % opts.labelEvery === 0 || i === data.length - 1;
    if (showLabel) s += `<text x="${(x + bw2 / 2).toFixed(1)}" y="${(y - 5).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">${esc(d.valueLabel || yfmt(d.value))}</text>`;
    s += `<text x="${(x + bw2 / 2).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="11" fill="${SLATE}">${esc(d.label)}</text>`;
  });
  s += "</svg>";
  return s;
}

// Horizontal bar chart. data: [{label, value, valueLabel}]. opts: {w,barH,color,max}
// Supports negative values: bars grow left from a zero line.
export function hbarChart(data, opts = {}) {
  const barH = opts.barH || 30;
  const labelW = opts.labelW || 210;
  const w = opts.w || 640;
  const h = data.length * barH + 16;
  const lo = Math.min(0, ...data.map((d) => d.value));
  const hi = opts.max || Math.max(...data.map((d) => d.value)) * 1.06;
  const span = hi - lo;
  const X = (v) => labelW + ((v - lo) / span) * (w - labelW - 90);
  const zeroX = X(0);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || "horizontal bar chart")}">`;
  if (lo < 0) s += `<line x1="${zeroX.toFixed(1)}" y1="4" x2="${zeroX.toFixed(1)}" y2="${h - 4}" stroke="${SLATE}" stroke-width="1"/>`;
  data.forEach((d, i) => {
    const y = 8 + i * barH;
    const col = d.color || opts.color || BLUE;
    const bx = d.value < 0 ? X(d.value) : zeroX;
    const bw = Math.abs(X(d.value) - zeroX);
    s += `<text x="${labelW - 10}" y="${y + barH / 2 + 4}" text-anchor="end" font-size="12" fill="${INK}">${esc(d.label)}</text>`;
    s += `<rect x="${bx.toFixed(1)}" y="${y + 6}" width="${Math.max(2, bw).toFixed(1)}" height="${barH - 12}" rx="3" fill="${col}"/>`;
    if (d.value < 0) {
      s += `<text x="${(X(d.value) - 8).toFixed(1)}" y="${y + barH / 2 + 4}" text-anchor="end" font-size="12" font-weight="700" fill="${INK}">${esc(d.valueLabel || niceNum(d.value))}</text>`;
    } else {
      s += `<text x="${(X(d.value) + 8).toFixed(1)}" y="${y + barH / 2 + 4}" font-size="12" font-weight="700" fill="${INK}">${esc(d.valueLabel || niceNum(d.value))}</text>`;
    }
  });
  s += "</svg>";
  return s;
}

// Population pyramid. rows: [{band, male, female}] (youngest first).
export function pyramid(rows, opts = {}) {
  const w = opts.w || 640;
  const rowH = opts.rowH || 22;
  const h = rows.length * rowH + 46;
  const max = Math.max(...rows.flatMap((r) => [r.male, r.female]));
  const mid = w / 2;
  const scale = (mid - 46) / max;
  // Oldest band on top, youngest at the bottom, as a pyramid reads.
  const ordered = rows.slice().reverse();
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Population pyramid">`;
  s += `<text x="${mid - 60}" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="${BLUE}">Male</text>`;
  s += `<text x="${mid + 60}" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="${RED}">Female</text>`;
  ordered.forEach((r, i) => {
    const y = 24 + i * rowH;
    const mw = r.male * scale, fw = r.female * scale;
    s += `<rect x="${(mid - mw).toFixed(1)}" y="${y}" width="${mw.toFixed(1)}" height="${rowH - 4}" fill="${BLUE}"/>`;
    s += `<rect x="${mid}" y="${y}" width="${fw.toFixed(1)}" height="${rowH - 4}" fill="${RED}"/>`;
    s += `<rect x="${mid - 24}" y="${y - 1}" width="48" height="${rowH - 2}" fill="#faf6ef"/>`;
    s += `<text x="${mid}" y="${y + rowH / 2 + 1}" text-anchor="middle" font-size="10" fill="${INK}">${esc(r.band)}</text>`;
  });
  // axis note
  s += `<text x="${mid}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${SLATE}">Bars show persons per 5-year age band · widest band: 55–59</text>`;
  s += "</svg>";
  return s;
}

// Donut chart. parts: [{label, value, color}]
export function donut(parts, opts = {}) {
  const size = opts.size || 220;
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, ir = r * 0.58;
  const total = parts.reduce((a, p) => a + p.value, 0);
  let s = `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.label || "donut chart")}">`;
  let a0 = -Math.PI / 2;
  for (const p of parts) {
    const a1 = a0 + (p.value / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi0 = cx + ir * Math.cos(a1), yi0 = cy + ir * Math.sin(a1);
    const xi1 = cx + ir * Math.cos(a0), yi1 = cy + ir * Math.sin(a0);
    s += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi0.toFixed(1)} ${yi0.toFixed(1)} A ${ir} ${ir} 0 ${large} 0 ${xi1.toFixed(1)} ${yi1.toFixed(1)} Z" fill="${p.color}"/>`;
    a0 = a1;
  }
  s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="13" fill="${SLATE}">${esc(opts.centerTop || "")}</text>`;
  s += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="17" font-weight="700" fill="${INK}">${esc(opts.center || "")}</text>`;
  s += "</svg>";
  return s;
}

// Grouped bars: Korea vs OECD. rows: [{label, korea, oecd}]
export function vsBars(rows, opts = {}) {
  const barH = opts.barH || 44;
  const labelW = opts.labelW || 250;
  const w = opts.w || 640;
  const h = rows.length * barH + 30;
  const max = Math.max(...rows.flatMap((r) => [r.korea, r.oecd])) * 1.12;
  const X = (v) => labelW + (v / max) * (w - labelW - 110);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || "comparison chart")}">`;
  s += `<text x="${labelW + 10}" y="14" font-size="11" font-weight="700" fill="${BLUE}">● Korea</text>`;
  s += `<text x="${labelW + 90}" y="14" font-size="11" font-weight="700" fill="${SLATE}">● OECD average</text>`;
  rows.forEach((r, i) => {
    const y = 22 + i * barH;
    s += `<text x="${labelW - 10}" y="${y + 16}" text-anchor="end" font-size="12" fill="${INK}">${esc(r.label)}</text>`;
    s += `<rect x="${labelW}" y="${y}" width="${Math.max(2, X(r.korea) - labelW).toFixed(1)}" height="13" rx="2" fill="${BLUE}"/>`;
    s += `<text x="${(X(r.korea) + 6).toFixed(1)}" y="${y + 11}" font-size="12" font-weight="700" fill="${INK}">${esc(String(r.korea))}</text>`;
    s += `<rect x="${labelW}" y="${y + 17}" width="${Math.max(2, X(r.oecd) - labelW).toFixed(1)}" height="13" rx="2" fill="#b9c0cb"/>`;
    s += `<text x="${(X(r.oecd) + 6).toFixed(1)}" y="${y + 28}" font-size="12" fill="${SLATE}">${esc(String(r.oecd))}</text>`;
  });
  s += "</svg>";
  return s;
}

// Stacked single bar for age-structure shares. parts: [{label, value, color}]
export function stackBar(parts, opts = {}) {
  const w = opts.w || 640, h = 64;
  const total = parts.reduce((a, p) => a + p.value, 0);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="age structure">`;
  let x = 0;
  for (const p of parts) {
    const pw = (p.value / total) * w;
    s += `<rect x="${x.toFixed(1)}" y="6" width="${pw.toFixed(1)}" height="26" fill="${p.color}"/>`;
    s += `<text x="${(x + pw / 2).toFixed(1)}" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">${esc(p.value + "%")}</text>`;
    s += `<text x="${(x + pw / 2).toFixed(1)}" y="48" text-anchor="middle" font-size="11" fill="${SLATE}">${esc(p.label)}</text>`;
    x += pw;
  }
  s += "</svg>";
  return s;
}

export const COLORS = { BLUE, RED, TEAL, GOLD, SLATE, GRID, INK };
