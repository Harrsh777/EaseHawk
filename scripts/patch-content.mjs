import fs from "fs";
import path from "path";

const root = path.resolve("content/pages");

const MOX = {
  MoxSend: "https://www.moxsend.ai",
  MoxWarm: "https://www.moxwarm.moxsuite.com",
  MoxCheck: "https://www.moxcheck.moxsuite.com",
  MoxCampus: "https://www.moxcampus.com",
  MoxCRM: "https://www.moxcrm.com",
  MoxQuote: "https://www.moxquote.com",
  MoxFinance: "https://www.moxfinance.com",
  MoxRev: "https://www.moxrev.com",
};

const LINKEDIN =
  "https://www.linkedin.com/company/easehawk-technologies/";

const MAPS_DIRECTIONS =
  "https://www.google.com/maps/search/?api=1&query=WeWork+India,+DLF+Forum,+Cybercity+Phase+III,+Gurugram,+Haryana+122002,+India";

function linkMoxNode(html, name, url) {
  const re = new RegExp(
    `<div class="(mox-node[^"]*)"([^>]*)><div class="dot"></div><h5>${name}</h5><p>([\\s\\S]*?)</p></div>`,
    "g",
  );
  return html.replace(
    re,
    `<a class="$1"$2 href="${url}" target="_blank" rel="noopener"><div class="dot"></div><h5>${name}</h5><p>$3</p></a>`,
  );
}

function patchExploreProduct(html, name, url) {
  const re = new RegExp(
    `(<a class="explore" data-product="${name}" href=")[^"]*(")`,
    "g",
  );
  let out = html.replace(re, `$1${url}" target="_blank" rel="noopener"`);
  const plain = new RegExp(
    `(<a class="explore" href=")[^"]*(">Explore ${name})`,
    "g",
  );
  out = out.replace(plain, `$1${url}" target="_blank" rel="noopener"$2`);
  return out;
}

function patchAll(html) {
  let out = html;

  out = out.replaceAll(
    "https://www.linkedin.com/company/easehawk",
    LINKEDIN,
  );
  out = out.replaceAll("/#work", "/success-stories");
  out = out.replaceAll('href="https://moxsend.ai"', `href="${MOX.MoxSend}"`);

  for (const [name, url] of Object.entries(MOX)) {
    out = linkMoxNode(out, name, url);
    out = patchExploreProduct(out, name, url);
  }

  out = out.replace(
    /<a class="pm rv" style="--pacc:#FFDD00" href="[^"]*">/g,
    `<a class="pm rv" style="--pacc:#FFDD00" href="${MOX.MoxCampus}" target="_blank" rel="noopener">`,
  );
  out = out.replace(
    /<a class="pm rv" style="--pacc:#FF810F" href="[^"]*">/g,
    `<a class="pm rv" style="--pacc:#FF810F" href="${MOX.MoxRev}" target="_blank" rel="noopener">`,
  );
  out = out.replace(
    /<a class="sc-read" href="[^"]*" style="padding-top:0;margin-top:0">Explore MoxSuite/g,
    `<a class="sc-read" href="https://www.moxsuite.com" target="_blank" rel="noopener" style="padding-top:0;margin-top:0">Explore MoxSuite`,
  );

  out = out.replace(
    'href="https://www.google.com/maps/search/WeWork+DLF+Forum+Cybercity+Gurugram, India"',
    `href="${MAPS_DIRECTIONS}"`,
  );
  out = out.replace(/Get directions →/g, "Get directions →");

  out = out.replace(
    '<span class="cnt" data-n="8">0</span> in motion.',
    '<span class="cnt" data-n="6">0</span> in motion.',
  );

  // MoxCRM, MoxQuote, MoxFinance explore links that were href="#"
  for (const name of ["MoxCRM", "MoxQuote", "MoxFinance"]) {
    out = out.replace(
      new RegExp(`href="#"([^>]*>Explore ${name})`, "g"),
      `href="${MOX[name]}" target="_blank" rel="noopener"$1`,
    );
  }

  return out;
}

const jsonFiles = [
  "home.json",
  "capabilities.json",
  "industries.json",
  "moxsuite.json",
  "careers.json",
  "contact.json",
  "success-stories.json",
  "video-portfolio.json",
];

for (const file of jsonFiles) {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) continue;
  const sections = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const patched = sections.map((section) => patchAll(section));
  fs.writeFileSync(filePath, JSON.stringify(patched));
  console.log("patched", file);
}

const footerPath = path.join(root, "capability-footer.html");
if (fs.existsSync(footerPath)) {
  let footer = fs.readFileSync(footerPath, "utf8");
  footer = footer
    .replace(/<a href="\/software-engineering-services">[^<]*<\/a>\s*/g, "")
    .replace(/<a href="\/ai-automation-services">[^<]*<\/a>\s*/g, "");
  fs.writeFileSync(footerPath, footer);
  console.log("patched capability-footer.html");
}

console.log("done");
