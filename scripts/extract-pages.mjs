import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const repo = path.join(root, "..");
const contentDir = path.join(root, "content", "pages");

const linkMap = {
  "EaseHawk_TITAN_Website.html": "/",
  "EaseHawk_Capabilities.html": "/capabilities",
  "EaseHawk_Industries.html": "/industries",
  "EaseHawk_Success_Stories.html": "/success-stories",
  "MoxSuite_Page.html": "/moxsuite",
  "EaseHawk_Careers.html": "/careers",
  "EaseHawk_Contact.html": "/contact",
  "EaseHawk_Video_Portfolio.html": "/video-portfolio",
  "EaseHawk_Software_Engineering.html": "/software-engineering-services",
  "EaseHawk_AI_Automation.html": "/ai-automation-services",
  "EaseHawk_CRM_Enterprise.html": "/crm-implementation-partner",
  "EaseHawk_Data_BI.html": "/data-bi-services",
  "EaseHawk_Brand_Video.html": "/branding-digital-marketing",
  "EaseHawk_Embedded_Talent.html": "/staff-augmentation",
  "EaseHawk_Privacy_Policy.html": "/privacy-policy",
  "EaseHawk_Terms.html": "/terms",
  "EaseHawk_Cookie_Policy.html": "/cookie-policy",
};

const pages = [
  { file: "EaseHawk_TITAN_Website.html", slug: "home", type: "titan" },
  { file: "EaseHawk_Capabilities.html", slug: "capabilities", type: "titan" },
  { file: "EaseHawk_Industries.html", slug: "industries", type: "titan" },
  { file: "EaseHawk_Success_Stories.html", slug: "success-stories", type: "titan" },
  { file: "MoxSuite_Page.html", slug: "moxsuite", type: "titan" },
  { file: "EaseHawk_Careers.html", slug: "careers", type: "titan" },
  { file: "EaseHawk_Contact.html", slug: "contact", type: "titan" },
  { file: "EaseHawk_Video_Portfolio.html", slug: "video-portfolio", type: "titan" },
  { file: "EaseHawk_Software_Engineering.html", slug: "software-engineering", type: "capability" },
  { file: "EaseHawk_AI_Automation.html", slug: "ai-automation", type: "capability" },
  { file: "EaseHawk_CRM_Enterprise.html", slug: "crm-enterprise", type: "capability" },
  { file: "EaseHawk_Data_BI.html", slug: "data-bi", type: "capability" },
  { file: "EaseHawk_Brand_Video.html", slug: "brand-video", type: "capability" },
  { file: "EaseHawk_Embedded_Talent.html", slug: "embedded-talent", type: "capability" },
  { file: "EaseHawk_Privacy_Policy.html", slug: "privacy-policy", type: "legal" },
  { file: "EaseHawk_Terms.html", slug: "terms", type: "legal" },
  { file: "EaseHawk_Cookie_Policy.html", slug: "cookie-policy", type: "legal" },
];

function rewriteLinks(html) {
  let out = html;
  for (const [from, to] of Object.entries(linkMap)) {
    out = out.replaceAll(from, to);
  }
  out = out.replace(
    /src="data:image\/png;base64,[^"]+"/g,
    'src="/logo.png"',
  );
  return out;
}

function extractStyle(html) {
  const m = html.match(/<style>([\s\S]*?)<\/style>/);
  return m ? m[1].trim() : "";
}

function extractMeta(html) {
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1]?.trim() ?? "";
  const description =
    (html.match(/<meta name="description" content="([^"]*)"/) || [])[1]?.trim() ??
    "";
  const ogTitle =
    (html.match(/<meta property="og:title" content="([^"]*)"/) || [])[1]?.trim() ??
    title;
  const ogDescription =
    (html.match(/<meta property="og:description" content="([^"]*)"/) || [])[1]
      ?.trim() ?? description;
  const noindex = /content="noindex/i.test(html);
  const jsonLd = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    jsonLd.push(m[1].trim());
  }
  const accentMatch = html.match(/style="--pacc:([^"]+)"/);
  const accent = accentMatch?.[1] ?? "#FF810F";
  return { title, description, ogTitle, ogDescription, noindex, jsonLd, accent };
}

function extractCapabilityFooter(html) {
  const footerStart = html.indexOf("<footer");
  const footerEnd = html.indexOf("</footer>");
  if (footerStart < 0 || footerEnd < 0) return "";
  const footer = html.slice(footerStart, footerEnd + "</footer>".length);
  return rewriteLinks(footer.replace(/<img[^>]+>/, '<img src="/logo.png" alt="EaseHawk Technologies">'));
}

function extractCapabilityBody(html) {
  const headerEnd = html.indexOf("</header>");
  const footerStart = html.indexOf("<footer");
  if (headerEnd < 0 || footerStart < 0) return "";
  let body = html.slice(headerEnd + "</header>".length, footerStart);
  body = body.replace(/<form id="lpForm"[\s\S]*?<\/form>/, "<!--LP_FORM-->");
  return rewriteLinks(body.trim());
}

function extractTitanSections(html) {
  const headerEnd = html.indexOf("</header>");
  const footerStart = html.indexOf("<footer");
  if (headerEnd < 0 || footerStart < 0) return [];
  const chunk = html.slice(headerEnd + "</header>".length, footerStart);
  const sections = [];
  const re = /<section class="chapter[^"]*"[\s\S]*?<\/section>/g;
  let m;
  while ((m = re.exec(chunk))) {
    sections.push(rewriteLinks(m[0].trim()));
  }
  return sections;
}

function extractLegalMain(html) {
  const mainStart = html.indexOf("<main");
  const mainEnd = html.indexOf("</main>");
  if (mainStart >= 0 && mainEnd > mainStart) {
    const openEnd = html.indexOf(">", mainStart) + 1;
    return rewriteLinks(html.slice(openEnd, mainEnd).trim());
  }
  const headerEnd = html.indexOf("</header>");
  const footerStart = html.indexOf("<footer");
  if (headerEnd >= 0 && footerStart > headerEnd) {
    return rewriteLinks(html.slice(headerEnd + "</header>".length, footerStart).trim());
  }
  return "";
}

function extractFormConfig(html, slug) {
  const m = html.match(
    /location\.href='mailto:([^?]+)\?subject='\+encodeURIComponent\('([^']+)'/,
  );
  if (!m) return null;
  const sourceLabels = {
    "ai-automation": "AI & Automation landing page",
    "software-engineering": "Software Engineering landing page",
    "crm-enterprise": "CRM & Enterprise landing page",
    "data-bi": "Data & BI landing page",
    "brand-video": "Brand & Video landing page",
    "embedded-talent": "Embedded Talent landing page",
  };
  return {
    email: m[1],
    subjectPrefix: m[2].replace(/ — \$\{?name\}?.*$/, "").replace(/ — '+name.*/, ""),
    source: sourceLabels[slug] ?? `${slug} landing page`,
  };
}

fs.mkdirSync(contentDir, { recursive: true });

const metaOut = {};

for (const page of pages) {
  const filePath = path.join(repo, page.file);
  const html = fs.readFileSync(filePath, "utf8");
  const meta = extractMeta(html);
  metaOut[page.slug] = {
    ...meta,
    type: page.type,
    file: page.file,
  };

  if (page.type === "capability") {
    if (page.slug === "ai-automation") {
      const css = extractStyle(html);
      fs.writeFileSync(path.join(root, "styles", "capability.css"), css);
      const footer = extractCapabilityFooter(html);
      fs.writeFileSync(
        path.join(contentDir, "capability-footer.html"),
        footer,
      );
    }
    const body = extractCapabilityBody(html);
    fs.writeFileSync(path.join(contentDir, `${page.slug}.html`), body);
    const form = extractFormConfig(html, page.slug);
    if (form) {
      metaOut[page.slug].form = form;
    }
  } else if (page.type === "titan") {
    const sections = extractTitanSections(html);
    fs.writeFileSync(
      path.join(contentDir, `${page.slug}.json`),
      JSON.stringify(sections),
    );
  } else {
    const main = extractLegalMain(html);
    fs.writeFileSync(path.join(contentDir, `${page.slug}.html`), main);
  }
}

// Video portfolio extras
const vpHtml = fs.readFileSync(path.join(repo, "EaseHawk_Video_Portfolio.html"), "utf8");
const videosMatch = vpHtml.match(/const VIDEOS = (\[[\s\S]*?\]);/);
if (videosMatch) {
  fs.writeFileSync(
    path.join(root, "lib", "video-portfolio-data.json"),
    videosMatch[1],
  );
}

const ssHtml = fs.readFileSync(path.join(repo, "EaseHawk_Success_Stories.html"), "utf8");
const casesMatch = ssHtml.match(/const CASES = (\[[\s\S]*?\]);/);
if (casesMatch) {
  fs.writeFileSync(
    path.join(root, "lib", "success-stories-data.json"),
    casesMatch[1],
  );
}
const modalStart = ssHtml.indexOf('<div id="caseModal"');
const modalEnd = ssHtml.indexOf("</div>", ssHtml.indexOf("</div>", ssHtml.indexOf('id="cmCta"')) + 6) + 6;
if (modalStart >= 0 && modalEnd > modalStart) {
  fs.writeFileSync(
    path.join(contentDir, "success-stories-modal.html"),
    rewriteLinks(ssHtml.slice(modalStart, modalEnd + 1).trim()),
  );
}

fs.writeFileSync(
  path.join(root, "lib", "page-meta.json"),
  JSON.stringify(metaOut, null, 2),
);

console.log(`Extracted ${pages.length} pages to content/pages/`);
