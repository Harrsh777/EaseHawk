import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const repo = path.join(root, "..");

const titanHtml = fs.readFileSync(
  path.join(repo, "EaseHawk_TITAN_Website.html"),
  "utf8",
);

const styleMatch = titanHtml.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  let css = styleMatch[1].trim();
  const rootMatch = css.match(/:root\{[\s\S]*?\}/);
  if (rootMatch) {
    fs.mkdirSync(path.join(root, "styles"), { recursive: true });
    fs.writeFileSync(
      path.join(root, "styles", "tokens.css"),
      `/* EaseHawk design tokens — extracted from TITAN shell */\n${rootMatch[0]}\n`,
    );
    css = css.replace(rootMatch[0], "").trim();
  }
  fs.writeFileSync(path.join(root, "styles", "titan.css"), css);
}

const favMatch = titanHtml.match(/href="data:image\/png;base64,([^"]+)"/);
if (favMatch) {
  fs.writeFileSync(
    path.join(root, "public", "favicon.png"),
    Buffer.from(favMatch[1], "base64"),
  );
}

const markMatch = titanHtml.match(
  /<img class="mark" src="data:image\/png;base64,([^"]+)"/,
);
if (markMatch) {
  fs.writeFileSync(
    path.join(root, "public", "logo-mark.png"),
    Buffer.from(markMatch[1], "base64"),
  );
}

const wideLogoMatch = titanHtml.match(
  /<a class="logo"[^>]*><img src="data:image\/png;base64,([^"]+)"/,
);
if (wideLogoMatch) {
  fs.writeFileSync(
    path.join(root, "public", "logo.png"),
    Buffer.from(wideLogoMatch[1], "base64"),
  );
}

const termsHtml = fs.readFileSync(path.join(repo, "EaseHawk_Terms.html"), "utf8");
const legalMatch = termsHtml.match(/<style>([\s\S]*?)<\/style>/);
if (legalMatch) {
  fs.writeFileSync(
    path.join(root, "styles", "legal.css"),
    legalMatch[1].trim(),
  );
}

console.log("Assets extracted.");
