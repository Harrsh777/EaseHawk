import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(
  path.join(root, "..", "EaseHawk_TITAN_Website.html"),
  "utf8",
);

const kbStart = html.indexOf("const KB=[");
const kbEnd = html.indexOf("];\nconst FALLBACK", kbStart);
const chipStart = html.indexOf("const CHIPQ=", kbEnd);
const chipEnd = html.indexOf(";\n\n/* ============ BRAIN", chipStart);

let kbBody = html.slice(kbStart + "const KB=".length, kbEnd + 1);
let chipBody = html.slice(chipStart + "const CHIPQ=".length, chipEnd);

const replacements = [
  ["P.main", "R.home"],
  ["P.ss", "R.successStories"],
  ["P.caps", "R.capabilities"],
  ["P.ind", "R.industries"],
  ["P.mox", "R.moxsuite"],
  ["P.cr", "R.careers"],
  ["P.ct", "R.contact"],
  ["P.vp", "R.videoPortfolio"],
  ["P.ai", "R.aiAutomation"],
  ["P.blp", "R.branding"],
  ["P.cal", "R.calendly"],
];

for (const [from, to] of replacements) {
  kbBody = kbBody.split(from).join(to);
  chipBody = chipBody.split(from).join(to);
}

kbBody = kbBody.replace(/'\+A\(/g, "'+link(").replace(/A\(/g, "link(");

const out = `import {
  CALENDLY_URL,
  CONTACT_EMAIL,
  routes,
} from "@/lib/routes";

export type KnowledgeEntry = {
  k: string[];
  a: string;
  c: string[];
};

const R = {
  home: routes.home,
  successStories: routes.successStories,
  capabilities: routes.capabilities,
  industries: routes.industries,
  moxsuite: routes.moxsuite,
  careers: routes.careers,
  contact: routes.contact,
  videoPortfolio: routes.videoPortfolio,
  aiAutomation: routes.aiAutomation,
  branding: routes.branding,
  calendly: CALENDLY_URL,
};

export function link(href: string, label: string): string {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const target = external ? ' target="_blank" rel="noopener"' : "";
  return \`<a href="\${href}"\${target}>\${label}</a>\`;
}

const HUMAN =
  "Fastest paths to a human: " +
  link(\`mailto:\${CONTACT_EMAIL}\`, CONTACT_EMAIL) +
  " (reply within <b>one business day</b>), " +
  link(CALENDLY_URL, "book 30 minutes") +
  ", or call <b>+91 99584 78569</b> / <b>+1 762 278 7611</b>.";

export const knowledgeBase: KnowledgeEntry[] = ${kbBody};

export const fallbackEntry: KnowledgeEntry = {
  a: "That one deserves a human answer rather than a scripted guess. " + HUMAN,
  c: ["What do you do?", "Show me proof", "Book a call"],
  k: [],
};

export const chipQueries: Record<string, string> = ${chipBody};

export function localBrain(query: string): KnowledgeEntry {
  const q = " " + query.toLowerCase() + " ";
  let best: KnowledgeEntry | null = null;
  let score = 0;
  for (const item of knowledgeBase) {
    let s = 0;
    for (const k of item.k) {
      if (q.includes(k)) s += k.length;
    }
    if (s > score) {
      score = s;
      best = item;
    }
  }
  return best ?? fallbackEntry;
}

export async function brain(query: string): Promise<KnowledgeEntry> {
  const endpoint = process.env.NEXT_PUBLIC_LLM_ENDPOINT;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: query }),
      });
      if (res.ok) {
        const data = (await res.json()) as KnowledgeEntry;
        if (data?.a) return data;
      }
    } catch {
      /* fall through to local brain */
    }
  }
  return localBrain(query);
}
`;

fs.writeFileSync(path.join(root, "lib", "chat-knowledge.ts"), out);
console.log("Wrote lib/chat-knowledge.ts");
