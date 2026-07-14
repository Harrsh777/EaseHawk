import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const repo = path.join(root, "..");
const stylesDir = path.join(root, "styles");

function extractStyle(html) {
  const m = html.match(/<style>([\s\S]*?)<\/style>/);
  return m ? m[1] : "";
}

function sliceBetween(css, startMarker, endMarker) {
  const start = css.indexOf(startMarker);
  if (start < 0) return "";
  const end =
    endMarker && css.indexOf(endMarker, start + startMarker.length) >= 0
      ? css.indexOf(endMarker, start + startMarker.length)
      : css.length;
  return css.slice(start, end).trim();
}

function scopeSuccessStoryCards(css) {
  return css
    .replace(/^\.story\{/gm, "#ssgrid .story, #stories .story{")
    .replace(/^\.story::/gm, "#ssgrid .story::")
    .replace(/^\.story:hover/gm, "#ssgrid .story:hover")
    .replace(/^\.story\*/gm, "#ssgrid .story*");
}

const industriesHtml = fs.readFileSync(
  path.join(repo, "EaseHawk_Industries.html"),
  "utf8",
);
const careersHtml = fs.readFileSync(
  path.join(repo, "EaseHawk_Careers.html"),
  "utf8",
);
const contactHtml = fs.readFileSync(
  path.join(repo, "EaseHawk_Contact.html"),
  "utf8",
);
const videoHtml = fs.readFileSync(
  path.join(repo, "EaseHawk_Video_Portfolio.html"),
  "utf8",
);

const industriesCss = extractStyle(industriesHtml);
const careersCss = extractStyle(careersHtml);
const contactCss = extractStyle(contactHtml);
const videoCss = extractStyle(videoHtml);

const blocks = [
  "/* EaseHawk sub-page styles — mx-hero shell + page-specific layouts */",
  sliceBetween(
    industriesCss,
    "/* ================= MOXSUITE — PLATFORM PAGE ================= */",
    "/* ================= SUCCESS STORIES PAGE ================= */",
  ),
  scopeSuccessStoryCards(
    sliceBetween(
      industriesCss,
      "/* ================= SUCCESS STORIES PAGE ================= */",
      "/* ================= INDUSTRIES PAGE ================= */",
    ),
  ),
  sliceBetween(
    industriesCss,
    "/* ================= INDUSTRIES PAGE ================= */",
    "/* ---- company profile FAB (all pages) ---- */",
  ),
  sliceBetween(
    careersCss,
    "/* ================= CAREERS PAGE ================= */",
    "/* ================= MOBILE NAVIGATION ================= */",
  ),
  sliceBetween(
    contactCss,
    "/* ================= CONTACT PAGE ================= */",
    "/* ================= MOBILE NAVIGATION ================= */",
  ),
  sliceBetween(
    videoCss,
    "/* ================= VIDEO PORTFOLIO ================= */",
    "/* ================= MOBILE NAVIGATION ================= */",
  ),
  sliceBetween(
    industriesCss,
    "/* ---- QA fix: mobile hero fit",
    ".foot-svcs{margin-top:12px;opacity:.8}.foot-svcs a{font-size:9.5px}",
  ),
];

const out = blocks.filter(Boolean).join("\n\n");
fs.writeFileSync(path.join(stylesDir, "titan-mx.css"), `${out}\n`);
console.log(`Wrote titan-mx.css (${out.length} bytes)`);
