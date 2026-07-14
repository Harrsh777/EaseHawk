import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const repo = path.join(root, "..");

const files = [
  "EaseHawk_AI_Automation.html",
  "EaseHawk_Capabilities.html",
  "EaseHawk_TITAN_Website.html",
  "EaseHawk_Privacy_Policy.html",
];

for (const f of files) {
  const s = fs.readFileSync(path.join(repo, f), "utf8");
  const title = (s.match(/<title>([^<]*)<\/title>/) || [])[1];
  const bodyStart = s.indexOf("<body");
  const bodyEnd = s.lastIndexOf("</body>");
  const body = s.slice(bodyStart, bodyEnd);
  const lines = body.split("\n");
  console.log(f, "lines", lines.length, "body chars", body.length);
  console.log(" title:", title?.slice(0, 80));
  for (const pat of ["<main", "<header", "<footer", "section class"]) {
    const m = body.match(new RegExp(pat, "g"));
    console.log(" ", pat, m?.length ?? 0);
  }
}
