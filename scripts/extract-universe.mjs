import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(
  path.join(root, "..", "EaseHawk_TITAN_Website.html"),
  "utf8",
);

const start = html.indexOf("/* ================================================================\n   THREE.JS UNIVERSE");
const end = html.indexOf("tick();\n})();", start);
if (start < 0 || end < 0) throw new Error("Universe block not found");

let body = html.slice(start, end + "tick();".length);
body = body.replace(
  "if(reduced || !window.THREE) return;",
  "if (reduced) return;",
);
body = body.replace(
  /let renderer;\ntry\{[\s\S]*?catch\(e\)\{ document\.getElementById\('stage'\)\.style\.display='none'; return; \}/,
  `let renderer: THREE.WebGLRenderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
} catch {
  container.style.display = "none";
  return () => {};
}`,
);
body = body.replace(
  "const stage = document.getElementById('stage');",
  "const stage = container;",
);
body = body.replace(
  "renderer.setPixelRatio(Math.min(devicePixelRatio, 2));",
  "renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));",
);
body = body.replace(/innerWidth/g, "window.innerWidth");
body = body.replace(/innerHeight/g, "window.innerHeight");
body = body.replace(/scrollY/g, "window.scrollY");
body = body.replace(/addEventListener/g, "window.addEventListener");
body = body.replace(
  "const sections = ['hero','strategy','ai','data','cloud','platforms','engineering','branding','global','industries','work','products','clients','contact'];",
  "const sections = sectionIds;",
);
body = body.replace(
  /\/\* ---------- Progress rail[\s\S]*?updateRail\(\);\n\n/,
  "",
);

const out = `/* Auto-extracted from EaseHawk_TITAN_Website.html — do not hand-edit */
import * as THREE from "three";

export type TitanUniverseOptions = {
  container: HTMLElement;
  sectionIds: string[];
  isMobile: boolean;
  reduced: boolean;
  getIntroStart: () => number;
};

export function runTitanUniverse(options: TitanUniverseOptions): () => void {
  const { container, sectionIds, isMobile, reduced, getIntroStart } = options;
  ${body}
  return () => {
    window.removeEventListener("resize", onResize);
    renderer.dispose();
    container.innerHTML = "";
  };
}
`;

fs.mkdirSync(path.join(root, "lib", "titan-universe"), { recursive: true });
fs.writeFileSync(path.join(root, "lib", "titan-universe", "runtime.ts"), out);
console.log("Wrote lib/titan-universe/runtime.ts");
